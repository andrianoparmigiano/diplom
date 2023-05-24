import { Button, DatePicker, TreeSelect } from "antd";
import React from "react";
import { Storage } from "../../store/singlton";
import dayjs from "dayjs";
import { observer } from "mobx-react";

const Schedule = () => {
    const storage = new Storage()

    const onChangeDate = (date) => {
        if(!date){
            storage.setData("date", date)
            return
        }
        storage.setData("date", new Date(date.$d).toLocaleString('ru').split(", ")[0])
        fetch("http://localhost:8000/getschedule", {
            credentials: "include",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                date: new Date(date?.$d).toLocaleString('ru').split(", ")[0]
            })
        })
            .then((res) => res.json())
            .then((schedule) => {
                console.log(schedule)
                if(!schedule?.date) {
                    storage.setData("info_lessons", [])
                    console.log(storage.data.date);
                    return
                }
                storage.setData("date", schedule.date)
                storage.setData("info_lessons", schedule.info_lessons)
                console.log(storage.data.date);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <DatePicker className="date" onChange={onChangeDate} format={'DD.MM.YYYY'} value={storage.data.date ? dayjs(storage.data.date, 'DD.MM.YYYY') : null}/>
            {/* <TreeSelect  
                treeDefaultExpandAll
                value={schedule}
                // defaultValue="none"
                className="selectchildrenlesson"
                onChange={onChangeRoom}
                treeData={
                    storage.getRoomData
                }
            /> */}
        </>
    );
};

export default observer(Schedule);



// <Button
//     onClick={() => {
//         console.log(storage.data);
//         fetch("http://localhost:8000/getusers", {
//             credentials: "include",
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json;charset=UTF-8",
//             },
//         })
//             .then((res) => res.json())
//             .then((data) => console.log(data))
//             .catch((err) => console.log(err));
//     }}
// >
//     ===
// </Button>