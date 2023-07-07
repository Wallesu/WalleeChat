const router = require('express').Router()
const db = require('../db/connection')

/**
 * Save message in database
*/
async function saveMessage(message, sender_id, receiver_id){
    const connection = await db.connection
    if(!sender_id || !receiver_id) {
        console.log('Erro ao salvar mensagem')
        return
    }

    connection.execute(
        'INSERT INTO messages (content, sender_id, receiver_id, createdAt, updatedAt) VALUES (?,?,?,NOW(),NOW())',
        [message, sender_id, receiver_id]
    )
    .then(() => { return })
    .catch(error => { throw new Error(error.message) })
}

async function getPreviousMessages(sender_id, receiver_id){
    const connection = await db.connection
    if(!sender_id || !receiver_id) {
        console.log('Erro ao carregar histórico')
        return
    }

    let messages = await connection.execute(
        `SELECT * FROM Messages
        WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
        ORDER BY createdAt`,
        [sender_id, receiver_id, receiver_id, sender_id]
    )
    .then(data => data[0])
    .catch(error => { throw new Error(error.message) })

    const sender = await connection.execute(
        `SELECT id, nickname, email FROM Users
        WHERE (id = ?)`,
        [sender_id]
    )
    .then(data => data[0][0])
    .catch(error => { throw new Error(error.message) })

    const receiver = await connection.execute(
        `SELECT id, nickname, email FROM users
        WHERE (id = ?)`,
        [receiver_id]
    )
    .then(data => data[0][0])
    .catch(error => { throw new Error(error.message) })

    messages = messages.map(message => {
        if(message.sender_id === sender.id) message.sender = sender
        else message.sender = receiver
        
        if(message.receiver_id === receiver.id) message.receiver = receiver
        else message.receiver = sender
        
        return {
            message: message.content,
            sender: message.sender,
            receiver: message.receiver,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
            deletedAt: message.deletedAt
        }
    })

    return messages
}

function generateJwtToken({user, expiresIn, secret, jwtService}){
    const token = jwtService.sign({
            id: user.id,
            email: user.email
        },
        secret,
        {
            algorithm: 'HS256',
            expiresIn: expiresIn
        }
    )

    return token
}


module.exports = {
    saveMessage,
    getPreviousMessages,
    generateJwtToken
}