import Registration from "./Components/registration/Registration";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Components/main/Main";
import Login from "./Components/login/Login";
import EditPanel from "./Components/edit_panel/EditPanel";
import { useEffect } from "react";
import Logout from "./Components/Logout/logout";
import { Storage } from "./store/singlton";
import Chat from "./Components/chat/chat";
import Home from "./Components/home/Home";
import Schedule from "./Components/schedule/Schedule";

function App() {
    useEffect(() => {
        const storage = new Storage();
        storage.setData("location", window.location.pathname);
        fetch(`http://localhost:8000/checkauth`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.message === "Пользователь не авторизован!") {
                    storage.setData("user", "unauth");
                    localStorage.setItem("user", "unauth");
                    return;
                }
                localStorage.setItem("user", data);
                storage.setData("user", data);
            })
            .catch((err) => console.log(err))
        // if(localStorage.getItem('token')) storage.setData('auth', true)
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route path="/" element={<Home />} />
                <Route path="/editpanel" element={<EditPanel />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/auth/registration" element={<Registration />} />
                <Route path="/chat" element={<Chat />} />
            </Route>
        </Routes>
    );
}

export default App;
