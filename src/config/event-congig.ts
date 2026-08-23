import EventEmitter from "events";
import EmailService from "../service/Emailservice";

export const myEvent = new EventEmitter();

myEvent.on("NEW_USER_REGISTERED", async (data) => {
  try {
    const emailSrv = new EmailService(data.email);
    await emailSrv.sendEmail({
      to: data.email,
      subject: "Your account has been created successfully",
      message: `<h1>Welcome ${data.name}!</h1><p>Thank you for registering with us.</p>`,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
