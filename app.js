const express=require('express')
const dotenv =require('dotenv').config()
const morgan=require('morgan')
const cors=require('cors')
const dbConnect=require('./config/db')
const authRoute=require('./routes/authRoute')
const errorHandler=require('./middleware/errorMiddleware')
const openaiRoute=require('./routes/openaiRoute')




dbConnect()
const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(errorHandler)

app.use('/api/user',authRoute)
app.use('/api/user/openai',openaiRoute)

const port=process.env.PORT || 6666
app.listen(port,()=>{
    console.log(`server  running in port ${port}`)
})