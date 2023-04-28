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
            photo_id: user.photo_id,
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
        let users = await connection.execute('SELECT * FROM Users WHERE deletedAt IS NULL').then(data => {
            return data[0].map(user => {
                return {
                    id: user.id,
                    email: user.email,
                    nickname: user.nickname,
                    photo_id: user.photo_id,
                    createdAt: user.createdAt
                }
            })
        })

        const loadUsersPhotos = async (users) => {
            const photosId = users.filter(user => user.photo_id).map(user => user.photo_id)
            const usersPhotos = await connection.execute(`SELECT * FROM Photos WHERE id IN (${photosId})`).then(data => {
                return data[0]
            })

            users = users.map(user => {
                const userPhoto = usersPhotos.find(userPhoto => userPhoto.id === user.photo_id)
                return {
                    id: user.id,
                    email: user.email,
                    nickname: user.nickname,
                    photo: userPhoto || null,
                    createdAt: user.createdAt
                }
            })
            return users
        }

        users = await loadUsersPhotos(users)
        
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({message: 'É necessário informar o id do usuário que deseja atualizar'})

        const connection = await db.connectToDatabase()
        const user = await connection.execute('SELECT * FROM Users WHERE id = ? AND deletedAt IS NULL', [id]).then(data => {
            return {
                id: data[0][0].id,
                nickname: data[0][0].nickname,
                bio: data[0][0].bio,
                photo_id: data[0][0].photo_id
            }
        })

        

        let dataToUpdate = {}

        dataToUpdate.nickname = req.body.nickname || user.nickname
        dataToUpdate.bio = req.body.bio || user.bio 
        dataToUpdate.photo_id = req.body.photo_id || user.photo_id

        await connection.execute('UPDATE users SET nickname = ?,bio = ?, photo_id = ?, updatedAt = NOW() WHERE id = ?',
            [dataToUpdate.nickname, dataToUpdate.bio, dataToUpdate.photo_id, user.id]
        )

        return res.status(201)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router