const mongoose=require('mongoose')
require('dotenv').config()

async function connectDB(){
    
    const url=`mongodb+srv://admin:admin@cluster0.rjlbzal.mongodb.net/social_media`
    try {
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        // console.log(`Database connected: ${url}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
    const dbConnection=mongoose.connection;

    dbConnection.on('error',(err)=>{
        console.log(`Connection eror: ${err}`);
    });
}

module.exports=connectDB;