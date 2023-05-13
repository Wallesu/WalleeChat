const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { secretRefreshToken, expiresInToken, secretToken } = require('../config/auth')


router.post('/', async (req, res) => {
    try {   
        const refreshToken = req.body.refreshToken

        if(!refreshToken) return res.status(400).json({ message: 'refreshToken is required' })

        const { id, email } = jwt.verify(refreshToken, secretRefreshToken)

        const { generateJwtToken } = require('../functions/index')
        
        const accessToken = generateJwtToken({
            user: { id, email },
            secret: secretToken,
            expiresIn: expiresInToken,
            jwtService: jwt
        })

        return res.status(200).json({
            accessToken
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router