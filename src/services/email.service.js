const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Email = require("../models/email.model");

async function sendVerificationEmail(recipientName, recipientEmail, bookingId) {
  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");

    await Email.create({ recipientName, recipientEmail, verificationToken });

    const transporter = nodemailer.createTransport({
      host: "smtp_host",
      port: 587,
      secure: false,
      auth: {
        user: "",
        pass: "",
      },
    });

    const verificationLink = `http://frontend-url/verify/${verificationToken}`;

    const mailOptions = {
      from: "", // 6jbuilders email
      to: recipientEmail,
      subject: "Booking Verification",
      text: `Dear ${recipientName},\n\nYour booking with ID ${bookingId} has been successfully created.\n\nThank you for choosing our construction service. Please click on the following link to verify your booking: ${verificationLink}\n\nIf you did not make this booking, please ignore this email.\n\nBest Regards,\n6J Builders`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Verification email sent to ${recipientEmail}`);
  } catch (err) {
    console.error("Error sending verification email:", err);
  }
}

module.exports = {
  sendVerificationEmail,
};
