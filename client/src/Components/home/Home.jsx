import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Collapse, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Storage } from "../../store/singlton";
import "./style.css"

const { Panel } = Collapse;

const Home = () => {
    const storage = new Storage();

    useEffect(() => {
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
    }, [storage.data.user]);

    const add = () => {
        storage.setData("lessons", [...storage.data.lessons, ""]);
    };

    const remove = (i) => {
        storage.setData("lessons", [
            ...storage.data.lessons.slice(0, i),
            ...storage.data.lessons.slice(i + 1),
        ]);
    };

    const setchildsles = (i) => {
        fetch(`http://localhost:8000/setchildsles`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(storage.data.user.children[i]),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    const setlessons = () => {
        console.log(storage.data.lessons)
        if(storage.data.lessons.some(les => les === '')) {
            alert("Вы ничего не ввели!")
            return
        }
        if (
            new Set(storage.data.lessons).size !== storage.data.lessons.length
        ) {
            alert("Вы создали одинаковые кружки!");
            return;
        }
        fetch(`http://localhost:8000/setlessons`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(storage.data.lessons),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                storage.setData("lessons", data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="home">
            {storage.data.user === "unauth" ? null : storage.data.user?.role === "user" ? 
            (<div className="childs-les">
                    <Collapse expandIconPosition={"end"} className="collapse">
                        {storage.data.user.children.map((child, i) => (
                            <Panel header={child.name} key={child._id}>
                                    <Checkbox.Group
                                        options={
                                            storage.data?.lessons
                                                ? storage.data.lessons
                                                : []
                                        }
                                        value={child.lessons}
                                        onChange={(checkedValues) => {
                                            console.log(checkedValues);
                                            storage.data.user.children = [...storage.data.user.children.slice(0,i),
                                            {...storage.data.user.children[i], lessons: checkedValues},
                                            ...storage.data.user.children.slice(i + 1)]
                                        }}
                                    />
                                    <Button type="primary" onClick={()=>setchildsles(i)}>
                                        Submit
                                    </Button>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            ) : (
                <div className="setlesson">
                    <div className="les-scroll">{storage.data?.lessons &&
                        storage.data.lessons.map((lesson, i) => (
                            <div className="les" key={i}>
                                <Input
                                    placeholder="lesson"
                                    value={lesson}
                                    className="input-les"
                                    onChange={(e) => {
                                        storage.setData("lessons", [
                                            ...storage.data.lessons.slice(0,i),
                                            e.target.value,
                                            ...storage.data.lessons.slice(i + 1),
                                        ]);
                                    }}
                                />
                                <div className="icon-minus"><MinusCircleOutlined
                                    onClick={() => remove(i)}
                                /></div>
                            </div>
                        ))}</div>
                    <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                    >
                        Add field
                    </Button>
                    <Button type="primary" onClick={setlessons}>
                        Submit
                    </Button>
                </div>
            )}
        </div>
    );
};

export default observer(Home);
