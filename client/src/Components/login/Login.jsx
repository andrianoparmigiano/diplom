import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import "./style.css";
import { Storage } from "../../store/singlton";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Login = () => {
    const storage = new Storage();
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log(values);

        fetch(`http://localhost:8000${window.location.pathname}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(values),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.message === "Неверные почта или пароль!") {
                alert("Неверные почта или пароль!")
                return
            }
            if(data.message === "Непредвиденная ошибка"){
                alert("Непредвиденная ошибка")
                return
            }
            // localStorage.setItem('token', data.refreshToken)
            localStorage.setItem('user', data.user.role)
            storage.setData('user', data.user)
            navigate("/")
            storage.setData('location', window.location.pathname)
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!",
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(Login);
