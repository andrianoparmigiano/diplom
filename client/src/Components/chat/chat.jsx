import React, { useEffect, useState } from "react";
import { Storage } from "../../store/singlton";
import "./style.css";
import { observer } from "mobx-react-lite";
import { Button, Card, Input, Select, Space, TreeSelect } from "antd";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import io from "socket.io-client"

const socket = io.connect("http://localhost:8000")

const Chat = () => {
    const storage = new Storage();

    useEffect(()=>{
        if(storage.data.user?.role === "admin"){
            fetch(`http://localhost:8000/getchildren`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                storage.setData('children', data)
            })
            .catch((err) => console.log(err));
        }
        if(storage.data.user?.role === "user"){
            console.log(storage.data.user.children);
            storage.setData('children', storage.data.user.children)
        }
    })

    const [room, setRoom] = useState("none");

    const sendmessage = () => {
        socket.emit()
    };

    const deleteMessage = () => {};

    const onChangeChild = (value) => {
        setRoom(value);
        console.log(value);
        fetch(`http://localhost:8000/getmessages`, {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            storage.setData('messages', data)
        })
        .catch((err) => console.log(err));
        socket.on('join', )
    };

    let a = new Date(Date.now());

    return (storage.data.user === "unauth" || 
        <div className="chat">
            {<Select
                defaultValue="none"
                className="selectchildrenlesson"
                onChange={onChangeChild}
                options={storage.data.children ? 
                    [...storage.data.children.map(el => ({
                        label: el.name,
                        options: el.lessons.map(les => ({
                            value: `${les}-${el._id}`,
                            label: les,
                        }))
                    })).filter(el => el.options.length !== 0)
                    , {value: "none", label: "Select the lesson chat"}] : []
                }
            />}
            {room === "none" || <><div className="mes">
                <Card hoverable className="message">
                    <div className="id">24359082736-</div>
                    <div className="name">aaa</div>
                    <div className="text">
                        erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                    </div>
                    <div className="time">{a.toLocaleString("ru")}</div>
                    <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                </Card>
            </div>
            <div className="inp_and_title">
                <Space.Compact className="inp_space">
                    <Input />
                    <Button type="primary" onClick={sendmessage}>
                        <SendOutlined />
                    </Button>
                </Space.Compact>
                <div className="lesson">{room.split('-')[0]}</div>
            </div></>}
        </div>
    );
};

export default observer(Chat);
