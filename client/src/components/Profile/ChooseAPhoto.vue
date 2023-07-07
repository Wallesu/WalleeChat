<template class="chooseAPhoto">
    <Transition name="modal">
        <div class="chooseAPhoto-mask" v-if="active">
            <div class="chooseAPhoto-container">
                <i class='bx bx-x chooseAPhoto-container-closeIcon' @click="close"></i>
                <div
                    class="chooseAPhoto-container-photo"
                    :style="`background-image: url('${photo.url}')`"
                ><span v-if="loadingPhoto" style="color: black">Carregando...</span></div>
                <div class="chooseAPhoto-container-description">
                    <div class="chooseAPhoto-container-description-title">
                        {{photo.title}}
                    </div>
                    <div
                        v-if="photo.url"
                        class="chooseAPhoto-container-description-content"
                    >
                        <div>
                            fotógrafo: <a
                                :href="photo.photographer_url"
                                target="_blank"
                            >{{ photo.photographer }}</a>
                        </div>
                        <div>
                            original: <a :href="photo.website" target="_blank">{{ photo.website }}</a>
                        </div>
                    </div>
                    <div class="chooseAPhoto-container-buttons">
                        <div class="chooseAPhoto-container-previousButton">
                            <i
                                class="bx bx-chevron-left"
                                @click="previousPhoto"
                                ></i>
                        </div>
                        <div class="chooseAPhoto-container-changePhotoButton">
                            <button @click="changePhoto">Alterar foto</button>
                        </div>
                        <div class="chooseAPhoto-container-nextButton">
                            <i
                                class="bx bx-chevron-right"
                                @click="nextPhoto"
                            ></i>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </Transition>
</template>
<script lang="ts">
import axios from 'axios'
const loadImage = (src:string) =>
  new Promise((resolve, reject) => {
    const img:HTMLImageElement = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
})
import { user } from '../../stores/user';

export default {
    name: 'ChooseAPhoto',
    data() {
        return {
            activeEl: false,
            photo: {
                id: 0,
                title: '',
                url: '',
                tiny_url: '',
                photographer: '',
                photographer_url: '',
                website: '',
                loaded: ''
            },
            loadingPhoto: false,
            photos: [{
                id: 0,
                title: '',
                url: '',
                tiny_url: '',
                photographer: '',
                photographer_url: '',
                website: '',
                loaded: ''
            }],
            loadingPhotos: false,
            currentPhotoIndex: 0,
        };
    },
    mounted () {
        //pega a foto atual do usuário
        if(user().photo.url.length){
            this.loadingPhoto = true

            this.photo.id = user().photo.id
            this.photo.title = user().photo.title
            this.photo.url = user().photo.url
            this.photo.photographer = user().photo.photographer
            this.photo.photographer_url = user().photo.photographer_url
            this.photo.website = user().photo.website

            loadImage(this.photo.url).then(() => {
                this.loadingPhoto = false
            })
        }
        
        this.getPhotos()
        

    },
    methods: {
        close(){
            this.activeEl = false
        },
        getPhotos(){
            try {
                axios.get('http://localhost:3000/photos?page=20').then(res => {
                    this.photos = res.data
                    this.photos.push(this.photo)
                })
            } catch (error: any) {
                console.error('Error when get images. Error: ', error.message)
            }
            
        },
        changePhoto(){
            user().setPhoto(this.photo.id)
        },
        previousPhoto(){
            this.currentPhotoIndex--
            this.photo = this.photos[this.currentPhotoIndex] 
        },
        nextPhoto(){
            this.currentPhotoIndex++
            this.photo = this.photos[this.currentPhotoIndex]
        }
    },
    props: {
        active: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        active(newValue: boolean) {
            this.activeEl = newValue;
        },
        activeEl(newValue: boolean) {
            if(newValue !== this.active){
                this.$emit('update:active', newValue)
            }
        },
        photo(newValue: any){
            this.loadingPhoto = true
            loadImage(newValue.url).then(() => {
                this.loadingPhoto = false
            })
        }
    },
};
</script>
<style scoped lang="scss">
    .chooseAPhoto{
        &-mask{
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.250);
            position: absolute;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &-container{
            min-width: 25rem;
            width: 50%;
            // width: 30rem;
            min-height: 30rem;
            height: 50%;
            background: black;
            position: relative;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            padding: 1rem;
            &-closeIcon{
                position: absolute;
                right: 0;
                top: 0;
                font-size: 2rem;
                cursor: pointer;
                transition: 0.25s;
                &:hover{
                    transform: rotate(90deg);
                    color: red;
                }
            }
            &-photo{
                width: 20rem;
                height: 20rem;
                background: white;
                border-radius: 200px;
                // background-image: url(v-bind('url'));
                background-size: cover;
                display: flex;
                justify-content: center;
                align-items: center;            
            }
            &-description{
                font-size: 0.9rem;
                padding: 1rem;
                &-title{
                    text-align: center;
                }
                &-content{
                    padding: 1rem 0;
                }
            }
            &-buttons{
                display: flex;
                align-items: center;
            }
            &-previousButton, &-nextButton{
                font-size: 2rem;
                padding: 0 1rem;
                cursor: pointer;
                transition: 0.1s;
                &:hover{
                    transform: scale(1.15);
                }
            }
            &-changePhotoButton{
                width: 100%;
                display: flex;
                justify-content: center;
                button{
                    color: white;
                    background: #73A2BF;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 3px;
                    cursor: pointer;
                    &:hover{
                        background-color: #4A738C;
                        // transform: scale(1.01);
                    }
                }
            }
        }
    }
</style>
