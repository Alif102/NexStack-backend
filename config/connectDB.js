import mongoose from 'mongoose'
import dotenv from 'dotenv'



dotenv.config();

if(!process.env.MONGODB_URL){
    throw new Error (
        "please provide mongoDB url"
    )
}

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connect db')
        
    } catch (error) {
        console.log("mongodb connect error" , error)
        process.exit(1)
        
    }
    
}

export default connectDB;