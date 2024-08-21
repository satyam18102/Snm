const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;







const listingSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    image: {
        url:String,
        filename:String,
    },
    grade:{
        type:String,
        required:true
    },
    material:{
        type:String,
        required:true
    },
    computerized:{
        type:String,
        required:true
    },
    control:{
        type:String,
        required:true
    },
    warranty:{
        type:String,
        required:true
    },
    price:{
        type:Number,
    },
    terms:{
        type:String,
        required:true
    },
    ability:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    market:{
        type:String,
        required:true
    },
    usage:{
        type:String,
        required:true
    },
    surface:{
        type:String,
        required:true
    },
    phase:{
        type:String,
        required:true
    },
    frequency:{
        type:String,
        required:true
    },
    warrant:{
        type:String,
        required:true
    },
    power:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    capacity:{
        type:String,
        required:true
    },
    automation:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    ques1:{
        type:String,
    },
    ans1:{
        type:String,
    },
    ques2:{
        type:String,
    },
    ans2:{
        type:String,
    },
    ques3:{
        type:String,
    },
    ans3:{
        type:String,
    },
});


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;