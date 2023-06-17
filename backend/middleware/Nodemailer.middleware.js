const nodemailer = require("nodemailer")

const sendVerificationEmail = async (email, token) => {
  // email configuration
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.my_email,
      pass: process.env.my_password
    }
  });

  const mailOptions = {
    from: process.env.my_email,
    to: email,
    subject: 'Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 6px; border-radius: 10px; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Email Verification</h1>
        <p>Hello ${email},</p>
        <p>We have recently received a request for sign up.</p>
        <p>Please verify this email within 5 minutes to sign up successfully.</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="http://localhost:4200/verify-email/${token}" style="background-color: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
        </div>
        <p style="margin-top: 20px;">Note: If you have not made this request, please ignore this email.</p>
        <p style="font-size: 12px; color: #999; text-align: center;">All rights reserved @alaluddin.com</p>
        <p style="font-size: 12px; color: #999; text-align: center;">Thank you</p>
      </div>
      `


  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail
}