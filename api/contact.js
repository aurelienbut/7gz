// api/contact.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Validation côté serveur (essentielle !)
        if (!name || !email || !message || name.trim() === '' || email.trim() === '' || message.trim() === '') {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }

        // Validation du format de l'email (plus robuste côté serveur)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Adresse e-mail invalide.' });
        }

        // Configuration de Nodemailer
        // Remplacez par vos identifiants SMTP et stockez-les comme variables d'environnement sur Vercel
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10), // Assurez-vous que le port est un nombre
            secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour les autres (par ex. 587 avec STARTTLS)
            auth: {
                user: process.env.SMTP_USER, // Votre adresse e-mail d'envoi
                pass: process.env.SMTP_PASS, // Votre mot de passe d'application ou mot de passe e-mail
            },
            // Optionnel pour certains fournisseurs ou configurations locales (à utiliser avec prudence)
            // tls: {
            //   rejectUnauthorized: false
            // }
        });

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, // L'expéditeur affiché (peut être votre email pour éviter le spam)
            replyTo: email, // L'adresse à laquelle répondre
            to: process.env.RECEIVING_EMAIL, // Votre adresse e-mail où vous recevrez les messages
            subject: `Nouveau message de ${name} via le site 7gz`,
            text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Nouveau message via le site 7gz</h2>
                    <p><strong>Nom:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Message envoyé avec succès !' });
        } catch (error) {
            console.error('Erreur Nodemailer:', error);
            // Envoyer une erreur générique au client pour des raisons de sécurité
            return res.status(500).json({ message: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' });
        }

    } else {
        // Gérer les autres méthodes HTTP que POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}