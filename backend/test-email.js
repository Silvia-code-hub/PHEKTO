require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    console.log('Testing email with:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    try {
        const info = await transporter.sendMail({
            from: `"Test" <${process.env.EMAIL_USER}>`,
            to: 'uptescara@gmail.com',
            subject: 'Test Email',
            html: '<h1>Email configuration works!</h1>'
        });
        console.log('✅ Email sent successfully!', info.messageId);
    } catch (error) {
        console.error('❌ Email error:', error.message);
    }
}

testEmail();