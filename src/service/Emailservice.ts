import nodemailer from "nodemailer";
import { smptConfig } from "../config/appConfig";
class EmailService {
  private transport;
  constructor(transport: any) {
    try {
      const transportConfig = {
        host: smptConfig.host as string,
        port: smptConfig.port,
        service: smptConfig.provider as string,
        auth: {
          user: smptConfig.user as string,
          pass: smptConfig.password as string,
        },
      };
      this.transport = nodemailer.createTransport(
        transportConfig as nodemailer.TransportOptions,
      );
    } catch (error) {
      console.error("Error initializing EmailService:", error);
      console.log(error);
    }
  }

  async sendEmail({
    to,
    subject,
    message,
  }: {
    to: string;
    subject: string;
    message?: string;
  }) {
    try {
      await this.transport?.sendMail({
        to: to,
        subject: subject,
        html: message,
        // attachments:null,
        cc: "",
        bcc: "",
      });
    } catch (error) {
      throw error;
    }
  }
}

export default EmailService;
