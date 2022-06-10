<template>
    <div class="body">
        <section class="section">
            <h1 class="section__title">View</h1>
        </section>
        <main class="main">
            <p class="main__textOne">Comparte</p>
            <p class="main__textTwo">y</p>
            <p class="main__textThree">Vibra</p>
        </main>
        <section class="footer">
            <router-link :to="{name:'sign-in'}" class="footer__button">Registrarse</router-link>
        </section>
    </div>    
</template>

<script>
import { getCookie, } from '@/utils/cookies.helper'

export default {
    name: 'home-view',
    mounted(){
        if(getCookie('token')){
            this.$router.push({name: 'landing'});
        }
    }
}
</script>

<style scoped>
    .body{
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section{
        margin-bottom: 135px;
    }

    .section__title{
        font-size: 38px;
        text-align: center;
        color: var(--color-text);
    }
    .main__textOne{
        font-size: 35px;
        color: var(--color-text);
        text-align: center;
        font-weight: 600;
    }

    .main__textTwo{
        margin-top: 0;
        font-size: 35px;
        color: var(--color-text);
        text-align: center;
        font-weight: 600;
    }

    .main__textThree{
        margin-top: 0;
        font-size: 35px;
        color: var(--color-text);
        text-align: center;
        font-weight: 600;
    }
    .footer{
        margin-top: 135px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .footer__button{
        width: 200px;
        height: 40px;
        border: none;
        background: var(--bg-buttons-submit);
        border-radius: 8px;
        font-size: 16px;
        color: var(--color-buttons);
        font-weight: 600;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }
    .footer__button:active{
        transform: scale(.9);
    }

    @media(min-width: 744px){
        .main{
            display: flex;
            flex-direction: row;
            width: 540px;
            justify-content: space-around;
            margin-bottom: 342px;
        }

        .section{
            margin-bottom: 300px;
        }

        .section__title{
            font-size: 80px;
            font-weight: 400;
        }

        .main__textOne{
            font-size: 60px;
            font-weight: 400;
        }

        .main__textTwo{
            font-size: 60px;
            font-weight: 400;
        }

        .main__textThree{
            font-size: 60px;
            font-weight: 400;
        }

        .footer{
            margin-top: 0;
        }

        .footer__button{
            width: 450px;
            height: 80px;
            font-size: 40px;
        }
    }
</style>