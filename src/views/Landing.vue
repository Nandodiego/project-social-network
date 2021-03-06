<template>
    <div @click="hidenDivList($event)">
        <section class="section">
            <input @click="showList()" @keyup.enter="findUserByNick()" v-model="findUser" class="section__input" placeholder="Buscar..." type="search">
            <img @click="findUserByNick()" class="section__loupe" src="../assets/loupe.png" alt="icon loupe">
            <p class="section__textError" v-if="hasTextErrorSearch">Lo sentimos, el usuario no existe</p>
            <div class="section__divList" v-if="hasList">
                <FindUserComponent
                    v-for="nick in listNicks" :key="nick.id"
                    :nick="nick.nick"
                    :profileImage="nick.urlImage"
                    @getUserLanding="getUserLanding(nick.id)"
                    @closeList="closeList()"
                />
            </div>
        </section>
        <img @click="changeView(userLoginId)" class="icon__myProfile" src="../assets/Group.svg" alt="logo my profile">
        <img @click="showModalCreatePost()" class="icon__createPost" src="../assets/iconCreatePost.svg" alt="logo create post">
        <ModalComponentCreatePost
            v-if="isModalCreatePost"
            @createPost="newPost($event)"
            @closeModal="closeModal()"
        />
        <landing-component
            v-for="post in arrayPosts" :key="post.id"
            :description="post.description"
            :image="post.urlImage"
            :userImage="post.user.urlImage"
            :nick="post.user.nick"
            :postId="post.id"
            :amountLikes="post.likes"
            @likePost="likePost(post.id)"
            @getUserLanding="getUserLanding(post.user.id)"
            >
        </landing-component>
    </div>
</template>
<script>

import { postsServices } from '../services/posts/posts.services.js';
import userImageDefect from '../assets/user-image.webp';
import LandingComponent from '../components/LandingComponent.vue';
import ModalComponentCreatePost from '../components/ModalCreatePosts';
import { getCookie } from '@/utils/cookies.helper'
import { userServices } from '../services/user/user.services.js';
import FindUserComponent from '@/components/FindUserComponent.vue';


export default {
    name: 'landing-view',
    data(){
        return{
            arrayPosts: [],
            userLoginId: '',
            isModalCreatePost: false,
            findUser: '', 
            hasList: false,
            listNicks: [],
            hasTextErrorSearch: false,
        }
    },
    components: {
        LandingComponent,
        ModalComponentCreatePost,
        FindUserComponent
    },
    methods: {
        async getAllPosts(){
            try{
                const response = await postsServices.getAllPosts(getCookie('token'));
                this.arrayPosts.push(...response.data.data);

                for(let i = 0; i<this.arrayPosts.length; i++){
                    if(this.arrayPosts[i].user.urlImage.length === 0){
                        this.arrayPosts[i].user.urlImage = userImageDefect;
                        this.userPostId = this.arrayPosts[i].userId;
                    }
                }
                
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
        async newPost(post){
            try{
                await postsServices.createPost(getCookie('token'), post);
                this.isModalCreatePost = false;
                this.arrayPosts = [];
                this.getAllPosts();
            }catch(error){
                console.error(error);
            }
        },
        showList(){ 
            this.hasList = true;
        },
        async findUserByNick(){
            try{
                const response = await userServices.findUser(getCookie('token'), {
                    nick: this.findUser
                });

                this.hasList = true;
                this.listNicks = response.data.data;

                if(this.listNicks.length === 0){                  
                    this.hasList = false;
                    setTimeout(() => {
                        this.hasTextErrorSearch = false;
                    }, 2000, this.hasTextErrorSearch = true);

                }else if(this.listNicks.length > 0){
                    this.hasTextErrorSearch = false;                 
                }

                if(this.findUser.length === 0){
                    this.hasList = false;
                    setTimeout(() => {
                        this.hasTextErrorSearch = false;
                    }, 2000, this.hasTextErrorSearch = true);
                }

            }catch(error){ 
                console.error(error);
            }
        },
        hidenDivList(e){
            if(e.target._prevClass !== "section__input"){
                this.hasList = false;
            }
        },
        closeList(){
            this.hasList = false;
        },
        showModalCreatePost(){
            this.isModalCreatePost = true;
        },
        changeView(id){
            this.$router.push({name: 'my-profile', params: {id}});
        },
        getUserLanding(id){        
            if(id === getCookie('userId')){
                this.$router.push({name:'my-profile', params: {id}});
            }else{
                this.$router.push({name: 'user-profile', params: {id}});
            }
        },
        closeModal(){
            this.isModalCreatePost = !this.isModalCreatePost;
        },
        
    },
    mounted(){
        if(!getCookie('token')){
            this.$router.push({name: 'sign-in'});
        }
                
        this.getAllPosts();
        this.userLoginId = getCookie('userId');
    }
}
</script>

<style scoped>
    .section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 24px;
        margin-bottom: 44px;
    }

    .section__input{
        width: 200px;
        height: 30px;
        border: none;
        border: var(--border-inputs);
        border-radius: 8px;
        font-size: 16px;
        padding: 0px 8px;
    }

    .section__input:focus{
        outline: none;
    }

    .section__loupe{
        width: 16px;
        height: 16px;
        position: absolute;
        transform: translateX(82px);
        cursor: pointer;
    }

    .section__textError{
        position: absolute;
        transform: translateY(32px);
    }

    .section__divList{
        box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
        display: flex;
        flex-direction: column;
        width: 200px;
        position: absolute;
        top: 54px;
        background: var(--white);
        padding: 6px 10px 10px 10px;;
    }

    .icon__myProfile{
        position: absolute;
        top: 22px;
        left: 6%;
        cursor: pointer;
    }

    .icon__myProfile:active{
        transform: scale(.9);
    }

    .icon__createPost{
        cursor: pointer;
        left: 85%;
        top: 22px;
        position: absolute;
    }

    .icon__createPost:active{
        transform: scale(.9);
    }

    @media(min-width: 744px){
        .section{
            margin-top: 50px;
        }

        .section__loupe{
            width: 24px;
            height: 24px;
            position: absolute;
            transform: translateX(164px);
        }

        .section__divList{
            width: 380px;
            height: 5%;
            top: 100px;
        }

        .section__input{
            width: 380px;
            height: 50px;
            font-size: 24px;
        }

        .icon__myProfile{
            top: 0;
            top: 37px;
            width: 80px;
            height: 80px;
        }

        .icon__createPost{
            width: 72px;
            height: 72px;
            top: 40px;
        }
    }

    @media(min-width: 1280px){
        .section__input{
            width: 200px;
            height: 30px;
            font-size: 16px;
        }

        .section__divList{
            width: 200px;
            top: 80px;
        }

        .section__loupe{
            transform: translateX(80px);
            width: 14px;
            height: 14px;
        }

        .icon__myProfile{
            width: 40px;
            height: 32.95px;
            top: 50px;
            left: 32%;
        }

        .icon__createPost{
            width: 30px;
            height: 35px;
            left: 65%;
            top: 50px;
        }
    
    }
</style>