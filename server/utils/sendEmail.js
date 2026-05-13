import nodemailer from 'nodemailer';

export default async function sendEmail({ to, subject, text, html }) {
  if (!process.env.SMTP_HOST) return { skipped: true };
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
  return transporter.sendMail({ from: process.env.SMTP_USER || 'no-reply@quickbite.local', to, subject, text, html });
}
