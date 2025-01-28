const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (email, name) => {
    console.log(process.env.EMAIL_USER)
    console.log('hello')
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    // Set up email data
    let mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Recipient address
      subject: "Welcome to Our E-commerce Site!", // Subject line
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for signing up at our e-commerce site. We are excited to have you as part of our community!</p>
        <p>Explore our wide range of products and enjoy your shopping experience!</p>
        <p>Best Regards,<br>Your E-commerce Team</p>
      `, // HTML body
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendWelcomeEmail };
