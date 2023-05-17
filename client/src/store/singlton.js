import { makeObservable, action, observable, computed } from "mobx";

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
                getRoomData: computed,
            },
            { deep: true }
        );

        if (Storage._instance) return Storage._instance;

        Storage._instance = this;
    }

    get getRoomData(){
        return this.data.user?.role === 'admin' ? !this.data.users ? [] : 
            [...this.data.users.filter((user) => user.children && user.children?.length !== 0).map((user) => ({
                value: user._id,
                title: user.fullName,
                selectable: false,
                children: user.children.filter((child) => child.lessons && child.lessons?.length !== 0).map((child) => ({
                    value: `${user._id}-${user.fullName}-${child._id}-${child.name}`,
                    title: child.name,
                    selectable: false,
                    children: child.lessons.filter((les) => les.length !== 0).map((les) => ({
                        value: `${user._id}-${user.fullName}-${child._id}-${child.name}-${les}`,
                        title: les,
                    })),
                }))
            })), {value: "none", title: "Select the lesson chat"}] : 
            this.data.user?.role === 'user' ? 
            [...this.data.user.children.filter((child) => child.lessons && child.lessons?.length !== 0).map((child) => ({
                value: `${this.data.user._id}-${this.data.user.fullName}-${child._id}-${child.name}`,
                title: child.name,
                selectable: false,
                children: child.lessons.filter((les) => les.length !== 0).map((les) => ({
                    value: `${this.data.user._id}-${this.data.user.fullName}-${child._id}-${child.name}-${les}`,
                    title: les,
                })),
            })), {value: "none", title: "Select the lesson chat"}] : []
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
