import React, { useEffect, useRef, useState } from "react";
import { Storage } from "../../store/singlton";
import "./style.css";
import { observer } from "mobx-react-lite";
import { Button, Card, Input, Space, TreeSelect } from "antd";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import io from "socket.io-client"

const socket = io.connect("http://localhost:8000")

const Chat = () => {
    const storage = new Storage();

    const [room, setRoom] = useState("none");
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        // Обработка сообщений от сервера
        socket.on('room', (data) => {
            console.log(data);
            storage.setData('room', data.room)
            storage.setData('messages', data.messages)
        });
        socket.on('messages', (data) => {
            console.log(data);
            storage.setData('messages', data)
        });
    }, []);

    const sendmessage = () => {
        if(messageInput === ''){
            alert("Вы ничего не ввели!")
            return
        }
        // socket.emit('message', {text: messageInput, room_id: storage.data.room._id, user_id: storage.data.user._id, name_room: room,});
        socket.emit('message', {user_id: storage.data.user._id, room, text: messageInput});
        setMessageInput('');
    };

    // const deleteMessage = (mes_id, room_id) => {
    const deleteMessage = (mes_id, room) => {
        // socket.emit('del_mes', {mes_id, room_id, name_room: room,});
        socket.emit('del_mes', {mes_id, room});
    };

    const onChangeRoom = (room) => {
        setRoom(() => room);
        console.log(room);
        if(room === "none") return
        socket.emit('join', {
            user_id: room.split('-')[0],
            child_id: room.split('-')[2],
            lesson: room.split('-')[4],
            // name_room: room,
            room: room,
        });
    };
    
    return (storage.data.user === "unauth" || 
    <>{<TreeSelect  
            treeDefaultExpandAll
            value={room}
            // defaultValue="none"
            className="selectchildrenlesson"
            onChange={onChangeRoom}
            treeData={
                storage.getRoomData
            }
        />}
        {room === "none" || <>{<div className="chat">
            {
                storage.data?.messages?.map(mes => 
                    <Card key={`${mes._id}${storage.data.room._id}`} hoverable className="message">
                        <div className="id">User - {mes.user_id.fullName}</div>
                        {storage.data.user?.role === "user" && <div className="name">Ребенок - {room.split('-')[3]}</div>}
                        <div className="text">
                            {mes.text}
                        </div>
                        <div className="time">{new Date(mes.createdAt).toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={() => deleteMessage(mes._id, room)}/>
                    </Card>
                )
            }
        </div>}
        <div className="inp_and_title">
            <Space.Compact className="inp_space">
                <Input 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onPressEnter={sendmessage}
                />
                <Button type="primary" onClick={sendmessage}>
                    <SendOutlined />
                </Button>
            </Space.Compact>
            <div className="lesson">{room.split('-')[4]}</div>
        </div></>}
    </>
    );
};

export default observer(Chat);
