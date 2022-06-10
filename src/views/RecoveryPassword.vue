<template>
    <div class="body">
        <section class="section">
            <p class="section__recoveryPassword">Recuperar contaseña</p>
        </section>
        <form class="form"
            @submit.prevent="sendEmail()"
        >
            <label class="form__label" for="email">Email</label>
            <input v-model="dataForm.email" class="form__input" type="email">
            <p class="form__errorMessage" v-if="errorEmail.state">{{errorEmail.message}}</p>
            <div class="form__container">
                <button type="submit" class="container__button">Enviar correo</button>
            </div>
        </form>
    </div>
</template>

<script>
import { getCookie } from '@/utils/cookies.helper'
import { userServices } from '../services/user/user.services.js'

export default {
    name: 'recovery-password-view',
    data(){
        return{
            dataForm: {
                email: ''
            },
            errorEmail: {
                state: false,
                message: ''
            },
            amountError: 0
        }
    },
    methods: {
        async sendEmail(){
            try{
                if(this.dataForm.email.length === 0){
                    this.errorEmail.state = true;
                    this.errorEmail.message = 'El email es obligatorio';
                    this.amountError++;
                }else{
                    this.errorEmail.state = false;
                }

                if(this.amountError === 0){
                    await userServices.recoveryPassword({
                        email: this.dataForm.email
                    });
                    this.dataForm.email = '';
                }
            }catch(error){
                console.error(error);
            }
        },
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

    .section{
        margin-top: 212px;
    }
    .section__recoveryPassword{
        text-align: center;
        font-size: 30px;
        font-weight: 300;
    }
    .form{
        margin: 0 auto;
        margin-top: 40px;
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
    .form__input{
        border-radius: 8px;
        height: 50px;
        border: var(--border-inputs);
        padding: 0px 8px;
    }

    .form__input:focus{
        outline: none;
    }

    .form__container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
    }

    .container__button{
        width: 200px;
        height: 40px;
        border: none;
        background: var(--bg-buttons-submit);
        border-radius: 8px;
        cursor: pointer;
        color: var(--color-buttons);
        font-size: 16px;        
    }

    .container__button:active{
        transform: scale(.9);
    }

    @media(min-width: 744px){
        .section{
            margin-top: 0;
        }

        .section__recoveryPassword{
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
        
        .form__errorMessage{
            font-size: 20px;
        }

        .form__container{
            margin-top: 0;
            margin-top: 160px;
        }

        .container__button{
            width: 450px;
            height: 80px;
            font-size: 40px;
        }
    }
</style>