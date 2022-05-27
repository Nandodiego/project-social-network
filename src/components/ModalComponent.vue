<template>
    <div>
        <div class="body"
            @click="closeModal($event)"
        >
            <section class="section">
                <div class="section__container-name">
                    <div class="container-name__div-data">
                        <img class="container-name__image" :src="userImage" alt="image">
                        <h2 class="container-name__text">{{userName}}</h2>
                    </div>
                    <div class="container-name__div-delete">
                        <img v-if="showDeletePost" @click="deletePost()" class="section__icon-x" src="../assets/icon delete post.svg" alt="icon delete post">
                    </div>
                </div>
                <div class="section__container-information">
                    <img class="container-information__image" :src="userPostImage" alt="publication image">
                    <p class="container-information__text">
                        {{userPostDescription}}
                    </p>
                </div>
                <div v-if="amountLikes > 0" class="section__container-likes">
                    <img class="container-likes__icon" src="../assets/heart-icon.svg" alt="">
                    <p class="container-likes__likes">
                        {{amountLikes}}
                    </p>
                </div>
                <div class="section__container-logos">
                    <div class="container-logos__div">
                        <img
                            v-clipboard:copy="`${postUrl}${postId}`"                     
                            v-clipboard:error="onError"
                            class="div__logo"
                            src="../assets/share.svg"
                            alt="">
                        <img @click="likePost()" class="div__logo" :src="likeLogo" alt="">
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>

import heartIcon from '../assets/heart-icon.svg'
import like from '../assets/like.svg'

export default {
    name: 'modal-component',
    data(){
        return{
            likeLogo: like,
            iconHeart: false,
            postUrl: 'http://localhost:8080/posts-view?urlPost=',
        }
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
        }
    },
    mounted(){
    }
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

    .section__container-name{
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;
        padding: 0px 10px 10px 10px;
    }

    .container-name__div-data{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .container-name__div-delete{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .section__icon-x{
        width: 28px;
        height: 28px;
    }

    .section__icon-x:active{
        transform: scale(.9);
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
        width: 100%;
        max-height: 420px;
        min-height: 420px;
        object-fit: cover;
    }

    .container-information__text{
        font-size: 14px;
        color: var(--color-text);
        padding-top: 10px;
        margin-left: 10px;
    }

    .section__container-likes{
        margin-left: 10px;
        display: flex;
        align-items: center;
    }

    .container-likes__icon{
        width: 18px;
        height: 18px;
        margin-right: 4px;
        cursor: pointer;
    }

    .container-likes__likes{
        font-size: 14px;
        line-height: 2;
        color: var(--color-text);
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
        .section{
            height: 960px;
        }

        .section__icon-x{
            width: 50px;
            height: 50px;
        }

        .section__container-name{
            width: 100%;
        }

        .container-name__image{
            width: 80px;
            height: 80px;
        }

        .container-name__text{
            font-size: 24px;
        }

        .container-information__image{
            min-height: 650px;
            max-height: 650px;
        }

        .container-information__text{
            font-size: 24px;
        }

        .container-likes__icon{
            width: 28px;
            height: 28px;
        }

        .container-likes__likes{
            font-size: 24px;
        }

        .section__container-logos{
            border-radius: 0;
        }

        .container-logos__div{
            width: 160px;
        }

        .div__logo{
            width: 60px;
            height: 60px;
        }

    }
</style>