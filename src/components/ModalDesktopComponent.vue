<template>
    <div>
        <div class="body"
            @click="closeModal($event)"
        >
            <div class="main">
                <div class="postImageContainer">
                    <img class="postImageContainer__image" :src="userPostImage" alt="">
                </div>
                <div class="postInformationContainer">
                    <div class="postinformationContainer__interactionsContainer">
                        <img class="interactionsContainer__image" :src="userImage" alt="">
                        <div
                            class="interactionContainer__container"
                        >
                            <img 
                                class="container__iconCopy"
                                @click="sharePost()"
                                v-clipboard:copy="`${postUrl}${postId}`"                     
                                v-clipboard:error="onError"
                                src="../assets/share.svg"
                                alt="icon copy"
                            >
                            <img 
                                class="container__iconLike"
                                @click="likePost()"
                                :src="likeLogo"
                                alt="icon like"
                            >
                        </div>
                    </div>
                    <div class="postInformationContainer__userData">
                        <div>
                            <h2 class="userData__userName">{{userName}}</h2>
                            <p class="userData__description">{{userPostDescription}}</p>
                        </div>
                        <div class="userData__textShareContainer" v-if="textShare">
                            <p class="textShareContainer__textShare">Post Copiado</p>
                        </div>
                    </div>
                </div>
                <div class="divDeletePost">
                    <img v-if="showDeletePost" @click="deletePost()" class="divDeletePost__icon" src="../assets/icon delete post.svg" alt="icon delete post">
                    <img @click="closeModalDesktop()" class="divDeletePost__hidenModal" v-if="changeIcon" src="../assets/x.png" alt="icon exit">
                    <p class="divDeletePost__amountLikes">{{amountLikes}}</p>
                </div>
            
            </div>
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
            textShare: false
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
        closeModal(){
            this.$emit('closeModal')
        },
        closeModalDesktop(){
            this.$emit('closeModalDesktop');
        },
        sharePost(){
            setTimeout( () => {
                this.textShare = false;
            }, 2000, this.textShare = true);
        }
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
        margin: 0 auto;
        top: 0;
        left: 0;
        height: 100vh;
    }

    .main{
        display: flex;
        min-height: 751px;
        max-height: 751px;
        border-radius: 0 4px 4px 0;
    }

    .postImageContainer{
        max-height: 751px;
        max-width: 655px;
        min-width: 655px;
    }

    .postImageContainer__image{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .postInformationContainer{
        max-width: 500px;
        min-width: 500px;
        max-height: 751px;
        display: flex;
        padding: 12px;
        flex-direction: row;
    }

    .postinformationContainer__interactionsContainer{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .interactionsContainer__image{
        height: 80px;
        width: 80px;
        cursor: pointer;
        border-radius: 50%;
        object-fit: cover;
        margin-top: 5px;
    }

    .interactionContainer__container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 90px;
    }

    .container__iconCopy{
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .container__iconCopy:active{
        transform: scale(.9);
    }

    .container__iconLike{
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .container__iconLike:active{
        transform: scale(.9);
    }

    .postInformationContainer__userData{
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .userData__userName{
        font-size: 25px;
        cursor: pointer;
    }

    .userData__description{
        font-size: 20px;
    }

    .textShareContainer__textShare{
        margin-bottom: 5px;
        width: 130px;
        height: 27px;
        text-align: center;
        border-radius: 2px;
        background: var(--bg-text-share);
    }

    .divDeletePost{
        max-height: 751px;
        max-width: 655px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 0 4px 4px 0;
    }

    .divDeletePost__icon{
        margin-top: 21px;
        margin-right: 20px;
        cursor: pointer;
    }

    .divDeletePost__hidenModal{
        margin-top: 21px;
        margin-right: 20px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .divDeletePost__amountLikes{
        margin-bottom: 14px;
        font-size: 20px;
    }
</style>