const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");
const User=require("../models/user");
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const {listingSchema}=require("../schema");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware");
const multer=require("multer");
const{storage}=require("../cloudConfig.js");
const upload =multer({storage});







const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}







router.get("/signup",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("../views/users/signup.ejs",{allListings});
});


router.post("/signup",wrapAsync(async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        await User.register(newUser,password);
        req.flash("success","User registered successfully")
        res.redirect("/home");
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/admin/signup")
    }
}));

router.get("/login",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("../views/users/login.ejs",{allListings});
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/admin/login",failureFlash:true}),async(req,res)=>{
    let {username}=req.body;
    req.flash("success",`Welcome back ${username}`);
    let redirectUrl=res.locals.redirectUrl||"/home"
    res.redirect(redirectUrl);
})
router.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success",`Logged out successfully`);
        res.redirect("/home")
    })
})






//--------------------Admin Routes-----------------------
router.get("/add",isLoggedIn,async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("../views/listings/add.ejs",{allListings});
});
router.post("/listings",upload.single("listing[image]"),wrapAsync(async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    console.log(newListing);
    newListing.owner=req.user._id;
    newListing.image={url,filename}
    await newListing.save();
    req.flash("success","New Product Added");
    res.redirect("/home");
}));
router.delete("/listings/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Product has been deleted");
    res.redirect("/home");
}));

router.get("/listings/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const allListings=await Listing.find({});
    const listing= await Listing.findById(id);
    res.render("../views/listings/edit.ejs",{allListings,listing});
}));



router.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Please enter valid Data")
    }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Product has been Updated");
    res.redirect("/home");
}));







module.exports=router;