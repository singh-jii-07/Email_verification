import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './App/Routes/UserRoutes.js'

dotenv.config()

const app=express()
app.use(express.json())
app.use("/api/users", userRoutes);

mongoose.connect(process.env.mongoose_url)
.then(
    console.log("db connect"),
app.listen(process.env.PORT,()=>{
console.log(`App running at the port ${process.env.PORT}`)

app.get('/',(req,res)=>{
res.send("Api is running")
})
})


)
.catch((err) => {
  console.log("DB connection failed:", err);
});