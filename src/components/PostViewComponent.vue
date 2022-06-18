<template>
    <div>
        <div class="main">
            <div class="postImageContainer">
                <img class="postImageContainer__image" :src="userPostImage" alt="">
            </div>
            <div class="postInformationContainer">
                <div class="postinformationContainer__interactionsContainer">
                    <img @click="getUserProfile($event)" class="interactionsContainer__image" :src="userImage" alt="">
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
                        <h2 @click="getUserProfile($event)" class="userData__userName">{{userName}}</h2>
                        <p class="userData__description">{{userPostDescription}}</p>
                    </div>
                    <div class="userData__textShareContainer" v-if="textShare">
                        <p class="textShareContainer__textShare">Post Copiado</p>
                    </div>
                </div>
                <div class="divDeletePost">
                    <img @click="returnToLanding()" class="divDeletePost__hidenModal"  src="../assets/x.png" alt="icon exit">
                    <p class="divDeletePost__amountLikes">{{amountLikes}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import heartIcon from '../assets/heart-icon.svg'
import like from '../assets/like.svg'
import { getCookie } from '@/utils/cookies.helper'

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
        changeIcon: {
            type: Boolean
        },
        userId: {
            type: String
        }
    },
    methods: {
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
        returnToLanding(){
            this.$router.push({name: 'landing'})
        },
        getUserProfile(id){
            id = this.userId
            if(getCookie('userId') === id){
                this.$router.push({name: 'my-profile', params: {id}});
            }else{
                this.$router.push({name: 'user-profile', params: {id}})
            }
        },
        sharePost(){
            setTimeout( () => {
                this.textShare = false;
            }, 2000, this.textShare = true);
        }
    }
}
</script>

<style scoped>
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
    }

    .interactionsContainer__image:active{
        transform: scale(.9);
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

    .userData__userName:active{
        transform: scale(.9);
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
        margin-left: 110px;
    }

    .divDeletePost__icon{
        margin-top: 21px;
        margin-right: 20px;
        cursor: pointer;
    }

    .divDeletePost__hidenModal{
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .divDeletePost__amountLikes{
        font-size: 20px;
    }
</style>