<template>
    <div class="body">
        <section class="section">
            <div class="section__div">
                <img class="div__image" :src="userProfile.userImage" alt="">
                <div class="div__container">
                    <h1 class="container__name">{{userProfile.nick}}</h1>
                    <p class="container__text">{{userProfile.description}}</p>
                </div>
            </div>
            <div class="section__containerFollow">
                <button :class="{'containerFollow__button' : isActive}" @click="changeFollow()" class="containerFollow-button">{{follow}}</button>
            </div>
        </section>
        <section>
            <figure>
                <PostsUsersComponent
                    :id="id"
                    :userImage="userProfile.userImage"
                    :userName="userProfile.nick"
                />
            </figure>
        </section>
    </div>  
</template>

<script>
import { getCookie } from '@/utils/cookies.helper'
import { userServices } from '../services/user/user.services.js'
import {followServices} from '../services/follow/follow.services'
import userImageDefect from '../assets/user-image.webp';
import PostsUsersComponent from '@/components/PostsUsersComponent'

export default {
    name: 'user-profile-view',
    components: {
        PostsUsersComponent
    },
    data(){
        return{
           isActive: false,   
           userProfile: {
               userId: '',
               nick: '',
               description: '',
               userImage: ''
           },
           follow: 'Seguir',
        }
    },
    props: {
        id:{
            type: String
        }
    },
    methods: {
        changeFollow(){
                this.isActive = !this.isActive;

                if(this.isActive){
                    this.followUser();
                    this.follow = 'Siguiendo';
                }else{
                    this.unFollowUser();
                    this.follow = 'Seguir';
                }
            
        },
        async userInformation(){
            try{
                const response = await userServices.userData(this.id, getCookie('token'));
            
                this.userProfile.nick = response.data.data.user.nick;
                this.userProfile.description = response.data.data.description;
                this.userProfile.userImage = response.data.data.user.urlImage;

                if(this.userProfile.description.length === 0){
                    this.userProfile.description = 'No se encontró una descripción.';
                }

                if(this.userProfile.userImage.length === 0){
                    this.userProfile.userImage = userImageDefect;
                }
                
            }catch(error){
                this.$router.push({name: 'view-error'})
            }
        },
        async followUser(){
            try{
                await followServices.followUser(getCookie('token'), {
                    user_from: getCookie('userId'),
                    user_to: this.id
                });

            }catch(error){
                console.error(error);
            }
        },
        async unFollowUser(){          
            await followServices.unFollowUser(getCookie('token'), {
                user_from: getCookie('userId'),
                user_to: this.id
            });
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
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section{
        margin-top: 12px;
        border-bottom: var(--border-sections);
        width: 100%;
    }

    .section__div{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .div__image{
        object-fit: cover;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        cursor: pointer;
    }

    .container__name{
        font-size: 16px;
        margin-bottom: 8px;
    }

    .container__text{
        font-size: 12px;
        width: 215px;
    }

    .section__containerFollow{
        width: 92%;
        display: flex;
        justify-content: end;
    }

    .containerFollow-button{
        text-align: center;
        width: 120px;
        height: 30px;
        border: none;
        border-radius: 8px;
        background: var(--bg-button-follow);
        color: var(--color-follow);
        margin-top: 10px;
        font-weight: 600;
        text-decoration: none;
        margin-bottom: 15px;
    }

    .containerFollow__button{
        text-align: center;
        width: 120px;
        height: 30px;
        border: none;
        border-radius: 8px;
        background: var(--bg-button-followed);
        color: var(--color-follow);
        margin-top: 10px;
        font-weight: 600;
        text-decoration: none;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .containerFollow-button:active{
        transform: scale(.9);
    }

    .containerFollow-button{
        cursor: pointer;
    }

    @media(min-width: 744px){
        .section__div{
            align-items: center;
        }

        .div__image{
            width: 180px;
            height: 180px;
        }

        .container__name{
            font-size: 30px;
        }

        .container__text{
            width: 420px;
            font-size: 24px;
        }

        .section__containerFollow{
            width: 95%;
        }

        .containerFollow-button{
            font-size: 24px;
            width: 180px;
            height: 45px;
        }
    }

    @media(min-width: 1280px){
        .section{
            width: 935px;
            padding-bottom: 24px;
            margin-top: 50px;
        }

        .div__image{
            width: 150px;
            height: 150px;
        }

        .container{
            justify-content: space-evenly;
            margin-bottom: 16px;
            margin-top: 16px;
        }

        .container__name{
            font-size: 25px;
        }

        .container__text{
            width: 580px;
            font-size: 25px;
        }

        .img{
            width: 40px;
            height: 50px;
        }

        .postsRow{
            width: 50.5px;
            height: 50.5px;
        }

    }
</style>