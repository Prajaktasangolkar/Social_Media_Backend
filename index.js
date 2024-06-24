const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const connectDB=require('./DB/db.js')
const app=express()
const PORT=5000
const AuthRoute=require('./routes/UserAuth.js')
const Authrouter=require('./routes/UseridRoute.js')
const PostRoute=require("./routes/PostRoute.js")
connectDB()


app.use(express.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use('/auth',AuthRoute)
app.use('/user',Authrouter)
app.use('/post',PostRoute)

// app.use("/",()=>{
//     console.log('helllo world');
// })

app.listen(PORT,()=>{
    console.log('connected',PORT);
})