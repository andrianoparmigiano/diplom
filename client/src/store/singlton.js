import { makeObservable, action, observable } from "mobx";

export class Storage {
    static _instance = null;

    data = {};

    // конструктор
    constructor() {
        makeObservable(
            this,
            {
                data: observable,
                dropData: action,
                setData: action,
            },
            { deep: true }
        );

        if (Storage._instance) return Storage._instance;

        Storage._instance = this;
    }

    // действие: сбросить данные
    dropData(field) {
        delete this.data[field];
    }

    // действие: размещение данных
    setData(field, value) {
        this.data[field] = value;
    }
}
