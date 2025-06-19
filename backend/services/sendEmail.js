import {Resend} from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.RESEND_API_KEY){
    throw new Error('RESEND_API_KEY is not set in the environment variables');
}

const resend=new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({name,sendTo,subject,html})=>{
    try{

     const { data, error } = await resend.emails.send({
      from: 'Evergo <onboarding@resend.dev>',
      to: sendTo,
      subject: subject,
      html: html,
    });
    if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }

} catch (error){
        console.error('Error sending email:', error);
        throw error;
    }
}

export default sendEmail;



