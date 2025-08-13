import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/Category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }))
app.use(express.json()) 
app.use(cookieParser()) 
app.use(morgan('dev')) // ✅ specify format to remove warning
app.use(helmet({ crossOriginResourcePolicy: false }))
  
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        message: "Server is running on port " + PORT
    })
})

app.use('/api/user', userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
})
