
const forgotPasswordTemplate = ({name,otp}) => {
       return `
       <div>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Please use the following OTP to proceed:</p>
        <h2 style="color: #4CAF50;">${otp}</h2>
        <p>This OTP is valid for 1 hour. If you did not request this, please ignore this email.</p>
        <p>Regards,</p>
        <p>Evergo Team</p>
      </div>
       `
}


export default forgotPasswordTemplate;