const router = require('express').Router()
const db = require('../db/connection')

router.get('/', async (req, res) => {
    try {
        const connection = await db.connectToDatabase()
        
        let limit = 20
        let page = req.query.page || 0
        
        if(typeof page !== Number) page = 0

        const photo = await connection.execute(`SELECT * FROM photos ORDER BY id limit ${limit} OFFSET ${limit * page}`).then(data => data[0])
        
        return res.status(200).json(photo || null)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const connection = await db.connectToDatabase()

        let photo = await connection.execute('SELECT * FROM photos WHERE id = ?', [req.params.id]).then(data => data[0][0])
    
        return res.status(200).json(photo || null)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})




module.exports = router