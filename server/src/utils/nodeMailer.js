const nodemailer = require("nodemailer");
require("dotenv").config();

const Mailtransporter = nodemailer.createTransport({
    secure: true,
    port: 465,  // Fixed incorrect property name
    host: "smtp.gmail.com",
    auth: {
        user: process.env.mailID,
        pass: process.env.mailPass
    }
});

function nodeMailerSendMailer(to, OTP) {


    const boilerTemplate = `
     <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to HarvestHub</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #2E4A1F;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td style="padding: 40px 10px; text-align: center;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #F5F2E9; border-radius: 16px; border: 1px solid #8B9D77; box-shadow: 0 4px 24px rgba(0,0,0,0.2); margin: 0 auto;">
                    <tr>
                        <td style="padding: 40px 40px; text-align: center;">
                            <h1 style="color: #3E5A24; font-size: 28px; font-weight: 700; margin: 0;">Welcome to HarvestHub</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 40px; text-align: center;">
                            <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Your journey to sustainable farming begins here! To get started, verify your account using this code:</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 40px; text-align: center;">
                            <div style="background-color: #E8F1DE; border: 1px solid #A5BD7C; border-radius: 12px; padding: 20px; margin: 10px 0;">
                                <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 600; letter-spacing: 4px; color: #3E5A24;">${OTP}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 40px; text-align: center;">
                            <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 0;">Enter this code to access your seasonal planting calendar and start your farming journey.</p>
                            <p style="color: #707070; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">If you didn't request this verification, please ignore this message.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 40px; text-align: center;">
                            <div style="border-top: 1px solid #8B9D77; padding-top: 20px;">
                                <p style="color: #5D7445; font-size: 14px; margin: 0;">🌱 Plant With Purpose • Grow Your Knowledge • Harvest Success</p>
                            </div>
                        </td>
                    </tr>
                </table>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <p style="color: #D3E0C4; font-size: 12px; margin: 0;">© 2025 HarvestHub. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    Mailtransporter.sendMail({
        from: process.env.mailID, // Fixed missing "from"
        to: to,
        subject: "OTP Verification Code",
        html: boilerTemplate,
    }, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
}

module.exports = nodeMailerSendMailer;
