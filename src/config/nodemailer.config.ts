/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer'

export const createTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  return transporter
}
