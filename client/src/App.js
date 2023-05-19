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
    const storage = new Storage();
    const navigate = useNavigate();
    useEffect(() => {
        storage.setData("location", window.location.pathname);
        storage.setData("user", "unauth");
        
        // проверить авторизацию и получить данные о пользователе
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
            if (data.message === "Непредвиденная ошибка") {
                navigate("/");
                return;
            }
            if (data.message === "Пользователь не авторизован!") {
                storage.setData("user", "unauth");
                return;
            }
            storage.setData("user", data);

            if(storage.data.user?.role === "admin"){
                fetch(`http://localhost:8000/getlessons`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("lessons",data);
                        if (storage.data.user !== "unauth")
                            storage.setData("lessons", data);
                    })
                    .catch((err) => console.log(err));
                
                // получить всех пользователей для редактирования
                fetch(`http://localhost:8000/getusers`, {
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
                    storage.setData("users", data);
                })
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => console.log(err))
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
