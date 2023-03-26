const router = require('express').Router()
const db = require('../db/connection')
const bcrypt = require('bcrypt')


router.post('/register', async (req, res) => {
    try {
        const connection = await db.connectToDatabase()

        let form = req.body

        if(!form.nickname) return res.status(400).json({message: 'nickname required'})
        if(form.nickname.length < 3) return res.status(400).json({message: 'nickname should have at last 3 characters'})

        if(!form.password) return res.status(400).json({message: 'password required'})
        if(form.password.length < 8) return res.status(400).json({message: 'password should have at last 8 characters'})

        if(!form.email) return res.status(400).json({message: 'email required'})
        if(!form.email.includes('@')) return res.status(400).json({message: 'type a valid email'})

        const usersWithSameEmail = await connection.execute('SELECT email FROM Users WHERE email = ? AND deletedAt IS NULL', [form.email]).then(data => data[0])
        if(usersWithSameEmail.length) return res.status(400).json({message: 'email already registered'})

        const passwordHash = await bcrypt.hash(form.password, 10)

        const [ rows ] = await connection.execute('INSERT INTO Users (nickname, password, email, createdAt, updatedAt) VALUES (?,?,?,NOW(),NOW())', [form.nickname, passwordHash, form.email])

        // const [ rows ] = await connection.execute('SELECT * FROM Users')
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const connection = await db.connectToDatabase()
        let form = req.body

        if(!form.email) return res.status(400).json({message: 'email required'})
        if(!form.password) return res.status(400).json({message: 'password required'})

        const user = await connection.execute('SELECT * FROM Users WHERE email = ? AND deletedAt IS NULL', [form.email]).then(data => data[0][0])
        if(!user) return res.status(400).json({message: 'email not registered'})

        const validPassword = await bcrypt.compare(form.password, user.password)

        if(!validPassword) return res.status(400).json({message: 'incorrect password'})

        return res.status(200).json({
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            photo: user.photo,
            bio: user.bio,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const connection = await db.connectToDatabase()
        const users = await connection.execute('SELECT * FROM Users WHERE deletedAt IS NULL').then(data => {
            return data[0].map(user => {
                return {
                    id: user.id,
                    email: user.email,
                    nickname: user.nickname,
                    createdAt: user.createdAt
                }
            })
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router