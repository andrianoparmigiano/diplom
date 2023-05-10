export default class UserDto{
    email
    id
    isActivated
    fullName
    role
    children

    constructor(model){
        this.email=model.email
        this.id=model._id
        this.isActivated=model.isActivated
        this.fullName=model.fullName
        this.role=model.role
        this.children=model.children
    }
}