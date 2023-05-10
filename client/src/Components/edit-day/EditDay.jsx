import React from "react";
import "./style.css";

const EditDay = ({day, id, data}) => {

    return (
        <div className="edit-day">
            {data.map((el)=>
                <div key={`${el.lesson}${el.timing}${el.day}`}>
                    <div>{el.lesson}</div>
                    <div>{el.timing}</div>
                    <div>{el.day}</div>
                </div>
            )}
        </div>
    );
};

export default EditDay;
