import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from 'mongoose'
import env from 'dotenv'
import authRouter from './routes/authRouter.js'
import errorMiddleware from './middleware/error-middleware.js'
import http from "http"
import { Server } from "socket.io";
import lessonModel from "./models/lessonModel.js";
import chatroomModel from "./models/chatroomModel.js";
import messagesModel from "./models/messagesModel.js";

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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    // socket.on('join', async ({user_id, child_id, lesson, name_room}) => {
    socket.on('join', async ({user_id, child_id, lesson, room}) => {
        console.log("СРАБАТЫВАЕТ ЕБАНЫЙ ДЖОИН!!!");
        // socket.join(`${name_room}`);
        // const lesson_id = await lessonModel.findOne({name: lesson})
        // const room = await chatroomModel.findOne({user_id, child_id, lesson_id: lesson_id._id})
        // console.log(room);
        // if(room) {
        //     room.messages = room.messages.sort((a, b) => new Date(b.time) - new Date(a.time))
        //     socket.emit('room', room)
        //     return
        // }
        // const new_room = await chatroomModel.create({user_id, child_id, lesson_id: lesson_id._id})
        // const fullroom = await chatroomModel.findById(new_room._id).populate('messages')
        // fullroom.messages = fullroom.messages.sort((a, b) => new Date(b.time) - new Date(a.time))
        // console.log(fullroom);
        // io.to(`${name_room}`).emit('room', fullroom);

        socket.join(`${room}`);
        const lesson_id = await lessonModel.findOne({name: lesson})
        const chatroom = await chatroomModel.findOne({user_id, child_id, lesson_id: lesson_id._id})
        if(chatroom) {
            const messages = await messagesModel.find({room}).sort({createdAt: -1})
            socket.emit('room', {room: chatroom, messages})
            return
        }
        const new_room = await chatroomModel.create({user_id, child_id, lesson_id: lesson_id._id})
        const messages = await messagesModel.find({room}).sort({createdAt: -1})
        console.log(111, messages);
        io.to(`${room}`).emit('room', {room: new_room, messages});
    })

    // socket.on('message', async ({text, room_id, user_id, name_room}) => {
    socket.on('message', async ({text, room}) => {
        console.log("СРАБАТЫВАЕТ ЕБАНЫЙ МЭСЭДЖ!!!");
        // const message = await messagesModel.create({text, room_id, user_id})
        // const room = await chatroomModel.findById(room_id)
        // room.messages = [...room.messages, message._id]
        // await room.save()
        // const fullroom = await chatroomModel.findById(room_id).populate('messages')
        // fullroom.messages = fullroom.messages.sort((a, b) => new Date(b.time) - new Date(a.time))
        // io.to(`${name_room}`).emit('room', fullroom);

        await messagesModel.create({text, room})
        const messages = await messagesModel.find({room}).sort({createdAt: -1})
        console.log(111,messages);
        io.to(`${room}`).emit('messages', messages);
    })

    // socket.on("del_mes", async ({mes_id, room_id, name_room}) => {
    socket.on("del_mes", async ({mes_id, room}) => {
        // const room = await chatroomModel.findById(room_id)
        // const index_mes = room.messages.findIndex(id => id === mes_id)
        // room.messages = [...room.messages.slice(0, index_mes), ...room.messages.slice(index_mes + 1)]
        // await room.save()
        console.log("СРАБАТЫВАЕТ ЕБАНЫЙ ДЕЛЕТ!!!");
        // await messagesModel.deleteOne({_id: mes_id})
        // const fullroom = await chatroomModel.findById(room_id).populate('messages')
        // fullroom.messages = fullroom.messages.sort((a, b) => new Date(b.time) - new Date(a.time))
        // io.to(`${name_room}`).emit('room', fullroom);

        await messagesModel.deleteOne({_id: mes_id})
        const messages = await messagesModel.find({room}).sort({createdAt: -1})
        io.to(`${room}`).emit('messages', messages);
    })

    io.on('disconnect', () => {
        console.log("disconnect");
    })
})

async function startServer(){
    try {
        await mongoose.connect(process.env.DB_URL)
            .then(()=>console.log('DB ok'))
            .catch((e)=>console.log('DB error', e))
            server.listen(PORT, (err)=>{
            if(err) return console.log(1,err)
            console.log(`server on ${PORT}`)
        });
    } catch (error) {
        console.log(error)
    }
}

startServer()