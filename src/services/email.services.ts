import nodemailer from 'nodemailer'
import { config } from '../config'
import { type SendMailOptions } from 'nodemailer'
import { createTransporter } from '../config/nodemailer.config'

const adminEmailAddress = config.email.adminEmailAddress

const sendEmail = async (mailOptions: SendMailOptions) => {
  const transporter = await createTransporter()
  const info = await transporter.sendMail(mailOptions)
  console.log('Message sent: %s', info.messageId)
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

const sendVerificationEmail = async (to: string, verificationToken: string) => {
  const mailObj: SendMailOptions = {
    to: to,
    from: adminEmailAddress,
    subject: 'Please verify your email',
    text: `Please click on the following link ${config.app.baseURL}/auth/verify?token=${verificationToken}`,
  }
  await sendEmail(mailObj)
}

const sendForgotPasswordEmail = async (
  to: string,
  verificationToken: string,
) => {
  const mailObj: SendMailOptions = {
    to: to,
    from: adminEmailAddress,
    subject: 'Forgot password',
    text: `Please click on the following link ${config.app.baseURL}/auth/reset-password?token=${verificationToken} to reset your password`,
  }
  await sendEmail(mailObj)
}

const sendResetPasswordSuccessfulEmail = async (to: string) => {
  const mailObj: SendMailOptions = {
    to: to,
    from: adminEmailAddress,
    subject: 'Your password has been reset',
    text: `your password reset has been successful. Please log in with new password`,
  }
  await sendEmail(mailObj)
}

export const emailServices = {
  sendEmail,
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendResetPasswordSuccessfulEmail,
}
