const mongoose=require('mongoose')

const dbConnect=async()=>{
    try {
    const con=   await mongoose.connect(process.env.MONGO_URL)
    console.log(`mongoDb connected ${process.env.MONGO_URL}`)

    } catch (error) {
        console.log(`mongoDb error ${error}`)
    }
}

 module.exports=dbConnect;
 