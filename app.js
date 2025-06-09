const express =require("express")
const app =express()
const port=3000
const userRouter =require("./routes/user.routes.js")
const dotenv =require("dotenv")
dotenv.config();
const connectToDB =require("./config/db.js")
connectToDB();
const cookieParser=require("cookie-parser")
app.use(cookieParser() )
const indexRouter=require("./routes/index.routes.js")
app.use(express.urlencoded({ extended: true })); // For HTML forms
app.use(express.json());



app.use("/",indexRouter)
app.use("/user",userRouter)

app.set("view engine","ejs")



app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(port,()=>{
    console.log(`Server is running is https://localhost:${port}`);
    
})