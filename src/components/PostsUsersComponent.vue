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
                <img class="img image-row" src="../assets/logo.svg" alt="">
            </div>
        </div>
        <div class="div"
            :class="{'div-column': active}"
        >
            <article class="container__image-column"
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
            height: '420px',
            description: '',
            arrayPosts: [],
            showModal: false,
            userData: {},
            userPost: {
                urlImage: '',
                description: ''
            },
            postId: '',
            showDeletePost: true
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
        closeModal(){
            this.showModal = false;
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

    .div{
        display: grid;
        width: 100%;
        margin: auto;
        grid-template-columns: repeat(3,1fr);
    }

    .div-column{
        display: grid;
        width: 100%;
        margin: auto;
        grid-template-columns: repeat(1,1fr);
    }

    .div-column .galery__image{
        object-fit: cover;
        width: 100%;
        height: 420px;
    }

    .container__image-column{
        margin: 2px;
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

        .image-row{
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

         .div-column .galery__image{
            height: 650px;
        }
    }
</style>