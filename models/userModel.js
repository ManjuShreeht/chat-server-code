const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookie=require('cookie')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    customerId:{
        type:String,
        default:""
    },
    subscription:{
        type:String,
        default:"",
    }
});
userSchema.pre("save", async function (next) {
    //update
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  //match password
  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
//Export the model
userSchema.methods.createJwt=function(res){
   const accessToken= jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'15min'})
   const refreshToken=jwt.sign({userId:this.id},process.env.JWT_REFRESH,{expiresIn:'15day'})
   res.cookie('refreshToken',`${refreshToken}`,{maxAge:86400*7000,httpOnly:true,})
}


const User= mongoose.model('User', userSchema);
module.exports =User