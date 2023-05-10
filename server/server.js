import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from 'mongoose'
import env from 'dotenv'
import authRouter from './routes/authRouter.js'
import errorMiddleware from './middleware/error-middleware.js'
import http from "http"
import { Server } from "socket.io";

env.config()

const PORT = process.env.PORT || 8000
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/', authRouter)
app.use(errorMiddleware)

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {


    io.on('disconnect', () => {
        console.log("disconnect");
    })
})

async function startServer(){
    try {
        await mongoose.connect(process.env.DB_URL)
            .then(()=>console.log('DB ok'))
            .catch((e)=>console.log('DB error', e))
        app.listen(PORT, (err)=>{
            if(err) return console.log(1,err)
            console.log(`server on ${PORT}`)
        });
    } catch (error) {
        console.log(error)
    }
}

startServer()