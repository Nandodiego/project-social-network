<template>
    <div class="body">
        <section class="section">
            <div class="section__containerUserData">
                <img @click="getUserLanding($event)" class="containerUserData__image" :src="userData.userImage" alt="image">
                <h2 @click="getUserLanding($event)" class="containerUserData__text">{{userData.nickUser}}</h2>
            </div>
            <div class="section__containerUserPosts">
                <img class="containerUserPosts__image" :src="userData.postImage" alt="publication image">
                <p class="containerUserPosts__text">{{userData.postDescription}}</p>
                <div class="containerUserPosts__divLikes">
                    <img class="divLikes__icon" src="../assets/heart-icon.svg" alt="">
                    <p class="divLikes__amountLikes">{{userData.amountLikes}}</p>
                </div>
            </div>
            <div class="section__containerLikePost">
                <img class="containerLikePost__iconHeart" @click="likePost()" :src="iconLike" alt="icon like">
            </div>
        </section>
    </div>
</template>

<script>
import userImageDefect from '../assets/user-image.webp';
import { postsServices } from '../services/posts/posts.services.js';
import { getCookie, } from '@/utils/cookies.helper'
import { userServices } from '../services/user/user.services.js'

import heartIcon from '../assets/heart-icon.svg'
import like from '../assets/like.svg'


export default {
    name: 'posts-view',
    data(){
        return{
            urlPost: '',
            userData: {
                nickUser: '',
                userImage: '',
                postImage: '',
                postDescription: '',
                amountLikes: '',
                userId: ''
            },
            iconLike: like,
            icon: false,
            postId: '',
            arrayPost: []
        }
    },
    methods: {
        async getPost(id){
            try{
                const responsePost = await postsServices.getPostById(id, getCookie('token'));
                this.userData.postImage = responsePost.data.data.urlImage;
                this.userData.postDescription = responsePost.data.data.description;
                this.userData.amountLikes = responsePost.data.data.likes;
                this.postId = responsePost.data.data.id;

                this.arrayPost.push(responsePost.data.data);

                const responseUser = await userServices.userData(responsePost.data.data.userId, getCookie('token'));
                this.userData.nickUser = responseUser.data.data.user.nick;
                this.userData.userId = responseUser.data.data.user.id;

                if(responseUser.data.data.user.urlImage.length === 0){
                    this.userData.userImage = userImageDefect;
                }else{
                    this.userData.userImage = responseUser.data.data.user.urlImage;
                }
            }catch(error){
                console.error(error);
            }
        },
        async likePost(){
            try{
                this.icon = !this.icon;

                if(this.icon === true){
                    this.iconLike = heartIcon;
                    
                    await postsServices.likePostByUser(this.postId, getCookie('token'));
                    await this.getPost(this.postId);
                }else{

                    this.iconLike = like;
                }
            }catch(error){
                console.error(error);
            }
        },
        getUserLanding(id){
            id = this.userData.userId;
            this.$router.push({name: 'user-profile', params: {id}});
        },
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

    .section__containerUserData{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 180px;
        padding: 8px;
    }

    .containerUserData__image{
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
        margin-right: 8px;
    }

    .containerUserData__text{
        font-size: 16px;
        cursor: pointer;
    }

    .containerUserData__image:active{
        transform: scale(.9);
    }

    .containerUserData__text:active{
        transform: scale(.9);
    }

    .section__containerUserPosts{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .containerUserPosts__image{
        cursor: pointer;
        width: 100vw;
        max-height: 420px;
        min-height: 420px;
        object-fit: cover;
    }

    .containerUserPosts__divLikes{
        margin-left: 8px;
        display: flex;
        align-items: center;
    }

    .divLikes__icon{
        width: 18px;
        height: 18px;
        margin-right: 4px;
        cursor: pointer;
    }

    .divLikes__icon:active{
        transform: scale(.9);
    }

    .divLikes__amountLikes{
        font-size: 14px;
        line-height: 2;
        color: var(--color-text);
    }

    .containerUserPosts__text{
        font-size: 14px;
        color: var(--color-text);
        padding-top: 10px;
        margin-left: 8px;
    }

    .section__containerLikePost{
        display: flex;
        justify-content: end;
        padding-right: 10px;
    }

    .containerLikePost__iconHeart{
        cursor: pointer;
    }

    .containerLikePost__iconHeart:active{
        transform: scale(.9);
    }

    @media(min-width: 744px){

        .section__containerUserData{
            padding: 0px 0px 8px 16px;
        }

        .containerUserData__image{
            width: 80px;
            height: 80px;
        }

        .containerUserData__text{
            font-size: 24px;
        }

        .containerUserPosts__text{
            font-size: 24px;
        }

        .containerUserPosts__image{
            max-height: 650px;
            min-height: 650px;
        }

        .containerUserPosts__divLikes{
            margin-left: 16px;
        }

        .containerUserPosts__text{
            margin-left: 16px;
        }

        .divLikes__icon{
            width: 28px;
            height: 28px;
        }

        .divLikes__amountLikes{
            font-size: 24px;
        }

        .containerLikePost__iconHeart{
            width: 60px;
            height: 60px;
            margin-right: 16px;
        }
    }
</style>