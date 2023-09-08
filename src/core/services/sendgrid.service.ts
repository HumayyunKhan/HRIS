import * as sgMail from '@sendgrid/mail';

interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

async function SendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Wait for the API key to be set before sending the email
    await sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Now send the email
    const response = await sgMail.send(options);
    console.log("this is response ", response);
    console.log('Email sent');
    return true;
  } catch (error) {
    console.error(error);
    return false;
    // No need to throw an error here since it's already caught
  }
}

export { SendEmail };
