
const jwt = require('jsonwebtoken')
const { secretToken } = require('../config/auth')



const verifyAccessToken = (req, res, next) => {
    try {
        if(!req.headers.authorization?.includes('Bearer ')) return res.status(401).json({ message: 'No access token' })

        const accessToken = req.headers.authorization.replace('Bearer ', '')
        const { id, email } = jwt.verify(accessToken, secretToken)

        req.headers.user = { id, email }

        next()
    } catch (error) {
        if(error.name = 'TokenExpiredError') return res.status(406).json({message: error.message, name: error.name, expiredAt: error.expiredAt})
        return res.status(401).json({ message: `Invalid access token (${error.message})` })
    }
    
}

module.exports = verifyAccessToken