import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    // no need to set host and port for gmail
    // host: "smtp.gmail.com.",
    // port: 587,
    secure: config.env === "production",
    service: "gmail",
    auth: {
      user: "nayeemuddin.bd100@gmail.com",
      pass: config.reset_ui_app_pass,
    },
  });

  await transporter.sendMail({
    from: "nayeemuddin.bd100@gmail.com", // sender address
    to, // list of receivers
    subject: "Password Reset Request", // Subject line
    text: "Reset your password within ten mins!", // plain text body
    html, // html body
  });
};
