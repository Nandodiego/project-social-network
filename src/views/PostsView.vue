<template>
    <div>
        <section class="section">
            <div class="section__container-name">
                <img class="container-name__image" :src="userData.userImage" alt="image">
                <h2 class="container-name__text">{{userData.nickUser}}</h2>
            </div>
            <div class="section__container-information">
                <img class="container-information__image" :src="userData.postImage" alt="publication image">
                <p class="container-information__text">{{userData.postDescription}}</p>
            </div>
        </section>
    </div>
</template>

<script>
import userImageDefect from '../assets/user-image.webp';
import { postsServices } from '../services/posts/posts.services.js';
import { getCookie, } from '@/utils/cookies.helper'
import { userServices } from '../services/user/user.services.js'

export default {
    name: 'posts-view',
    data(){
        return{
            urlPost: '',
            userData: {
                nickUser: '',
                userImage: '',
                postImage: '',
                postDescription: ''
            }
        }
    },
    methods: {
        async getPost(id){
            try{
                const responsePost = await postsServices.getPostById(id, getCookie('token'));
                this.userData.postImage = responsePost.data.data.urlImage;
                this.userData.postDescription = responsePost.data.data.description;

                const responseUser = await userServices.userData(responsePost.data.data.userId, getCookie('token'));
                this.userData.nickUser = responseUser.data.data.user.nick;
                if(responseUser.data.data.user.urlImage.length === 0){
                    this.userData.userImage = userImageDefect;
                }else{
                    this.userData.userImage = responseUser.data.data.user.urlImage;
                }
            }catch(error){
                console.error(error);
            }
        }
    },
    async mounted(){
        if(!getCookie('token')){
            this.$router.push({name: 'sign-in'});
        }
        this.urlPost = this.$route.query.urlPost;
        await this.getPost(this.urlPost);
    }
}
</script>

<style scoped>
    .section{
        height: 100vh;
        margin: 0 auto;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .section__container-name{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 180px;
        padding: 8px;
    }

    .container-name__image{
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
        margin-right: 8px;
    }

    .container-name__text{
        font-size: 16px;
        cursor: pointer;
    }

    .container-name__image:active{
        transform: scale(.9);
    }

    .container-name__text:active{
        transform: scale(.9);
    }

    .section__container-information{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .container-information__image{
        cursor: pointer;
        width: 100vw;
        max-height: 420px;
        min-height: 420px;
        object-fit: cover;
    }

    .container-information__text{
        font-size: 14px;
        color: var(--color-text);
        padding: 8px;
    }

    .section__container-logos{
        display: flex;
        justify-content: end;
        border-radius: 10px;
    }

    .container-logos__div{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding-right: 10px;
        margin-bottom: 10px;
        width: 90px;
    }

    .div__logo{
        cursor: pointer;
    }

    .div__logo:active{
        transform: scale(.9);
    }

    @media(min-width: 744px){
        .container-name__image{
            width: 80px;
            height: 80px;
        }

        .container-name__text{
            font-size: 24px;
        }

        .container-information__text{
            font-size: 24px;
        }

        .container-information__image{
            max-height: 600px;
            min-height: 600px;
        }
    }
</style>