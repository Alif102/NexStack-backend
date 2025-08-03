import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
export async function registerUserController(request , response) {

    try {
        const {name,email,password} = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message : "Provide name , email ,password",
                 error : true ,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)
        const payload = {
            name,
            email,
            password : hashPassword
        }
        const newuser = new UserModel(payload)
        const save = await newuser.save()
        

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify Email for shop",
            html: verifyEmailTemplate({
                name, 
                url : verifyEmailUrl
            })
        })

        return response.json({
            message : "User Register successfully ",
            error : false ,
            success : true,
            data : save 

        })


        const user = await UserModel.find ({email})
        if(user){
            return response.json({
                message : "Already Exist email" ,
                 error : true ,
                 success : false
            })
        }
        
    } catch (error) {



        return response.status(500).json({
            message : error.message || error ,
            error : true ,
            success : false
        })
        
    }
    
}

export async function verifyEmailController(request , response) {

    try {
        const {code} = request.body
        const user = await UserModel.findOne({ _id : code })
        if(!user){
            return response.status(400).json({
            message : 'Invalid code' ,
            error : true,
            success: false

        })
        }
        const updateUser =  await UserModel.updateOne({ _id : code}, {verify_email : true})
        return response.json({
            message : error.message || error ,
            error : true,
            success: true
        })
        
    } catch (error) {
        return response.status(500).json({
            message : "verify email done" ,
            error : false,
            success: true

        })
        
    }
}