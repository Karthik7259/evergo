import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
         address_line :{
            type: String,
            default: ""
         },
         city : {
            type: String,
            default: ""
         },
         state : {
            type: String,
            default: ""
         },
         country : {
            type: String,
            default: ""
         },
         pincode : {
            type: String,
            default: ""
         },
        country : {
            type:String,
        },
        mobile: {
            type:Number,
            default: null
        },
        status : {
            type: Boolean,
            default: true
        }



},{
    timestamps: true
})


const AdressModel=mongoose.model("address", addressSchema);

export default AdressModel;