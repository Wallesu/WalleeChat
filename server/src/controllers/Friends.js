const router = require('express').Router()
const db = require('../db/connection')

router.get('/:id', async (req, res) => {
    try {
        const formatUser = (user) => {
            return {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                bio: user.bio,
                createdAt: user.createdAt
            }
        }

        const connection = await db.connection
        let friends = await connection.execute(`
            SELECT * FROM Friends
            INNER JOIN Users ON Friends.user2_id = Users.id
            WHERE Friends.user1_id = ? AND Friends.status = 1 AND Users.deletedAt IS NULL
        `, [req.params.id]
        ).then(data => {
            return data[0].map(user => {
                return { ...formatUser(user), photo_id: user.photo_id }
            })
        })
        friends = friends.concat(
            await connection.execute(`
                SELECT * FROM Friends
                INNER JOIN Users ON Friends.user1_id = Users.id
                WHERE Friends.user2_id = ? AND Friends.status = 1 AND Users.deletedAt IS NULL
            `, [req.params.id]
            ).then(data => {
                return data[0].map(user => {
                    return { ...formatUser(user), photo_id: user.photo_id }
                })
            })
        )

        if(!friends.length) return res.status(200).json([])

        const loadUsersPhotos = async (users) => {
            const photosId = users.filter(user => user.photo_id).map(user => user.photo_id)
            const usersPhotos = await connection.execute(`SELECT * FROM Photos WHERE id IN (${photosId})`).then(data => {
                return data[0]
            })

            users = users.map(user => {
                const userPhoto = usersPhotos.find(userPhoto => userPhoto.id === user.photo_id)
                return { ...formatUser(user), photo: userPhoto }
            })
            return users
        }

        friends = await loadUsersPhotos(friends)
        
        return res.status(200).json(friends)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get('/add/:id', async (req, res) => {
    try {
        const connection = await db.connection

        let photo = await connection.execute('SELECT * FROM photos WHERE id = ?', [req.params.id]).then(data => data[0][0])
    
        return res.status(200).json(photo || null)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router