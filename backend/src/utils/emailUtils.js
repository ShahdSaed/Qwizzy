const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Qwizzy" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

const getEmailTemplate = (title, message, code, buttonText, buttonUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px; }
        .content { padding: 40px 30px; text-align: center; color: #333333; }
        .content p { font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
        .code-box { background-color: #f3f4f6; border: 2px dashed #7c3aed; padding: 20px; border-radius: 8px; font-size: 32px; font-weight: 700; color: #7c3aed; letter-spacing: 5px; margin: 20px 0; }
        .btn { display: inline-block; padding: 15px 35px; background-color: #7c3aed; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: background-color 0.3s; }
        .footer { padding: 20px; text-align: center; font-size: 14px; color: #6b7280; background-color: #f9fafb; }
        .footer p { margin: 5px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Qwizzy</h1>
        </div>
        <div class="content">
          <h2>${title}</h2>
          <p>${message}</p>
          ${code ? `<div class="code-box">${code}</div>` : ''}
          ${buttonUrl ? `<a href="${buttonUrl}" class="btn">${buttonText}</a>` : ''}
          <p style="margin-top: 30px;">If you didn't request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 Qwizzy. All rights reserved.</p>
          <p>The Ultimate Quiz Experience</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { sendEmail, getEmailTemplate };
