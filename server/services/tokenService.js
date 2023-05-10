import jwt from 'jsonwebtoken'
import tokenModel from '../models/tokenModel.js'

class TokenService{
    generateToken(data){
        const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return refreshToken
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData){
            // tokenData.refreshToken = [...tokenData.refreshToken, refreshToken]
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken){
        const token = await tokenModel.deleteOne({refreshToken});
        return token;
    }
}

export default new TokenService()
