import React, { useEffect, useState } from "react";
import "./style.css";
import {
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    HomeOutlined,
    EditOutlined,
    WechatOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import getItem from "../../func/getItem";
import { Storage } from "../../store/singlton";
import { observer } from 'mobx-react';

const menu = {
    unauth: [
        getItem('HOME', "/", <Link to='/'><HomeOutlined /></Link>, null),
        getItem('ВХОД', "/auth/login", <Link to='/auth/login'><LoginOutlined /></Link>, null),
        getItem('РЕГИСТРАЦИЯ', "/auth/registration", <Link to='/auth/registration'><UserAddOutlined /></Link>, null),
    ],
    user: [
        getItem('HOME', "/", <Link to='/'><HomeOutlined /></Link>, null),
        getItem('SCHEDULE', "/schedule", <Link to='/schedule'>=</Link>, null),
        getItem('CHAT', "/chat", <Link to='/chat'><WechatOutlined /></Link>, null),
        getItem('ВЫХОД', "/auth/logout", <Link to='/auth/logout'><LogoutOutlined /></Link>, null),
    ],
    admin: [
        getItem('HOME', "/", <Link to='/'><HomeOutlined /></Link>, null),
        getItem('EDIT', "/editpanel", <Link to='/editpanel'><EditOutlined /></Link>, null),
        getItem('CHAT', "/chat", <Link to='/chat'><WechatOutlined /></Link>, null),
        getItem('ВЫХОД', "/auth/logout", <Link to='/auth/logout'><LogoutOutlined /></Link>, null),
    ]
}

const Navbar = () => {
    // const [collapsed, setCollapsed] = useState(false);
    // const toggleCollapsed = () => {
    //     setCollapsed(!collapsed);
    // };
    const storage = new Storage()
    const onSelect = e => storage.setData('location', e.key)
    return (
        <div
            className="nav"
        >
            {/* <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button> */}
            <Menu
                selectedKeys={storage.data.location}
                onSelect={onSelect}
                mode="inline"
                // theme="dark"
                // inlineCollapsed={collapsed}
                items={menu[storage.data.user ? storage.data.user === "unauth" ? "unauth" : storage.data.user.role : "unauth"]}
            />
        </div>
    );
};

export default observer(Navbar);
