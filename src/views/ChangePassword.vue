<template>
    <div class="body">
        <section class="section">
            <p class="section__text">Nueva contraseña</p>
        </section>
        <form class="form"
            @submit.prevent="changePass()"
        >
            <label class="form__label" for="password">Contraseña</label>
            <div class="form__containerPassword">
                <input v-model="dataForm.password" class="form__input inputPassword" :type="changeTypePass">
                <img v-if="hasShowEye" @click="showPassword()" class="form__showPass" :src="showPasswordImage" alt="show password">
            </div>
            <p v-if="errorPassword.state" class="form__errorMessage" >{{errorPassword.message}}</p>
            <div class="form__container">
                <button class="container__button" type="submit">Actualizar</button>
            </div>
        </form>
    </div>
</template>

<script>

import { getCookie, } from '@/utils/cookies.helper'
import { userServices } from '../services/user/user.services.js'
import showPasswordImg from '../assets/show-pass.png';
import hidenPasswordImg from '../assets/hiden-pass.png';


export default {
    name: 'change-password-view',
    data(){
        return{
            errorPassword: {
                state: false,
                message: ''
            },
            dataForm: {
                password: ''
            },
            amountError: 0,
            token: '',
            hasShowEye: false,
            showPasswordImage: hidenPasswordImg,
            changeTypePass: 'password',
        }
    },
    methods: {
        async changePass(){
            try{
                if(this.dataForm.password.length === 0){
                    this.errorPassword.state = true;
                    this.errorPassword.message = 'Debe ingresar su nueva contraseña.';
                    this.amountError++;
                }else{
                    this.errorPassword.state = false;
                }

                if(this.amountError === 0){
                    await userServices.changePassword({
                            token: this.token,
                            password: this.dataForm.password
                        })
                    this.dataForm.password = '';
                }
            }catch(error){
                console.error(error);
            }
        },
        showPassword(){
            if(this.changeTypePass === 'password'){
                this.changeTypePass = 'text';
                this.showPasswordImage = showPasswordImg;
            }else if(this.changeTypePass === 'text'){
                this.changeTypePass = 'password';
                this.showPasswordImage = hidenPasswordImg;
            }
        },
    },
    watch: {
        'dataForm.password': function (){
            if(this.dataForm.password.length > 0){
                this.hasShowEye = true;
                this.errorPassword.state = false
            }else{
                this.hasShowEye = false;
            }
        }
    },
    mounted(){
        if(getCookie('token')){
            this.$router.push({name: 'landing'});
        }
        this.token = this.$route.query.token;
    },
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
        margin-top: 212px;
    }
    .section__text{
        text-align: center;
        font-size: 30px;
        font-weight: 300;
    }
    .form{
        margin: 0 auto;
        margin-top: 90px;
        width: 300px;
        display: flex;
        flex-direction: column;
    }

    .form__errorMessage{
        font-size: 14px;
        margin-top: 4px;
        color: var(--color-text);
    
    }

    .form__label{
        font-size: 14px;
        color: var(--color-text);
        margin-bottom: 8px;
    }

    .form__containerPassword{
        display: flex;
        flex-direction: row;
        align-items: center;
        border: var(--border-inputs);
        border-radius: 8px;
        padding: 0px 10px 0 0px;
        height: 50px;
    }

    .form__input{
        border-radius: 8px;
        height: 50px;
        border: var(--border-inputs);
    }

    .form__input:focus{
        outline: none;
        padding: 0px 8px;
    }

    .inputPassword{
        border: none;
        height: 25px;
        width: 300px;
    }

    .form__showPass{
        height: 24px;
        width: 24px;
        cursor: pointer;
    }

    .form__container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .container__button{
        width: 200px;
        height: 40px;
        border: none;
        background: var(--bg-buttons-submit);
        border-radius: 8px;
        color: var(--color-buttons);
        font-size: 16px;  
        margin-top: 90px;
    }

    .container__button:active{
        transform: scale(.9);
    }

    @media(min-width: 744px){
        .section{
            margin-top: 0;
        }

        .section__text{
            font-size: 52px;
            margin-bottom: 160px;
        }

        .form{
            margin-top: 0;
            width: 100%;
        }

        .form__label{
            font-size: 40px;
        }

        .form__input{
            width: 550px;
            height: 80px;
            font-size: 30px;
        }

        .form__containerPassword{
            height: 80px;
            max-width: 550px;
        }

        .inputPassword{
            height: 40px;
        }

        .form__showPass{
            height: 40px;
            width: 40px;
        }
        
        .form__errorMessage{
            font-size: 20px;
        }

        .form__container{
            margin-top: 0;
            margin-top: 160px;
        }

        .container__button{
            margin-top: 0;
            width: 450px;
            height: 80px;
            font-size: 40px;
        }
    }

    @media(min-width: 1280px){
        .section__text{
            margin-bottom: 30px;
        }

        .form__container{
            margin-top: 30px;
        }

        .container__button{
            cursor: pointer;
        }
    }
</style>