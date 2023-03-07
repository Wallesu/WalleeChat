import { defineStore } from "pinia";

export const user = defineStore("user", {
	state: () => {
		return {
            id: 0,
			email: '',
            nickname: '',
            bio: '',
            photo: ''
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
            this.bio = bio
        },
        setPhoto(photo:string){
            this.photo = photo
        }
    }
})
