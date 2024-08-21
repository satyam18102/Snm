if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const ExpressError=require("./utils/ExpressError");
const {listingSchema}=require("./schema");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");







app.use(cookieParser(process.env.SECRET));




const dbUrl=process.env.ATLASDB_URL;


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*60*60
})




async function main() {
    await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("Connected to DB")
})
.catch(()=>{
    console.log("Connection Failed")
});



const listing=require("./routes/listing.js");
const admin=require("./routes/admin.js");
const { secureHeapUsed } = require("crypto");



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));






const sessionOptions={
    store,
    secret:"secretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24*3,
        maxAge:1000*60*60*24*3,
        httpOnly:true,
    },
}

app.use(session(sessionOptions));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})





app.use("/home",listing);
app.use("/admin",admin);



app.get("/",async(req,res)=>{
    res.redirect("/home");
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found!"))
})


app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).send(message);
})


app.listen(3200, ()=>{
    console.log(`Listening to port:3200`)
});





