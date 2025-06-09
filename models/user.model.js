const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,'Username must be at 3 character long!!']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,'Email must be at 3 character long!!']
    },
    password:{
        type:String,
        required:true,
        minlength:[3,'Password must be at 3 character long!!']
    },
})

const user =mongoose.model('user',userSchema);

module.exports =user;