<template>
    <div class="body">
        <section id="preview" class="section">
            <img @click="logOut()" class="section__iconExit" src="../assets/icon exit.svg" alt="icon exit">
            <img id="img" class="section__image" :src="userProfile.userImage" alt="profile-image">
            <form class="section__divFile"
            >
                <input ref="file" type="file" name="fileToUpload" id="inputFile" accept="image/png" @change="changeFile()" />
                <img class="divFile__iconEdit" src="../assets/icon-edit.svg" alt="icon edit">
            </form>
            <div class="section__container">
                <h1 class="container__name">{{userProfile.nick}}</h1>
                <p class="container__text">{{userProfile.description}}</p>
            </div>
        </section>
        <section>
            <figure>
                <MyProfilePostsComponent
                    :userName="userProfile.nick"
                    :userImage="userProfile.userImage"
                />
            </figure>
        </section>
    </div>  
</template>

<script>

import { userServices } from '../services/user/user.services.js'
import { getCookie, deleteCookie} from '@/utils/cookies.helper'
import userImageDefect from '../assets/user-image.webp';
import MyProfilePostsComponent from '@/components/MyProfilePostsComponent'

export default {
    name: 'my-profile-view',
    components: {
        MyProfilePostsComponent
    },
    data(){
        return{
           hasActive: false,
           userProfile: {
               userId: '',
               nick: '',
               description: '',
               userImage: ''
           },
            file: '',
        }
    },
    methods: {
        changeDivColumn(){
            this.hasActive = true;
            
        },
        changeDivRow(){
            this.hasActive = false;
        },
        async userInformation(){
           try{
                const response = await userServices.userData(getCookie('userId'), {
                    token: getCookie('token')
                });

                this.userProfile.nick = response.data.data.user.nick;
                this.userProfile.description = response.data.data.description;
                this.userProfile.userImage = response.data.data.user.urlImage;
                this.userProfile.userId = response.data.data.userId;

                if(this.userProfile.description.length === 0){
                    this.description = 'No se encontró una descripción.';
                }

                if(this.userProfile.userImage.length === 0){
                    this.userProfile.userImage = userImageDefect;
                }

           }catch(error){
               console.error(error);
           }
        },
        async changeFile(){
            try{
                this.file = this.$refs.file.files[0];
                const formData = new FormData();
                formData.append('file', this.file);
                
                await userServices.changeImage(getCookie('userId'), getCookie('token'), formData);
                await this.userInformation();
            }catch(error){
                console.error(error);
            }
        },
        logOut(){
            deleteCookie('token');
            this.$router.push({name: 'sign-in'});
        }
    },
    mounted(){
        if(!getCookie('token')){
            this.$router.push({name: 'sign-in'});
        }
        this.userInformation();
    }
}
</script>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section__divFile{
        position: absolute;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        top: 70px;
        left: 25%;
    }

    #inputFile{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .section{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        border-bottom: var(--border-sections);
        margin-top: 12px;
        width: 100%;
    }

    .section__iconExit{
        position: absolute;
        transform: translateX(165px);
    }

    .section__image{
        object-fit: cover;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        cursor: pointer;
        margin-bottom: 12px;
    }

    .divFile__iconEdit{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        cursor: pointer;
    }

    .divFile__iconEdit:active{
        transform: scale(.9);
    }

    .container__name{
        font-size: 16px;
        margin-bottom: 8px;
    }

    .container__text{
        font-size: 12px;
        width: 215px;
        margin-bottom: 15px;
    }

    @media(min-width: 744px){
        .section{
            align-items: center;
        }

        .section__iconExit{
            height: 50px;
            width: 50px;
            left: 70%;
            top: 1%;
        }

        .section__image{
            width: 180px;
            height: 180px;
        }

        .section__divFile{
            width: 60px;
            height: 60px;
            top: 130px;
            left: 25%;
        }

        .divFile__iconEdit{
            width: 60px;
            height: 60px;
        }

        .container__name{
            font-size: 30px;
        }

        .container__text{
            width: 420px;
            font-size: 24px;
        }
    }
</style>