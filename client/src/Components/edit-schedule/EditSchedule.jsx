import {
    Button,
    Checkbox,
    Collapse,
    DatePicker,
    Form,
    Input,
    Modal,
    Radio,
    Rate,
    Space,
    Tabs,
    TimePicker,
    Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import "./style.css";
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import EditDay from "../edit-day/EditDay";
import { Storage } from "../../store/singlton";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react";
import TextArea from "antd/es/input/TextArea";

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const EditSchedule = () => {
    const storage = new Storage();
    const [save, setSave] = useState({
        time: storage.data.info_lessons?.every(les => les.time) && [],
        name: storage.data.info_lessons?.every(les => les.name !== "") && [],
        desc: storage.data.info_lessons?.every(les => les.desc !== "") && []
    });

    useEffect(() => {
        fetch("http://localhost:8000/getchildren", {
            credentials: "include",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                storage.setData("children", data)
            })
            .catch((err) => console.log(err));
    }, [])

    const add = () => {
        storage.setData("info_lessons", [...storage.data.info_lessons, {
            time: null,
            name: "",
            desc: "",
            journal: {
                children: [],
            }
        }]);
    }

    const del = (i) => {
        storage.setData("info_lessons", [
            ...storage.data.info_lessons.slice(0, i),
            ...storage.data.info_lessons.slice(i + 1),
        ]);
    }

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
                setSave({
                    time: true,
                    name: true,
                    desc: true
                })
                storage.setData("date", schedule.date)
                storage.setData("info_lessons", schedule.info_lessons)
                console.log(storage.data.date);
            })
            .catch((err) => console.log(err));
    };

    const setschedule = () => {
        console.log(JSON.parse(JSON.stringify(storage.data)))
        console.log(save);

        fetch("http://localhost:8000/setschedule", {
            credentials: "include",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                date: storage.data.date,
                info_lessons: storage.data.info_lessons
            })
        })
            .then((res) => res.json())
            .then((schedule) => {
                console.log(schedule.date, schedule.info_lessons)
                storage.setData("date", schedule.date)
                storage.setData("info_lessons", schedule.info_lessons)
                console.log(storage.data.date);
            })
            .catch((err) => console.log(err));
            
    };

    const time = (e, i) => {
        if(e){
            save.time = true
        }
        else{
            save.time = false
            setSave(save)
        }
        console.log(e);
        storage.setData("info_lessons", [
            ...storage.data.info_lessons.slice(0, i),
            {...storage.data.info_lessons[i], time: e && e.$d},
            ...storage.data.info_lessons.slice(i + 1)
        ])
    }

    const name = (e, i) => {
        if(e.target.value){
            save.name = true
        }
        else{
            save.name = false
            setSave(save)
        }
        console.log(e);
        const data = []
        for(let ch of storage.data.children){
            if(ch.lessons.includes(e.target.value)){
                data.push({child: ch, rating: 0, visit: false})
            }
        }
        storage.setData("info_lessons", [
            ...storage.data.info_lessons.slice(0, i),
            {...storage.data.info_lessons[i], name: e.target.value, journal: {children: data}},
            ...storage.data.info_lessons.slice(i + 1)
        ])
    }

    const desc = (e, i) => {
        if(e.target.value){
            save.desc = true
        }
        else{
            save.desc = false
            setSave(save)
        }
        console.log(e);
        storage.setData("info_lessons", [
            ...storage.data.info_lessons.slice(0, i),
            {...storage.data.info_lessons[i], desc: e.target.value},
            ...storage.data.info_lessons.slice(i + 1)
        ])
    }

    const visit = (e, ch_index, i) => {
        console.log(e);
        if(!e.target.checked){
            storage.data.info_lessons[i].journal.children[ch_index].rating = 0
        }
        storage.data.info_lessons[i].journal.children[ch_index].visit = e.target.checked
        storage.setData("info_lessons", storage.data.info_lessons)
    }

    const rating = (e, ch_index, i) => {
        console.log(e);
        if(storage.data.info_lessons[i].journal.children[ch_index].visit === false){
            alert("Ученик не присутствует!")
            return
        }
        storage.data.info_lessons[i].journal.children[ch_index].rating = e
        storage.setData("info_lessons", storage.data.info_lessons)
    }

    return (
        <>
            <DatePicker className="date" onChange={onChangeDate} format={'DD.MM.YYYY'} value={storage.data.date ? dayjs(storage.data.date, 'DD.MM.YYYY') : null}/>
            <div className="edit-schedule">
                {storage.data.date && storage.data.info_lessons &&
                storage.data.info_lessons.map((les, i) => <div onClick={()=>console.log(storage.data.date, dayjs(storage.data.date))} key={`${i}-${storage.data.date}`} className="les-info">
                    <Button type="primary" className="del" icon={<DeleteOutlined />} danger ghost onClick={() => del(i)}/>
                    <TimePicker value={les.time && dayjs(les.time)} placeholder="Введите время занятия" format={'HH:mm'} onChange={(e) => time(e, i)}/>
                    <Radio.Group value={les.name} onChange={(e) => name(e, i)}>
                        <Space className="les-info-names" direction="vertical">
                            <div className="les-info-names-label">Выберете занятие</div>
                            {storage.data.lessons.map(les => <Radio value={les}>{les}</Radio>)}
                        </Space>
                    </Radio.Group>
                    <TextArea placeholder="desc" value={les.desc} autoSize onChange={(e) => desc(e, i)}/>
                    {les.name !== '' && <Collapse >
                        <Panel header={`Журнал ${les.name}`} key={`${i}-${storage.data.date}-${les.name}`}>
                            <div className="dnevnik">
                                {
                                    les.journal.children.map((ch, ch_index) => 
                                        <div className="child-panel">
                                            <Checkbox onChange={(e) => visit(e, ch_index, i)} checked={ch.visit}>{ch.child.name}</Checkbox>
                                            <Rate onChange={(e) => rating(e, ch_index, i)} value={ch.rating} character={({ index }) => index + 1} />
                                        </div>)
                                }
                            </div>
                        </Panel>
                    </Collapse>}
                </div>)}
                {storage.data.date && <Button className="save-schedule" onClick={add}>+</Button>}
            </div>
            <Button className="save-schedule" disabled={Object.values(save).some(value => !value) || storage.data.info_lessons.length <= 0} onClick={setschedule}>{Object.values(save).some(value => !value) || storage.data.info_lessons.length <= 0 ? "Заполните все поля в расписании!" : 'Save'}</Button>
        </>
    );
};

export default observer(EditSchedule);
