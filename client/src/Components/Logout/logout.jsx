import { Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../store/singlton";

const Logout = () => {
    const storage = new Storage()
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:8000${window.location.pathname}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.message === "Непредвиденная ошибка"){
                alert("Непредвиденная ошибка")
                return
            }
            storage.setData('user', "unauth")
            navigate('/')
            storage.setData('location', window.location.pathname)
        })
        .catch((err) => console.log(err));
    })

    return (
        <div>
            <Spin tip={<span>выход...</span>}>
                <div className="content" />
            </Spin>
        </div>
    );
};

export default Logout;