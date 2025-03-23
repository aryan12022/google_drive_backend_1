const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({//blueprint of user
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[3,'Username must be atleast 3 characters long']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minLength:[13,'email must be atleast 13 characters long']
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:[5,'password must be atleast 5 character long']
    }


})

const user=mongoose.model('User',userSchema)

module.exports=user;