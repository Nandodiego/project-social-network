<template>
    <div>
        <section class="section">
            <div class="section__container-name">
                <img @click="getUserLanding()" class="container-name__image" :src="userImage" alt="image">
                <h2 @click="getUserLanding()" class="container-name__nick">{{nick}}</h2>
            </div>
            <div class="section__container-information">
                <img class="container-information__image" :src="image" alt="publication image">
                <p class="container-information__text">
                    {{description}}
                </p>
                <div v-if="amountLikes > zeroLikes" class="container-information__div">
                    <img class="div__iconHeart" src="../assets/heart-icon.svg" alt="">
                    <p class="div__textLikes">
                        {{amountLikes}}
                    </p>
                </div>
                
            </div>
            <div class="section__container-logos">
                <div class="container-logos__div">
                    <img
                        @click="sharePost()"
                        v-clipboard:copy="`${postUrl}${postId}`"                     
                        v-clipboard:error="onError"
                        class="div__logo"
                        src="../assets/share.svg"
                        alt=""
                    >
                    <img @click="likePost()" class="div__logo" :src="likeLogo" alt="">
                    <p class="div__textShare" v-if="textShare">Post copiado</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import heartIcon from '../assets/heart-icon.svg'
import like from '../assets/like.svg'

export default {
    name: 'landing-component',
    data(){
        return {
            likeLogo: like,
            zeroLikes: 0,
            textShare: false,
            icon: false,
            postUrl: 'http://localhost:8080/posts-view?urlPost='
        }
    },
    props: {
        userImage: {
            type: String
        },
        image: {
            type: String
        },
        nick: {
            type: String
        },
        description: {
            type: String
        },
        postId: {
            type: String
        },
        amountLikes: {
            type: Number
        }
    },
    methods: {
        getUserLanding(){
            this.$emit('getUserLanding');
        },
        likePost(){
            this.icon = !this.icon;
                  
            if(this.icon === true){
                this.$emit('likePost', this.postId);
                this.likeLogo = heartIcon;
            }
            else{
                this.likeLogo = like;
            }
        },
        onError(e){
            alert('Failed to copy the text to the clipboard');
            console.log(e);
        },
        sharePost(){
            setTimeout( () => {
                this.textShare = false;
            }, 2000, this.textShare = true);
        }
    },
    mounted(){
    }
}
</script>

<style scoped>
     .section{
        border-bottom: var(--border-sections);
        margin-bottom: 22px;
        width: 100vw;
    }
    .section__container-name{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 180px;
        padding: 8px;
    }

    .container-name__nick{
        font-size: 16px;
        cursor: pointer;
    }

    .container-name__nick:active{
        transform: scale(.9);
    }

    .container-name__image{
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
        margin-right: 8px;
    }

    .container-name__image:active{
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
        margin-left: 16px;
    }

    .container-information__div{
        margin-left: 16px;
        display: flex;
        align-items: center;
    }

    .div__iconHeart{
        width: 18px;
        height: 18px;
        margin-right: 4px;
        cursor: pointer;
    }

    .div__iconHeart:active{
        transform: scale(.9);
    }

    .div__textLikes{
        font-size: 14px;
        line-height: 2;
        color: var(--color-text);
    }

    .section__container-logos{
        display: flex;
        justify-content: end;
    }

    .container-logos__div{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding-right: 10px;
        width: 90px;
        margin-bottom: 25px;
    }

    .div__logo{
        cursor: pointer;
    }

    .div__logo:active{
        transform: scale(.9);
    }

    .div__textShare{
        position: absolute;
        width: 130px;
        height: 27px;
        text-align: center;
        border-radius: 2px;
        right: 33%;
        background: var(--bg-text-share);
    }

    @media(min-width: 744px){
        .container-name__image{
            width: 80px;
            height: 80px;
        }

        .container-name__nick{
            font-size: 24px;
        }

        .container-information__image{
            max-height: 650px;
            min-height: 650px;
        }

        .container-information__text{
            font-size: 24px;
        }

        .div__iconHeart{
            width: 28px;
            height: 28px;
        }

        .div__textLikes{
            font-size: 24px;
        }

        .container-logos__div{
            width: 166px;
        }

        .div__logo{
            width: 60px;
            height: 60px;
        }

        .div__textShare{
            font-size: 24px;
            width: 200px;
            height: 50px;
            right: 38%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
    }
</style>