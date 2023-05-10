export default class ErrorInServer extends Error {
    status;
    errors;
    
    constructor(status, message, errors = []){
        super(message)
        this.status = status
        this.errors = errors
    }

    static unauthError(){
        return new ErrorInServer(401, 'Пользователь не авторизован!')
    }

    static badRequest(message, errors = []){
        return new ErrorInServer(400, message, errors)
    }
}