import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const handleContactForm = async (req, res) => {
  const { firstName, lastName, email, comments } = req.body;

  if (!firstName || !lastName || !email || !comments) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use "smtp.ethereal.email" for testing
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: "New Contact Form Submission",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${comments}
        `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};
