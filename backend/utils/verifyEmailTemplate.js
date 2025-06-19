const verifyEmailTemplate = ({name,url})=>{
    return `
       <p>Dear ${name},</p>
       <p>Welcome to Evergo!</p>
       <p>At Evegro, we're committed to making fresh, high-quality food a simple, everyday convenience, never a hassle </p>
      <p>Our goal is to ease your daily lives by handpicking all your daily needs straight from local markets, guaranteeing peak freshness while strengthening the local community<p> 
      <p>Thank you for registering Evergo.<p>
     <p>To complete your registration, please verify your email address by clicking the button below:</p>
      <a href=${url} style="color:white;background : blue;margin-top:10px">
      Verify Email
      </a>
    
    `
}

export default verifyEmailTemplate;
