const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const Listing=require("../models/listing");









router.get("/",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("../views/listings/home.ejs",{allListings});
});
router.get("/about",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("../views/listings/about.ejs",{allListings});
});
router.get("/contact",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("../views/listings/contact.ejs",{allListings});
});
router.get("/products",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("../views/listings/products.ejs",{allListings});
});

router.get("/detail/:id",async(req,res)=>{
    let {id}=req.params;
    const allListings=await Listing.find({});
    const listing=await Listing.findById(id);
    res.render("../views/listings/detail.ejs",{allListings,listing});
})







module.exports=router;
