import type User from './User'

interface Message {
    sender: User,
    receiver: User,
    message: string
}

export default Message