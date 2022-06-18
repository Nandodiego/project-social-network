<template>
    <div class="body">
        <section id="preview" class="section">
            <div class="section__containerProfile">
                <img id="img" class="containerProfile__image" :src="userProfile.userImage" alt="profile-image">
                <form class="containerProfile__form"
                >
                    <input ref="file" type="file" name="fileToUpload" id="inputFile" accept="image/png" @change="changeFile()" />
                    <img class="form__iconEdit" src="../assets/icon-edit.svg" alt="icon edit">
                </form>
            </div>
            <div class="section__container">
                <div class="container__div">
                    <h1 class="div__name">{{userProfile.nick}}</h1>
                    <img @click="logOut()" class="div__iconExit" src="../assets/icon exit.svg" alt="icon exit">
                </div>
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

    .section{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        border-bottom: var(--border-sections);
        margin-top: 12px;
        width: 100%;
    }

    .section__containerProfile{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: relative;
    }

    .containerProfile__image{
        object-fit: cover;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        cursor: pointer;
        margin-bottom: 12px;
    }

    .containerProfile__form{
        position: absolute;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        top: 62px;
        left: 56%;
    }

    #inputFile{
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
    }

    .form__iconEdit{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        cursor: pointer;
        bottom: 42px;
    }

    .form__iconEdit:active{
        transform: scale(.9);
    }

    .container__div{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .div__name{
        font-size: 16px;
        margin-bottom: 8px;
    }

    .div__iconExit{
        width: 26px;
        height: 26px;
        cursor: pointer;
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

        .containerProfile__image{
            width: 180px;
            height: 180px;
        }

        .containerProfile__form{
            width: 60px;
            height: 60px;
            top: 110px;
            left: 116px;
        }

        .section__containerProfile{
            width: 180px;
            height: 180px;
        }

        .form__iconEdit{
            width: 60px;
            height: 60px;
            bottom: 64px;
        }

        .div__name{
            font-size: 30px;
        }

        .div__iconExit{
            width: 40px;
            height: 40px;
        }

        .container__text{
            width: 420px;
            font-size: 24px;
        }
    }

    @media(min-width: 1280px){
        .section{
            width: 935px;
            padding-bottom: 24px;
            margin-top: 50px;
        }

        .section__containerProfile{
            display: flex;
            flex-direction: revert;
            align-items: center;
            justify-content: center;
        }

        .containerProfile__form{
            height: 38px;
            width: 38px;
            top: 118px;
            left: 120px;
        }

        .containerProfile__image{
            width: 150px;
            height: 150px;
            margin-bottom: 0;
        }

        #inputFile{
            height: 38px;
            width: 38px;  
        }

        .form__iconEdit{
            height: 38px;
            width: 38px;
        }

        .div__iconExit{
            width: 40px;
            height: 40px;
        }

        .section__container{
            width: 580px;
        }

        .container__text{
            width: 100%;
            margin-bottom: 0;
        }

        .div__name{
            font-size: 25px;
        }

        .container__text{
            font-size: 25px;
        }

        .div{
            width: 935px;
        }

        .article__image{
            width: 293px;
            height: 293px;
        }
    }
</style>