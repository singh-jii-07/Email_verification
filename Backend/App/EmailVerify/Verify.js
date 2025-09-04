import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nileshkumarsingh060@gmail.com",
    pass: "wtez klhc yovu xptu", 
  },
});

export const sendStudentMail = async (newUser) => {
  try {
   const verifyUrl = `http://localhost:5173/verify/${newUser.token}`;

  

    await transporter.sendMail({
      from: `"NKPR Verification" <nileshkumarsingh060@gmail.com>`,
      to: newUser.email,
      subject: "Verify Your Email - NKPR",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f4f7fb; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(90deg, #5364FF, #00F1FF); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Welcome to NKPR</h1>
            </div>

            <!-- Body -->
            <div style="padding: 30px; text-align: left; color: #333;">
              <h2>Hello, ${newUser.username}</h2>
              <p>Thank you for registering with us. Please find your details below:</p>
              
              <p><b>Name:</b> ${newUser.username}</p>
              <p><b>Email:</b> ${newUser.email}</p>
              <p><b>Token:</b> <span style="color: #5364FF; font-weight: bold;">${newUser.token}</span></p>

              <p style="margin-top: 20px;">Click the button below to verify your account:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verifyUrl}" 
                   style="background: #5364FF; color: white; text-decoration: none; padding: 12px 25px; border-radius: 30px; font-size: 16px; font-weight: bold; display: inline-block;">
                    Verify Account
                </a>
              </div>

              <p>If you did not create this account, please ignore this email.</p>
            </div>

            <!-- Footer -->
            <div style="background: #0B1F33; color: #bbb; text-align: center; padding: 15px; font-size: 12px;">
              © ${new Date().getFullYear()} NKPR & Promotions. All rights reserved.
            </div>
          </div>
        </div>
      `,
    });

    console.log("Verification email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
