import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({

   name:{
         type: String,
         required: [true, 'Name is required'],
         
   },
   email : {
            type: String,
            required: [true, 'please enter a Email address'],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
   },
   password: {
            type: String,
            required: [true, 'Please enter a password'],
   },
   avatar : {
      type: String,
      default:""
   },
   mobile: {
      type: Number,
      match: [/^\d{10}$/, 'Please enter a valid mobile number'],
      default: null
   },

   refreshToken: {
      type: String,
      default: ""
   },
 
   verify_email:{
        type: Boolean,
        default: false
   },

   last_login_date:{
        type: Date,
        default: ""
   },

   status : {
     type: String,
     enum : ['active', 'inactive', 'banned'],
     default: 'active'
   },
   address_details: [
         {
            type: mongoose.Schema.ObjectId,
            ref: 'address'
         }
   ],
   shopping_details: [
         {
            type: mongoose.Schema.ObjectId,
            ref: 'cartProduct'
         }
   ],
   orderHistory: [
         {
            type: mongoose.Schema.ObjectId,
            ref: 'order'
         }
   ],
   forgot_password_otp : {
    type:String,
    default: null
   },
   forgot_password_expiry: {
      type: Date,
      default: ""
   },
   role : {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
   },








},{
    timestamps: true,
});


const UserModel=mongoose.model("User",userSchema);


export default UserModel;

