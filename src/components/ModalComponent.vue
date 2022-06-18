<template>
    <div>
        <div class="body"
            @click="closeModal($event)"
        >
            <section class="section modal-movile"
            >
                <div class="section__containerUserData">
                    <div class="containerUserData__divData">
                        <img class="divData__image" :src="userImage" alt="image">
                        <h2 class="divData__username">{{userName}}</h2>
                    </div>
                    <div class="containerUserData__divDeletePost">
                        <img v-if="showDeletePost" @click="deletePost()" class="divDeletePost__icon" src="../assets/icon delete post.svg" alt="icon delete post">
                    </div>
                </div>
                <div class="section__containerUserInformation">
                    <img class="containerUserInformation__image" :src="userPostImage" alt="publication image">
                    <p class="containerUserInformation__text">
                        {{userPostDescription}}
                    </p>
                </div>
                <div v-if="amountLikes > 0" class="section__containerUserLike">
                    <img class="containerUserLike__icon" src="../assets/heart-icon.svg" alt="">
                    <p class="containerUserLike__amountLikes">
                        {{amountLikes}}
                    </p>
                </div>
                <div class="section__containerIcons">
                    <div class="containerIcons__div">
                        <img
                            @click="sharePost()"
                            v-clipboard:copy="`${postUrl}${postId}`"                     
                            v-clipboard:error="onError"
                            class="div__logo"
                            src="../assets/share.svg"
                            alt="icon copy"
                        >
                        <img 
                            @click="likePost()"
                            class="div__logo"
                            :src="likeLogo"
                            alt="icon like"
                        >
                    </div>
                    <p class="containerIcons__textShare" v-if="textShare">Post copiado</p>
                </div>
            </section>
            <modal-desktop-component
                class="modal-desktop"
                @likePost="likePost()"
                @deletePost="deletePost"
                @closeModalDesktop="closeModalDesktop()"
                :userImage="userImage"
                :userName="userName"
                :userPostImage="userPostImage"
                :userPostDescription="userPostDescription"
                :postId="postId"
                :amountLikes="amountLikes"
                :showDeletePost="showDeletePost"
                :changeIcon="changeIcon"
            />
        </div>
    </div>
</template>

<script>

import heartIcon from '../assets/heart-icon.svg';
import ModalDesktopComponent from '../components/ModalDesktopComponent.vue';
import like from '../assets/like.svg';

export default {
    name: 'modal-component',
    data(){
        return{
            likeLogo: like,
            iconHeart: false,
            postUrl: 'http://localhost:8080/posts-view?urlPost=',
            textShare: false,
        }
    },
    components: {
        ModalDesktopComponent
    },
    props: {
        userImage: {
            type: String
        },
        userName: {
            type: String
        },
        userPostImage: {
            type: String
        },
        userPostDescription: {
            type: String
        },
        postId: {
            type: String
        },
        amountLikes: {
            type: Number
        },
        showDeletePost: {
            type: Boolean
        },
        changeIcon: {
            type: Boolean
        }
    },
    methods: {
        deletePost(){
            this.$emit('deletePost');
        },
        onError(e){
            alert('Failed to copy the text to the clipboard');
            console.log(e);
        },
        likePost(){
            this.iconHeart = !this.iconHeart;
            
            if(this.iconHeart === true){
                this.$emit('likePost');
                this.likeLogo = heartIcon;
            }else{
                this.likeLogo = like;
            }
        },
        closeModal(e){
            if(e.target._prevClass === "body"){
                this.$emit('closeModal');
            }
        },
        closeModalDesktop(){
            this.$emit('closeModal');
        },
        sharePost(){
            setTimeout( () => {
                this.textShare = false;
            }, 2000, this.textShare = true);
        },
        
    },
}
</script>

<style scoped>
    .body{
        background-color:var(--bg-modal);
        width: 100%;
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        height: 100vh;
    }

    .section{
        width: 80%;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .section__containerUserData{
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;
        padding: 0px 10px 10px 10px;
    }

    .containerUserData__divData{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .divData__image{
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
        margin-right: 8px;
    }

    .divData__image:active{
        transform: scale(.9);
    }

    .divData__username{
        font-size: 16px;
        cursor: pointer;
    }

    .divData__username:active{
        transform: scale(.9);
    }

    .containerUserData__divDeletePost{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .divDeletePost__icon{
        width: 28px;
        height: 28px;
    }

    .divDeletePost__icon:active{
        transform: scale(.9);
    }

    .section__containerUserInformation{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .containerUserInformation__image{
        cursor: pointer;
        width: 100%;
        max-height: 420px;
        min-height: 420px;
        object-fit: cover;
    }

    .containerUserInformation__text{
        font-size: 14px;
        color: var(--color-text);
        padding-top: 10px;
        margin-left: 10px;
    }

    .section__containerUserLike{
        margin-left: 10px;
        display: flex;
        align-items: center;
    }

    .containerUserLike__icon{
        width: 18px;
        height: 18px;
        margin-right: 4px;
        cursor: pointer;
    }

    .containerUserLike__amountLikes{
        font-size: 14px;
        line-height: 2;
        color: var(--color-text);
    }

    .section__containerIcons{
        display: flex;
        justify-content: end;
        border-radius: 10px;
    }

    .containerIcons__div{
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

    .containerIcons__textShare{
        position: absolute;
        transform: translateX(168px);
        width: 100%;
        background: transparent;
    }

    .modal-movile{
        display: flex;
    }

    .modal-desktop{
        display: none;
    }

    @media(min-width: 744px){

        .section__containerUserData{
            width: 100%;
        }

        .divData__image{
            width: 80px;
            height: 80px;
        }

        .divData__username{
            font-size: 24px;
        }

        .divDeletePost__icon{
            width: 50px;
            height: 50px;
        }

        .containerUserInformation__image{
            min-height: 650px;
            max-height: 650px;
        }

        .containerUserInformation__text{
            font-size: 24px;
        }

        .containerUserLike__icon{
            width: 28px;
            height: 28px;
        }

        .containerUserLike__amountLikes{
            font-size: 24px;
        }

        .containerIcons__div{
            width: 160px;
        }

        .div__logo{
            width: 60px;
            height: 60px;
        }

        .containerIcons__textShare{
            font-size: 24px;
            transform: translateX(416px);
        }
    }

    @media(min-width: 1280px){
        .section{
            width: 1000px;
        }

        .modal-movile{
            display: none;
        }

        .modal-desktop{
            display: flex;
        }
    }
</style>