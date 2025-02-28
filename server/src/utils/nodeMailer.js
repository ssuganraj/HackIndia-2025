const nodeMailer = require("nodemailer");
const transport = require("nodemailer/lib/mailer");
require("dotenv").config();
const Mailtransporter = nodeMailer.createTransport({
    secure: true,
    post:456,
    host:"smtp.gmail.com",
    auth:{
        user : process.env.mailID,
        pass:process.env.mailPass
    }
})

function nodeMailerSendMailer(to , OTP){
    const boilerTemplate = `
     <table width="100%" cellpadding="0" cellspacing="0" border="0" style={{backgroundColor: "#2E4A1F"}}>
    <tr>
        <td style={{padding: "40px 10px", textAlign: "center"}}>
            {/* Content Table */}
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style={{
                    maxWidth: "600px", 
                    backgroundColor: "#F5F2E9", 
                    borderRadius: "16px", 
                    border: "1px solid #8B9D77", 
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                    margin: "0 auto"
                }}>

                {/* Header */}
                <tr>
                    <td style={{padding: "40px 40px", textAlign: "center"}}>
                        <h1 style={{
                            color: "#3E5A24", 
                            fontSize: "28px", 
                            fontWeight: 700, 
                            margin: 0, 
                            fontFamily: "Arial, sans-serif"
                        }}>
                            Welcome to HarvestHub
                        </h1>
                    </td>
                </tr>

                {/* Main Content */}
                <tr>
                    <td style={{padding: "20px 40px", textAlign: "center"}}>
                        <p style={{
                            color: "#4A4A4A", 
                            fontSize: "16px", 
                            lineHeight: 1.6, 
                            margin: "0 0 20px 0", 
                            textAlign: "center", 
                            fontFamily: "Arial, sans-serif"
                        }}>
                            Your journey to sustainable farming begins here! To get started with your personalized farming resources, please verify your account using this code:
                        </p>
                    </td>
                </tr>

                {/* OTP Code */}
                <tr>
                    <td style={{padding: "10px 40px", textAlign: "center"}}>
                        <div style={{
                            backgroundColor: "#E8F1DE", 
                            border: "1px solid #A5BD7C", 
                            borderRadius: "12px", 
                            padding: "20px", 
                            margin: "10px 0"
                        }}>
                            <span style={{
                                fontFamily: "'Courier New', monospace", 
                                fontSize: "32px", 
                                fontWeight: 600, 
                                letterSpacing: "4px", 
                                color: "#3E5A24"
                            }}>${OTP}</span>
                        </div>
                    </td>
                </tr>

                {/* Additional Info */}
                <tr>
                    <td style={{padding: "20px 40px", textAlign: "center"}}>
                        <p style={{
                            color: "#4A4A4A", 
                            fontSize: "16px", 
                            lineHeight: 1.6, 
                            margin: 0, 
                            textAlign: "center", 
                            fontFamily: "Arial, sans-serif"
                        }}>
                            Enter this code to access your seasonal planting calendar. Together, we'll cultivate your farming success.
                        </p>
                        <p style={{
                            color: "#707070", 
                            fontSize: "14px", 
                            lineHeight: 1.6, 
                            margin: "20px 0 0 0", 
                            textAlign: "center", 
                            fontFamily: "Arial, sans-serif"
                        }}>
                            If you didn't request this verification, please disregard this message.
                        </p>
                    </td>
                </tr>

                {/* Footer */}
                <tr>
                    <td style={{padding: "30px 40px", textAlign: "center"}}>
                        <div style={{
                            borderTop: "1px solid #8B9D77", 
                            paddingTop: "20px", 
                            textAlign: "center"
                        }}>
                            <p style={{
                                color: "#5D7445", 
                                fontSize: "14px", 
                                margin: 0, 
                                textAlign: "center", 
                                fontFamily: "Arial, sans-serif"
                            }}>
                                🌱 Plant With Purpose • Grow Your Knowledge • Harvest Success
                            </p>
                        </div>
                    </td>
                </tr>
            </table>

            {/* Footer Note */}
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style={{maxWidth: "600px", margin: "0 auto"}}>
                <tr>
                    <td style={{padding: "20px", textAlign: "center"}}>
                        <p style={{
                            color: "#D3E0C4", 
                            fontSize: "12px", 
                            margin: 0, 
                            textAlign: "center", 
                            fontFamily: "Arial, sans-serif"
                        }}>
                            © 2025 HarvestHub. All rights reserved.
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;



    Mailtransporter.sendMail({
        to: to,
        subject: "OTP Verification Code",
        html: boilerTemplate,
    });
}

module.exports = nodeMailerSendMailer;
