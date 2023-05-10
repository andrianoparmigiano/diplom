import ErrorInServer from "../exceptions/error.js";

export default (err, req, res, next) => {
    console.log(err);
    if(err instanceof ErrorInServer) 
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    res.status(500).json({ message: 'Непредвиденная ошибка' })
}