  import nodemailer from "nodemailer";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nileshkumarsingh060@gmail.com",   
      pass: "wtez klhc yovu xptu"    
    }
  });

  export const sendStudentMail = async (newUser) => {
    try {
      await transporter.sendMail({
        from: `"Verifymail" <nileshkumarsingh060@gmail.com>`,
        to: newUser.email,
        subject: "Email Registration Successful ",
        html: `
          <h2>Welcome, ${newUser.username}!</h2>
          <p>Your student profile has been successfully created.</p>
          <p><b>Email:</b> ${newUser.email}</p>
          
          <p><b>Password:</b> ${newUser.token}</p>
          <p>Thank you for registering with us!</p>
        `
      });
      console.log("Email sent successfully");
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };
