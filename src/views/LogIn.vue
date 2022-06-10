<template>
    <div class="body">
        <section class="header">
            <h1 class="header__title">View</h1>
        </section>
        <form class="form"
            @submit.prevent="logInUser()"
        >
            <label class="form__label" for="email">Correo</label>
            <input v-model="dataForm.email" class="form__input" id="email" type="email">
            <p class="form__errorMessage" v-if="emailError.state">{{emailError.message}}</p>
            <p class="form__errorMessage" v-if="errorExist.state">{{errorExist.message}}</p>
            <label class="form__label" for="password">Contraseña</label>
            <input v-model="dataForm.password" class="form__input"  id="password" :type="changeTypePass">
            <img v-if="hasShowEye" @click="showPassword()" class="form__showPass" :src="showPasswordImage" alt="show password">
            <p class="form__errorMessage" v-if="passwordError.state">{{passwordError.message}}</p>
            <router-link :to="{name: 'recovery-password'}" class="form__forgotMyPassword">Olvidé mi contraseña.</router-link>
            <section class="form__footer">
                <p class="footer__errorData" v-if="errorData.state">{{errorData.message}}</p>
                <button type="submit" class="footer__button">Iniciar sesión</button>
            </section>
        </form>
    </div>
</template>

<script type="module" src="/path/to/js.cookie.mjs"></script>
<script>

import { setCookie, getCookie } from '@/utils/cookies.helper';
import { userServices } from '../services/user/user.services.js';
import showPasswordImg from '../assets/show-pass.png';
import hidenPasswordImg from '../assets/hiden-pass.png';
 
export default {
    name: 'log-in-view',
    data(){
        return {
            dataForm: {
                email: '',
                password: ''
            },
            emailError: {
                state: false,
                message: ''
            },
            passwordError: {
                state: false,
                message: ''
            },
            errorExist: {
                state: false,
                message: ''
            },
            errorData: {
                state: false,
                message: ''
            },
            amountError: 0,
            token: '',
            changeTypePass: 'password',
            showPasswordImage: hidenPasswordImg,
            hasShowEye: false
        }
    },
    methods: {
        async logInUser(){
            if(this.dataForm.email.length === 0){
                this.emailError.state = true;
                this.emailError.message = 'El correo es obligatorio.';
                this.amountError++;
            }else{
                this.emailError.state = false;
            }

            if(this.dataForm.password.length === 0){
                this.passwordError.state = true;
                this.passwordError.message = 'La contraseña es obligatoria.';
                this.amountError++;
            }else{
                this.passwordError.state = false;
            }

            if(this.amountError === 0){
                try{
        
                    const response = await userServices.logIn({
                        email: this.dataForm.email,
                        password: this.dataForm.password
                    });

                    setCookie('userId', response.data.data.user.id);
                    setCookie('token', response.data.data.token);

                    this.resetForm();
                    this.changeView();
                }catch(error){
                    if(error){
                        this.errorData.state = true;
                        this.errorData.message = 'Los datos son incorrectos.';
                    }else{
                        this.errorData.state = false;
                    }
                }
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
        resetForm(){
            this.dataForm.email = "";
            this.dataForm.password = "";
        },
        changeView(){
            this.$router.push({
                name: "landing"
            });
        }
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

    .form__showPass{
        position: absolute;
        height: 24px;
        width: 24px;
        transform: translate(265px, 202px);
        cursor: pointer;
    }

    .form__errorMessage{
        font-size: 14px;
        color: var(--color-text);
    }
    
    .form__forgotMyPassword{
        font-size: 14px;
        text-align: right;
        color: var(--color-text);
        margin-top: 4px;
        text-decoration: none;
    }

    .form__footer{
        margin-top: 70px;
    }

    .footer__errorData{
        font-size: 14px;
        color: var(--color-text);
        text-align: center;
        margin-bottom: 8px;
    }

    .footer__button{
        cursor: pointer;
        margin: 0 auto;
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

        .form__showPass{
            height: 40px;
            width: 40px;
            transform: translate(492px, 318px);
        }

        .form__errorMessage{
            font-size: 20px;
        }

        .form__forgotMyPassword{
            font-size: 20px;
        }

        .footer__button{
            width: 450px;
            height: 80px;
            font-size: 40px;
        }
    }
</style>