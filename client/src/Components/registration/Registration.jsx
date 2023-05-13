import React, { useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import {
    SendOutlined,
    DownloadOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Storage } from "../../store/singlton";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Registration = () => {
    const [form] = Form.useForm();
    const storage = new Storage();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const data = {...values, children: values.children.map(el=>({name: el}))}
        console.log(data)
        fetch(`http://localhost:8000${window.location.pathname}`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data.message === "Неверные почта или пароль!") {
                    alert("Неверные почта или пароль!");
                    return;
                }
                if (data.message === `Пользователь с почтовым адресом ${values.email} уже существует!`) {
                    alert(`Пользователь с почтовым адресом ${values.email} уже существует!`);
                    return;
                }
                if (data.message === "Непредвиденная ошибка") {
                    alert("Непредвиденная ошибка");
                    return;
                }
                storage.setData('user', data.user)
                navigate("/");
                storage.setData("location", window.location.pathname);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="reg">
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
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
                            message: "Please input your password!",
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
                <Form.Item
                    name="fullName"
                    label="ФИО"
                    // tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: "Please input your nickname!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="ФИО" />
                </Form.Item>
                <Form.Item
                    label="Child"
                >
                    <Form.List name="children">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: "flex",
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={name}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input child name!",
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Child Name" />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                        />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ width: "100%" }}
                        htmlType="submit"
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(Registration);
