import { Button, Collapse, DatePicker, Form, Input, Radio, Space, Tabs, TimePicker } from "antd";
import React, { useEffect } from "react";
import "./style.css";
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EditDay from "../edit-day/EditDay";
// import lesson from "../../lesson.json"
import { Storage } from "../../store/singlton";
import dayjs from 'dayjs';

const { Panel } = Collapse;

const EditSchedule = () => {
    const [form] = Form.useForm();
    const storage = new Storage()
    // useEffect(()=>{
    //     storage.setData('open', lesson)
    // }, [])

    const days = [
        { header: "Понедельник", key: "ПН" },
        { header: "Вторник", key: "ВТ" },
        { header: "Среда", key: "СР" },
        { header: "Четверг", key: "ЧТ" },
        { header: "Пятница", key: "ПТ" },
        { header: "Суббота", key: "СБ" },
        { header: "Воскресенье", key: "ВС" },
    ];

    const onChange = (date, dateString) => {
        console.log(dateString.slice(0,-2));
    };

    const onFinish = (e) => {
        console.log(e.schedule.map(el=>({name: el.name, time: el.time.toString()})))
    }

    return (
        <div className="edit-schedule">
            <Button onClick={()=>{
                console.log(storage.data);
                fetch('http://localhost:8000/checkauth', {
                    credentials: 'include',
                    method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },}).then((res)=>res.json()).then((data) => 
                    console.log(data)).catch((err) => console.log(err));
            }}>===</Button>

            <DatePicker onChange={onChange} picker="week" />

            <Collapse expandIconPosition={"end"} className="collapse">
                {days.map((el) => (
                    <Panel header={el.header} key={el.key}>
                        <Form
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                                label="Child"
                            >
                                <Form.List name="schedule">
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
                                                        name={[name, "name", el.key]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please input lesson name!",
                                                                whitespace: true,
                                                            },
                                                        ]}
                                                    >
                                                        <Input 
                                                            placeholder="Child Name" 
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "time", el.key]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please input lesson time!",
                                                            },
                                                        ]}
                                                    >
                                                        <TimePicker 
                                                            // value={dayjs('12:08', 'HH:mm')} 
                                                            format={'HH:mm'}
                                                        />
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
                                                    icon={<PlusCircleOutlined />}
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
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                        {/* <EditDay day={el.header} id={el.key} data={lesson.filter((les)=>les.day === el.key)}/> */}
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default EditSchedule;
