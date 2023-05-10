import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import './style.css'

const Main = () => {
    return (
        <div className="main">
            <Navbar />
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
};

export default Main;
