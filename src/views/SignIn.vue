<template>
    <div class="body">
        <section class="header">
            <h1 class="header__title">View</h1>
        </section>
        <form class="form"
            @submit.prevent="createUser()"
        >
            <label class="form__label" for="email">Correo</label>
            <input v-model="dataForm.email" class="form__input" id="email" type="email">
            <p class="form__errorMessage" v-if="emailError.state">{{emailError.message}}</p>
            <p class="form__errorMessage" v-if="errorMessage.state">{{errorMessage.messageEmail}}</p>
            <label class="form__label" for="nick">Nick name</label>
            <input v-model="dataForm.nickName" class="form__input"  id="nick" type="text">
            <p class="form__errorMessage" v-if="nickNameError.state">{{nickNameError.message}}</p>
            <p class="form__errorMessage" v-if="errorMessage.state">{{errorMessage.messageNick}}</p>
            <label class="form__label" for="password">Contraseña</label>
            <input v-model="dataForm.password" class="form__input"  id="password" type="password">
            <img v-if="hasShowEye" @click="showPassword()" class="form__showPassword" :src="showPasswordImage" alt="show password">
            <p class="form__errorMessage" v-if="passwordError.state">{{passwordError.message}}</p>
            <router-link :to="{name: 'log-in'}" class="form__router">Ya tengo cuenta.</router-link>
            <section class="form__footer">
                <button type="submit" class="footer__button">Registrarse</button>
            </section>
        </form>
    </div>
</template>

<script>

import { getCookie } from '@/utils/cookies.helper'
import { userServices } from '../services/user/user.services.js'
import showPasswordImg from '../assets/show-pass.png';
import hidenPasswordImg from '../assets/hiden-pass.png';

export default {
    name: 'sing-in-view',
    data(){
        return{
            dataForm: {
                email: '',
                nickName: '',
                password: ''
            },
            emailError: {
                state: false,
                message: ''
            },
            nickNameError: {
                state: false,
                message: ''
            },
            passwordError: {
                state: false,
                message: ''
            },
            errorMessage: {
                state: false,
                messageEmail: '',
                messageNick: ''
            },
            amountErrors: 0,
            hasShowEye: false,
            changeTypePass: 'password',
            showPasswordImage: hidenPasswordImg,

        }
    },
    methods: {
        async createUser(){
            if(this.dataForm.email.length === 0){
                this.emailError.state = true;
                this.emailError.message = 'El correo es obligatorio.';
                this.amountErrors++;
            }else{
                this.emailError.state = false;
            }


            if(this.dataForm.nickName.length === 0){
                this.nickNameError.state = true;
                this.nickNameError.message = 'El nick es obligatorio.';
                this.amountErrors++;
            }else{
                this.nickNameError.state = false;
            }


            if(this.dataForm.password.length === 0){
                this.passwordError.state = true;
                this.passwordError.message = 'La contraseña es obligatoria.';
                this.amountErrors++;
            }else{
                this.passwordError.state = false;
            }

            if(this.amountErrors === 0){
                try{
                    await userServices.create({
                        email: this.dataForm.email,
                        nick: this.dataForm.nickName,
                        password: this.dataForm.password 
                    });

                    this.resetForm();
                    this.changeView();

                }catch(error){
                    if(error){
                        this.errorMessage.state = true;
                        this.errorMessage.messageEmail = 'Este correo ya existe.';
                        this.errorMessage.messageNick = 'Este nick ya existe.';
                    }
                }
            }
        },
        resetForm(){
            this.dataForm.email = '';
            this.dataForm.nickName = '';
            this.dataForm.password = '';
        },
        changeView(){
            this.$router.push({name: 'landing'});
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
            }else{
                this.hasShowEye = false;
            }
        }
    },
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

    .header{
        margin-top: 40px;
    }

    .header__title{
        text-align: center;
        font-size: 38px;
        color: var(--color-text);
    }

    .form{
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .form__label{
        font-size: 14px;
        margin-top: 40px;
    }

    .form__input{
        margin-top: 8px;
        width: 300px;
        height: 50px;
        border: var(--border-inputs);
        border-radius: 8px;
        padding: 0px 8px;
    }

    .form__input:focus{
        outline: none;
    }

    .form__showPassword{
        position: absolute;
        height: 24px;
        width: 24px;
        transform: translate(265px, 321px);
        cursor: pointer;
    }

    .form__errorMessage{
        font-size: 14px;
        color: var(--color-text);
    }

    .form__router{
        font-size: 14px;
        color: var(--color-text);
        text-align: end;
        margin-top: 4px;
        cursor: pointer;
        text-decoration: none;
    }


    .form__footer{
        margin: 0 auto;
    }

    .footer__button{
        margin-top: 70px;
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
        .header__title{
            font-size: 80px;
            font-weight: 400;
        }

        .form__label{
            font-size: 40px;
            font-weight: 400;
        }

        .form__input{
            width: 550px;
            height: 80px;
            font-size: 30px;
        }

        .form__showPassword{
            height: 40px;
            width: 40px;
            transform: translate(492px, 505px);
        }

        .form__errorMessage{
            font-size: 20px;
        }

        .form__router{
            font-size: 20px;
        }

        .footer__button{
            width: 450px;
            height: 80px;
            font-size: 40px;
        }
    }
</style>