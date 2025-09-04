import express from 'express'
import {register,login,Verification,Logout,forgotPassword,verifyOtp,changePassword, profile} from '../Controllers/Usercontroller.js'
import auth from '../Middleware/Auth.js'
const userRoutes=express.Router()

userRoutes.post('/register',register)
userRoutes.post('/login',login)
userRoutes.post('/verify',Verification)
userRoutes.post('/forgot',forgotPassword)
userRoutes.post('/otp',verifyOtp)
userRoutes.post('/logout',auth,Logout)
userRoutes.get('/profile',auth,profile)
userRoutes.post('/chnagepassword/:email',changePassword)

export default userRoutes