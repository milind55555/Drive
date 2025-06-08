const express =require("express")
const userRouter =require("./routes/user.routes.js")

const app =express()
const port=3000

app.use("/user",userRouter)
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")


app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(port,()=>{
    console.log(`Server is running is https://localhost:${port}`);
    
})