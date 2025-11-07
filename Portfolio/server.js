const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// Resume download endpoint
app.get('/download-resume', (req, res) => {
    const resumePath = path.join(__dirname, 'Chaithanya_Sai_Krishna_Resume.pdf');
    
    // Check if resume file exists
    if (fs.existsSync(resumePath)) {
        res.download(resumePath, 'Chaithanya_Sai_Krishna_Resume.pdf', (err) => {
            if (err) {
                console.error('Error downloading resume:', err);
                res.status(500).send('Error downloading resume');
            }
        });
    } else {
        res.status(404).send('Resume not found');
    }
});

// Email transporter configuration
const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form endpoint with email sending
app.post('/contact', express.json(), async (req, res) => {
    const { name, email, message } = req.body;
    
    try {
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || 'saikrishnachaithanya17@gmail.com',
            subject: `Portfolio Contact: Message from ${name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>Sent from your portfolio website</small></p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully to:', process.env.EMAIL_TO);
        res.json({ success: true, message: 'Message sent successfully!' });
        
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again or contact directly.' 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
