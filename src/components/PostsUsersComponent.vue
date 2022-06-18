<template>
    <div>
        <div class="container">
            <div 
                 @click="changeDivColumn()"
            >
                <img class="img" src="../assets/logotwo.svg" alt="">
            </div>
            <div
                @click="changeDivRow()"
            >
                <img class="img postsRow" src="../assets/logo.svg" alt="">
            </div>
        </div>
        <div class="containerNotFoundPosts" v-if="arrayPosts.length === 0">
            <p class="containerNotFoundPosts__text">No hay publicaciones disponibles</p>
        </div>
        <div class="div"
            :class="{'containerColumn': active}"
        >
            <article class="container__postsColumn"
                v-for="post in arrayPosts" :key="post.id"
            >
                <img @click="getPostsById(post.id)" class="galery__image" :src="post.urlImage" alt="">
                <modal-component 
                    v-if="showModal"
                    @closeModal="closeModal()"
                    @likePost="likePost(postId)"
                    @deletePost="deletePost(postId)"
                    :amountLikes="post.likes"
                    :postId="postId"
                    :userImage="userImage"
                    :userName="userName"
                    :userPostImage="userPost.urlImage"
                    :userPostDescription="userPost.description"
                    :showDeletePost="showDeletePost"
                    :changeIcon="changeIcon"
                />
            </article>
        </div>
    </div>
</template>

<script>

import {postsServices} from '../services/posts/posts.services.js';
import { userServices } from '../services/user/user.services.js'
import { getCookie } from '@/utils/cookies.helper';
import ModalComponent from '@/components/ModalComponent';

export default {
    name: 'posts-users',
    components: {
        ModalComponent
    },
    data(){
        return {
            active: false,
            arrayPosts: [],
            showModal: false,
            userData: {},
            userPost: {
                urlImage: '',
                description: ''
            },
            postId: '',
            showDeletePost: true,
            changeIcon: false
        }
    },
    props: {
        id: {
            type: String
        },
        userImage: {
            type: String
        },
        userName: {
            type: String
        }
    },
    methods: {
        changeDivColumn(){
            this.active = true;
        },
        changeDivRow(){
            this.active = false;
        },
        async getPostsByUser(){
            try{
                const response = await postsServices.getPostsByUser(this.id, getCookie('token'));
                this.arrayPosts = response.data.data;
                if(getCookie('userId') !== this.id){
                    this.showDeletePost = !this.showDeletePost;
                }
            }catch(error){
                console.error(error);
            }
        },
        getPostsById(postId){
            const userPost = this.arrayPosts.find(post => post.id === postId);
            this.postId = postId;
            this.userPost.urlImage = userPost.urlImage;
            this.userPost.description = userPost.description;
            this.showModal = true;

            this.changeIcon = true;
        },
        closeModal(){
            this.showModal = false;
        },
        async getUserData(){
            try{
                const response = await userServices.userData(this.id, getCookie('token'));
                this.userData = response.data.data.user;
            }catch(error){
                console.error(error);
            }
        },
        async likePost(postId){
            try{
                await postsServices.likePostByUser(postId, getCookie('token'));

                const index = this.arrayPosts.findIndex(post => post.id === postId);
                this.arrayPosts[index].likes++;
            }catch(error){
                console.error(error);
            }
        },
        async deletePost(postId){
            try{
                this.arrayPosts = [];
                this.showModal = false;
                
                await postsServices.deletePost(postId, getCookie('token'));
                this.getPostsByUserLogin()
            }catch(error){
                console.error(error);
            }
        },
    },
    mounted(){
        this.getPostsByUser();
        this.getUserData();
    }
}
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 8px;
        width: 100vw;
    }

    .img{
        cursor: pointer;
    }

     .postsRow{
        cursor: pointer;
    }

    .containerNotFoundPosts{
        margin-top: 12px;
    }

    .containerNotFoundPosts__text{
        font-size: 14px;
        text-align: center;
    }

    .div{
        display: grid;
        width: 100%;
        margin: auto;
        grid-template-columns: repeat(3,1fr);
    }

    .containerColumn{
        display: grid;
        width: 100%;
        margin: auto;
        grid-template-columns: repeat(1,1fr);
    }

     .container__postsColumn{
        margin: 2px;
    }

    .containerColumn .galery__image{
        object-fit: cover;
        width: 100%;
        height: 420px;
    }

    .galery__image{
        object-fit: cover;
        width: 122px;
        height: 140px;
    }

    @media(min-width: 744px){
        .img{
            width: 40px;
            height: 50px;
        }

        .containerNotFoundPosts{
            margin-top: 24px;
        }

        .containerNotFoundPosts__text{
            font-size: 24px;
        }

        .postsRow{
            width: 50.5px;
            height: 50.5px;
        }

        .div{
            padding: 4px;
        }

        .galery__image{
            width: 100%;
            height: 240px;
        }

         .containerColumn .galery__image{
            height: 650px;
        }
    }

    @media(min-width: 1280px){
        .container{
            justify-content: space-evenly;
        }

        .div{
            width: 935px;
        }

        .galery__image{
            width: 293px;
            height: 293px;
            cursor: pointer;
        }

        .containerColumn .galery__image{
            height: 820px;
        }
    }
</style>