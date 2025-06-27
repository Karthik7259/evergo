import {Resend} from 'resend';

// Check for the API key directly from the environment variable
// No need for dotenv.config() as it's already called in the main server file
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if(!RESEND_API_KEY){
    throw new Error('RESEND_API_KEY is not set in the environment variables');
}

const resend = new Resend(RESEND_API_KEY);

const sendEmail = async ({sendTo,subject,html})=>{
    try{
        // Added timeout to help with network issues
        const { data, error } = await Promise.race([
            resend.emails.send({
                from: 'Evergo <onboarding@resend.dev>',
                to: sendTo,
                subject: subject,
                html: html,
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Email request timed out')), 10000)
            )
        ]);
        
        if (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
        
        return data; // Return the data so we know the email was sent
    } catch (error){
        console.error('Error sending email:', error);
        throw error;
    }
}

export default sendEmail;



