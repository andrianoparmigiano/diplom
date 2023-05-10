import { Tabs } from "antd";
import React from "react";
import "./style.css";
import EditSchedule from "../edit-schedule/EditSchedule";

const EditPanel = () => {
    const options = [
        { label: "Расписание", value: <EditSchedule/> },
        { label: "Пользователи", value: "Пользователи" }
    ];

    return (
        <div className="edit-panel">
            <Tabs
            className="tabs"
                tabPosition={"top"}
                items={options.map((el)=>({
                    label: el.label,
                    key: el.label,
                    children: el.value,
                }))}
            />
        </div>
    );
};

export default EditPanel;
