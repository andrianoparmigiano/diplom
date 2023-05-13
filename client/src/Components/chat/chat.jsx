import React, { useEffect, useState } from "react";
import { Storage } from "../../store/singlton";
import "./style.css";
import { observer } from "mobx-react-lite";
import { Button, Card, Cascader, Input, Select, Space, TreeSelect } from "antd";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import io from "socket.io-client"

// const socket = io.connect("http://localhost:8000")

const Chat = () => {
    const storage = new Storage();

    const [room, setRoom] = useState("none");

    const sendmessage = () => {
        // socket.emit()
    };

    const deleteMessage = () => {};

    const onChangeChild = (value) => {
        setRoom(value);
        console.log(value);
        const user_id = room.split('-')[0]
        fetch(`http://localhost:8000/getmessages`, {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({}),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            storage.setData('messages', data)
        })
        .catch((err) => console.log(err));
        // socket.on('join', )
    };

    let a = new Date(Date.now());

    console.log(storage.getRoomData);

    return (storage.data.user === "unauth" || 
    <>{<TreeSelect  
        treeDefaultExpandAll
        value={room}
        // defaultValue="none"
        className="selectchildrenlesson"
        onChange={onChangeChild}
        treeData={
            storage.getRoomData
        }
    />}
        {room === "none" || <div className="chat">
                {/*  <div className="mes"> */}
                    <Card hoverable className="message">
                        <div className="id">24359082736-</div>
                        <div className="name">aaa</div>
                        <div className="text">
                            erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                        </div>
                        <div className="time">{a.toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                    </Card>
                    <Card hoverable className="message">
                        <div className="id">24359082736-</div>
                        <div className="name">aaa</div>
                        <div className="text">
                            erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                        </div>
                        <div className="time">{a.toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                    </Card>
                    <Card hoverable className="message">
                        <div className="id">24359082736-</div>
                        <div className="name">aaa</div>
                        <div className="text">
                            erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                        </div>
                        <div className="time">{a.toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                    </Card>
                    <Card hoverable className="message">
                        <div className="id">24359082736-</div>
                        <div className="name">aaa</div>
                        <div className="text">
                            erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                        </div>
                        <div className="time">{a.toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                    </Card>
                    <Card hoverable className="message">
                        <div className="id">24359082736-</div>
                        <div className="name">aaa</div>
                        <div className="text">
                            erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                        </div>
                        <div className="time">{a.toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                    </Card>
                    <Card hoverable className="message">
                        <div className="id">24359082736-</div>
                        <div className="name">aaa</div>
                        <div className="text">
                            erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                        </div>
                        <div className="time">{a.toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                    </Card>
                    <Card hoverable className="message">
                        <div className="id">24359082736-</div>
                        <div className="name">aaa</div>
                        <div className="text">
                            erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                        </div>
                        <div className="time">{a.toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                    </Card>
                    <Card hoverable className="message">
                        <div className="id">{room.split('-')[1]}</div>
                        <div className="name">{room.split('-')[3]}</div>
                        <div className="text">
                            erghnlkj;sroflthinerghnlkj;sroflthinerghnlkj;sroflthin/erghnlkj;sroflthinderghnlkj;sroflthinierghnlkj;sroflthinv
                        </div>
                        <div className="time">{a.toLocaleString("ru")}</div>
                        <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={deleteMessage}/>
                    </Card>
                </div>
                }
        {/* </div> */}
        {room === "none" || <div className="inp_and_title">
            <Space.Compact className="inp_space">
                <Input />
                <Button type="primary" onClick={sendmessage}>
                    <SendOutlined />
                </Button>
            </Space.Compact>
            <div className="lesson">{room.split('-')[4]}</div>
        </div>}
    </>
    );
};

export default observer(Chat);
