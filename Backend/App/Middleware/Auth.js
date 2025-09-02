import jwt from "jsonwebtoken";
import User from '../Models/Usermodel.js'

const auth = async (req, res,next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET);
    const {id}=decode
    const user=await User.findByID(id)
    if(!user){
        return res.status(400).json({
            message:"user not founded"
        })
    }
    req.userId=User._id
    next()

 } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export default auth