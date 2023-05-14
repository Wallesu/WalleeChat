import { defineStore } from "pinia";
import axios from 'axios'

export const user = defineStore("user", {
	state: () => {
		return {
            id: 0,
			email: '',
            nickname: '',
            bio: '',
            photo: {
                id: 0,
                title: '',
                url: '',
                tiny_url: '',
                photographer: '',
                photographer_url: '',
                website: '',
            }
		}
	},
    actions: {
        setId(id:number){
            this.id = id
        },
        setEmail(email:string){
            this.email = email
        },
        setNickname(nickname:string){
            this.nickname = nickname
        },
        setBio(bio:string){
            axios.put(`
                http://localhost:3000/users/${this.id}`,
                {bio: bio }
            ).then(() => {
                this.bio = bio
            })        
        },
        async setPhoto(photoId: Number){
            try {
                //busca o id da foto no banco de dados
                const photo = await axios.get(`
                    http://localhost:3000/photos/${photoId}
                `).then(res => res.data)


                //atualiza o id na tabela usuários
                axios.put(`
                    http://localhost:3000/users/${this.id}`,
                    {photo_id: photo.id }
                )
                this.photo = photo
                
            } catch (error) {
                console.error('ocurred an error during setting user photo. Error: ', error)
            }
        },
        logout(){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            this.id = 0
            this.email = ''
            this.nickname = ''
            this.bio = ''
            this.photo = {
                id: 0,
                title: '',
                url: '',
                tiny_url: '',
                photographer: '',
                photographer_url: '',
                website: '',
            }
        }
    }
})
