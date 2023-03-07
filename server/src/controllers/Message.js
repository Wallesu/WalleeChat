const router = require('express').Router()
const getPreviousMessages = require('../functions/index').getPreviousMessages

router.get('/previous', async (req, res) => {
    try {
        const sender_id = req.query.sender_id
        const receiver_id = req.query.receiver_id

        if(!sender_id) return res.status(400).json({message: 'param sender_id required'})
        if(!receiver_id) return res.status(400).json({message: 'param receiver_id required'})

        const messages = await getPreviousMessages(sender_id, receiver_id)
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router