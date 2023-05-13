import { Button } from "antd";
import React from "react";
import { Storage } from "../../store/singlton";

const Schedule = () => {
    const storage = new Storage()
    return (
        <div>
            <Button
                onClick={() => {
                    console.log(storage.data);
                    fetch("http://localhost:8000/getusers", {
                        credentials: "include",
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => console.log(data))
                        .catch((err) => console.log(err));
                }}
            >
                ===
            </Button>
        </div>
    );
};

export default Schedule;
