import type Photo from './Photo'

interface User {
    id: number,
    nickname: string,
    email: string,
    bio: string,
    photo: Photo,
}

export default User