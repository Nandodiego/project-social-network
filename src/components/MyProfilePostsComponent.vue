<template>
    <div>
        <div class="container">
            <div 
                 @click="changeDivColumn()"
            >
                <img class="container__image" src="../assets/logotwo.svg" alt="">
            </div>
            <div
                @click="changeDivRow()"
            >
                <img class="container__img" src="../assets/logo.svg" alt="">
            </div>
        </div>
        <div class="div"
            :class="{'div-column': isColumn}"
        >
            <article class="div__article"
                v-for="post in arrayPosts" :key="post.id"
            >
                <img @click="getPostsById(post.id)" class="article__image" :src="post.urlImage" alt="">
                <modal-component 
                    v-if="showModal"
                    @closeModal="closeModal()"
                    @likePost="likePost(postId)"
                    @deletePost="deletePost(postId)"
                    :amountLikes="post.likes"
                    :postId="postId"
                    :userName="userName"
                    :userImage="userImage"
                    :userPostImage="userPost.urlImage"
                    :userPostDescription="userPost.description"
                    :showDeletePost="showDeletePost"
                />
            </article>
        </div>
    </div>
</template>

<script>

import { postsServices } from '../services/posts/posts.services.js';
import { getCookie, } from '@/utils/cookies.helper';
import ModalComponent from '@/components/ModalComponent';

export default {
    name: 'my-profile-posts',
    data(){
        return {
            isColumn: false,
            arrayPosts: [],
            showModal: false,
            userPost: {
                urlImage: '',
                description: ''
            },
            postId: '',
            showDeletePost: false
        }
    },
    props: {
        userName: {
            type: String
        },
        userImage: {
            type: String
        }
    },
    components: {
        ModalComponent
    },
    methods: {
        changeDivColumn(){
            this.isColumn = true;
        },
        changeDivRow(){
            this.isColumn = false;
        },
        async getPostsByUserLogin(){
            try{
                const response = await postsServices.getPostsByUser(getCookie('userId'), getCookie('token'));
                this.arrayPosts = response.data.data;
                
                if(getCookie('token')){
                    this.showDeletePost = !this.showDeletePost
                }
            }catch(error){
                console.error(error);
            }
        },
        getPostsById(postId){
            try{
                const userPost = this.arrayPosts.find(post => post.id === postId);
                this.postId = postId;
                
                this.userPost.urlImage = userPost.urlImage;
                this.userPost.description = userPost.description;

                this.showModal = true;
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
        this.getPostsByUserLogin();
    },
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

    .div-column .article__image{
        object-fit: cover;
        width: 100%;
        height: 420px;
    }

    .article__image{
        object-fit: cover;
        width: 122px;
        height: 140px;
    }

    @media(min-width: 744px){
        .container__image{
            width: 40px;
            height: 50px;
        }

        .container__img{
            width: 50.5px;
            height: 50.5px;
        }

        .div__article{
            margin: 2px;
        }

        .article__image{
            width: 100%;
            height: 240px;
        }

        .div{
            padding: 4px;
        }

        .div-column .article__image{
            height: 650px;
        }
    }
</style>