const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: `gmail`,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    console.log('Sending verification email to:',email);
    console.log('Verification URL:',verificationUrl);

    await transporter.sendMail({
        from:`" My Hekto" <${process.env.EMAIL_USER}>`,
        to: email,
         subject: 'Verify Your Email',
         text: `Please verify your email by clicking this link: ${verificationUrl}\n\nThis link expires in 24 hours.`,
         html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome to Hekto!</h2>
                <p>Thank you for registering. Please click the link below to verify your email address:</p>
                <p><a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #ec489a; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #ec489a;">${verificationUrl}</p>
                <p>This link expires in 24 hours.</p>
                <hr />
                <p style="color: #666; font-size: 12px;">If you didn't create an account, please ignore this email.</p>
            </div>
        `
        
    });
     console.log('Email sent successfully!');
};

module.exports = { sendVerificationEmail };