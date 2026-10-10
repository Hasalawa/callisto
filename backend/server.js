const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
    const { name, company, email, service, message } = req.body;

    // Nodemailer Transporter එක සැකසීම
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // ඊමේල් එකේ ලස්සන 'Next-Level' HTML Format එක
    const mailOptions = {
        from: `"${name} (Callisto Client)" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `New Project Inquiry: ${service} - from ${name}`,
        html: `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; border-top: 4px solid #ef4444; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
                                <!-- Header -->
                                <tr>
                                    <td style="padding: 40px 30px 25px 30px; text-align: center; border-bottom: 1px solid #1a1a1a; background: linear-gradient(to bottom, #1a0505, #0a0a0a);">
                                        <h1 style="color: #ef4444; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: 6px; text-transform: uppercase;">CALLISTO</h1>
                                        <p style="color: #888; font-size: 11px; margin: 12px 0 0 0; letter-spacing: 3px; font-family: monospace;">SECURE INQUIRY TRANSMISSION</p>
                                    </td>
                                </tr>
                                
                                <!-- Content Section -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-bottom: 25px;">
                                                    <p style="margin: 0 0 5px 0; font-size: 11px; color: #ef4444; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Client Identity</p>
                                                    <p style="margin: 0; font-size: 18px; color: #ffffff; font-weight: 600;">${name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 25px;">
                                                    <p style="margin: 0 0 5px 0; font-size: 11px; color: #ef4444; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Company</p>
                                                    <p style="margin: 0; font-size: 16px; color: #e5e7eb;">${company}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 25px;">
                                                    <p style="margin: 0 0 5px 0; font-size: 11px; color: #ef4444; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Email Address</p>
                                                    <p style="margin: 0; font-size: 16px;">
                                                        <a href="mailto:${email}" style="color: #ef4444; text-decoration: none; border-bottom: 1px dashed #ef4444;">${email}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 40px;">
                                                    <p style="margin: 0 0 10px 0; font-size: 11px; color: #ef4444; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Requested Service</p>
                                                    <span style="font-size: 14px; color: #ffffff; padding: 8px 16px; background-color: #111111; border-radius: 8px; border: 1px solid #333; display: inline-block;">${service}</span>
                                                </td>
                                            </tr>
                                            
                                            <!-- Message Box -->
                                            <tr>
                                                <td style="padding: 30px; background-color: #111111; border-radius: 12px; border-left: 4px solid #ef4444; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
                                                    <p style="margin: 0 0 15px 0; font-size: 11px; color: #ef4444; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Project Brief</p>
                                                    <p style="margin: 0; font-size: 15px; color: #d1d5db; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="padding: 25px 30px; text-align: center; background-color: #050505; border-top: 1px solid #1a1a1a;">
                                        <p style="margin: 0; font-size: 10px; color: #555; font-family: monospace; letter-spacing: 1px;">/// END OF TRANSMISSION ///</p>
                                        <p style="margin: 8px 0 0 0; font-size: 10px; color: #444; font-family: monospace;">This is an automated notification from the Callisto Command Center.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}