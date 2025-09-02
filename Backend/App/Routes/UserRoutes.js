import express from 'express'
import {register,login,Verification} from '../Controllers/Usercontroller.js'
const userRoutes=express.Router()

userRoutes.post('/register',register)
userRoutes.post('/login',login)
userRoutes.post('/verify',Verification)
export default userRoutes