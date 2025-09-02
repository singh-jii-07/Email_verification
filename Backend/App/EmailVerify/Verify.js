  import nodemailer from "nodemailer";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nileshkumarsingh060@gmail.com",   
      pass: "wtez klhc yovu xptu"    
    }
  });

  export const sendStudentMail = async (token,newUser) => {
    try {
      await transporter.sendMail({
        from: `"NK School" <nileshkumarsingh060@gmail.com>`,
        to: newUser.email,
        subject: "Email Registration Successful ",
        html: `
          <h2>Welcome, ${newUser.username}!</h2>
          <p>Your student profile has been successfully created.</p>
          <p><b>Email:</b> ${newUser.email}</p>
          <p><b>Phone:</b> ${newUser.phone}</p>
          <p><b>Password:</b> ${token}</p>
          <p>Thank you for registering with us!</p>
        `
      });
      console.log("Email sent successfully");
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };
