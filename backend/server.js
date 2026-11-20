const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Look for .env in current directory and parent directory for flexible runtime environments
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Extracts and deduplicates all recipient email addresses from RECEIVER_EMAILS in .env.
 * Supports comma, semicolon, space, or newline-delimited emails.
 */
function getReceiverEmails() {
    const raw = process.env.RECEIVER_EMAILS || '';
    const parsedEmails = Array.from(
        new Set(
            raw
                .split(/[,;\s]+/)
                .map((e) => e.trim())
                .filter((e) => e && e.includes('@'))
        )
    );

    return parsedEmails.length > 0 ? parsedEmails : ['callistosoftwaresolution@gmail.com'];
}

/**
 * Dispatches a real-time notification embed to a Discord channel via Discord Webhook.
 */
async function sendDiscordNotification({ name, company, email, service, message, recipients }) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl || !webhookUrl.trim()) {
        console.log('[Callisto Discord] ℹ️ DISCORD_WEBHOOK_URL not configured. Add your webhook URL to .env to receive instant Discord notifications.');
        return { sent: false, reason: 'NOT_CONFIGURED' };
    }

    const clientName = name && name.trim() ? name.trim() : 'Anonymous Client';
    const clientCompany = company && company.trim() ? company.trim() : 'Independent / Direct';
    const clientEmail = email && email.trim() ? email.trim() : 'Not provided';
    const clientService = service && service.trim() ? service.trim() : 'General Inquiry';
    const clientMessage = message && message.trim() ? message.trim() : 'No additional message provided.';
    const truncatedMessage = clientMessage.length > 1000 ? clientMessage.slice(0, 997) + '...' : clientMessage;

    const discordPayload = {
        username: 'Callisto Command Center',
        avatar_url: 'https://callisto.software/callisto_logo.png',
        embeds: [
            {
                title: '🚨 NEW CLIENT INQUIRY TRANSMITTED',
                description: 'A new project deployment / inquiry has been initiated on the **Callisto** platform.',
                color: 0xEF4444, // #EF4444 Callisto Neon Red
                fields: [
                    {
                        name: '👤 Client Identity',
                        value: `**${clientName}**`,
                        inline: true
                    },
                    {
                        name: '🏢 Company',
                        value: clientCompany,
                        inline: true
                    },
                    {
                        name: '⚡ Target Service / Build',
                        value: `\`${clientService}\``,
                        inline: false
                    },
                    {
                        name: '✉️ Client Email',
                        value: `[${clientEmail}](mailto:${clientEmail})`,
                        inline: false
                    },
                    {
                        name: '📝 Project Brief',
                        value: truncatedMessage,
                        inline: false
                    },
                    {
                        name: '📡 Dispatched Email Recipients',
                        value: recipients && recipients.length > 0
                            ? recipients.map((r) => `• \`${r}\``).join('\n')
                            : 'Default admin inbox',
                        inline: false
                    }
                ],
                footer: {
                    text: 'Callisto Security & Intelligence • Automated Transmission System'
                },
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        const response = await fetch(webhookUrl.trim(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.warn(`[Callisto Discord] ⚠️ Webhook delivery responded with HTTP ${response.status}:`, errorText);
            return { sent: false, error: errorText };
        }

        console.log('[Callisto Discord] ✅ Discord notification transmitted successfully.');
        return { sent: true };
    } catch (err) {
        console.error('[Callisto Discord] ❌ Error delivering Discord webhook:', err.message);
        return { sent: false, error: err.message };
    }
}

app.post('/api/contact', async (req, res) => {
    const { name, company, email, service, message } = req.body;

    // Get all recipient emails configured in .env
    const receiverEmails = getReceiverEmails();
    console.log(`[Callisto Mailer] Processing inquiry for ${receiverEmails.length} recipient(s):`, receiverEmails.join(', '));

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Next-Level Cyber-themed HTML Email Template
    const mailOptions = {
        from: `"${name || 'Callisto Client'} (Callisto Client)" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: receiverEmails,
        subject: `New Project Inquiry: ${service || 'General Build'} - from ${name || 'Client'}`,
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
                                                    <p style="margin: 0; font-size: 18px; color: #ffffff; font-weight: 600;">${name || 'Anonymous'}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 25px;">
                                                    <p style="margin: 0 0 5px 0; font-size: 11px; color: #ef4444; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Company</p>
                                                    <p style="margin: 0; font-size: 16px; color: #e5e7eb;">${company || 'Direct / Independent'}</p>
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
                                                    <span style="font-size: 14px; color: #ffffff; padding: 8px 16px; background-color: #111111; border-radius: 8px; border: 1px solid #333; display: inline-block;">${service || 'General Project Build'}</span>
                                                </td>
                                            </tr>
                                            
                                            <!-- Message Box -->
                                            <tr>
                                                <td style="padding: 30px; background-color: #111111; border-radius: 12px; border-left: 4px solid #ef4444; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
                                                    <p style="margin: 0 0 15px 0; font-size: 11px; color: #ef4444; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Project Brief</p>
                                                    <p style="margin: 0; font-size: 15px; color: #d1d5db; line-height: 1.8; white-space: pre-wrap;">${message || 'No additional message provided.'}</p>
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
        // 1. Send email to all recipients via Nodemailer
        await transporter.sendMail(mailOptions);
        console.log(`[Callisto Mailer] ✅ Email sent successfully to:`, receiverEmails.join(', '));

        // 2. Dispatch real-time notification to Discord
        const discordResult = await sendDiscordNotification({
            name,
            company,
            email,
            service,
            message,
            recipients: receiverEmails
        });

        res.status(200).json({
            success: true,
            message: 'Inquiry transmitted successfully!',
            recipients: receiverEmails,
            discordNotified: discordResult.sent
        });
    } catch (error) {
        console.error('[Callisto Mailer] ❌ Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
    }
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        const recipients = getReceiverEmails();
        console.log(`===============================================`);
        console.log(`🚀 Callisto Backend Server running on port ${PORT}`);
        console.log(`📧 Configured Receivers (${recipients.length}):`, recipients.join(', '));
        console.log(`💬 Discord Webhook: ${process.env.DISCORD_WEBHOOK_URL ? 'Configured ✅' : 'Not set (Optional) ℹ️'}`);
        console.log(`===============================================`);
    });
}
