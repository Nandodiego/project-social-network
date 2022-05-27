<template>
    <div class="body"
        @click="closeModal($event)"
    >
        <form class="form"
            @submit.prevent="createPost()"
        >    
            <div class="form__container">
                <label class="form__label" for="description">¿Qué estás pensando, {{userName}}?</label>
                <input v-model="postData.description" class="form__input" type="text">
            </div>
            <div v-if="isPreview" class="div-file">
                <input @change="uploadFile()" ref="file" class="input-file" type="file" name="fileToUpload" id="inputFile" accept="image/png">
                <img class="image-create-post" src="../assets/addImage.svg" alt="add image">
            </div>
            <div v-if="hasPreviewImg" id="preview">
                <img class="preview__image" :src="avatar" alt="">
            </div>
            <p class="form__textError" v-if="hasError">La imagen es obligatoria</p>
            <p class="form__textError" v-if="hasErrorDocument">Solo se permiten imagenes</p>
            <div class="form__div-submit">
                <label class="div-submit__label" for="addImage">Agregar imagen</label>
                <input class="div-submit__input" type="submit" value="publicar">
            </div>
        </form>
    </div>
</template>

<script>

import { userServices } from '../services/user/user.services.js'
import { getCookie, } from '@/utils/cookies.helper'

const typeImage = "image/png";

export default {
    name: 'modal-component-create-post',
    data(){
        return {
            postData: {
                image: '',
                description: ''
            },
            isPreview: true,
            hasPreviewImg: false,
            avatar: typeImage,
            hasError: false,
            hasErrorDocument: false,
            userName: ''
        }
    },
    methods: {
        uploadFile(){
            this.postData.image = this.$refs.file.files[0];
            this.isPreview =  false;
            this.hasPreviewImg = true;
            this.hasError = false;
            this.hasErrorDocument = false;

            let file = this.postData.image;
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                this.avatar = reader.result;
                
                if(this.postData.image.name.split('.').pop() !== 'png'){
                    this.hasErrorDocument = true;
                    this.isPreview = true;
                    this.hasPreviewImg = false;
                }
            };

        },
        async getName(){
            const response = await userServices.userData(getCookie('userId'), getCookie('token'));
            this.userName = response.data.data.user.nick;
        },
        createPost(){
                const formData = new FormData();
                formData.append('file', this.postData.image);
                formData.append('description', this.postData.description);
                formData.append('userId', getCookie('userId'));

                if(this.postData.image.length === 0){
                    this.hasError = true;
                }else{
                    this.$emit('createPost', formData);
                }
        },
        closeModal(e){
            if(e.target._prevClass === "body"){
                this.$emit('closeModal');
            }
        }
    },
    mounted(){
        this.getName();
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

    .form{
        width: 342px;
        display: flex;
        flex-direction: column;
        background:#FDFDFD;
    }

    .form__container{
        background:#FDFDFD;
        padding-left: 32px;
        padding-top: 30px;
    }

    .form__icon-x{
        width: 12px;
        position: absolute;
        height: 12px;
        top: 20%;
        left: 88%;
        cursor: pointer;
        background: #FDFDFD;
    }

    .form__icon-x:active{
        transform: scale(.9);
    }

    .form__label{
        background: #FDFDFD;
        font-size: 16px;
        color: var(--color-text);
        margin-bottom: 8px;
    }

    .form__input{
        background: #FDFDFD;
        width: 280px;
        height: 75px;
        border-radius: 8px;
        padding: 10px;
    }

    .form__input:focus{
        outline: none;
    }

    .div-file{
        margin-top: 45px;
        margin-bottom: 18px;
        background: #FDFDFD;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .input-file{
        position: absolute;
        width: 120px;
        height: 120px;
        opacity: 0;
    }

    .image-create-post{
        width: 120px;
        height: 120px;
        background: #FDFDFD;
    }

    #preview{
        height: 292px;
        margin-top: 30px;
        margin-bottom: 26px;
    }

    .preview__image{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .form__textError{
        color: var(--color-text);
        text-align: center;
        background: #FDFDFD;
    }

    .form__div-submit{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #FDFDFD;
    }

    .div-submit__label{
        background: #FDFDFD;
        font-size: 16px;
        color: var(--color-text);
        margin-bottom: 30px;
    }

    .div-submit__input{
        width: 120px;
        height: 30px;
        background: #5C449F;
        border: none;
        color: #E7F4F4;
        font-size: 16px;
        border-radius: 8px;
        margin-bottom: 30px;
    }

    .div-submit__input:active{
        transform: scale(.9);
    }

    @media(min-width: 744px){      
        .form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0 auto;
            width: 650px;
        }

        .form__container{
            padding-left: 83px;
            padding-top: 44px;
        }

        #preview{
            min-height: 550px;
            max-height: 550px;
        }

        .input-file{
            width: 260px;
            height: 260px;
        }

        .image-create-post{
            width: 260px;
            height: 260px;
        }

        .form__label{
            font-size: 26px;
        }

        .form__input{
            width: 490px;
            height: 150px;
            font-size: 26px;
        }

        .form__textError{
            font-size: 26px;
        }

        .div-file{
            margin-top: 70px;
            margin-bottom: 68px;
        }

        .div-submit__label{
            font-size: 26px;
        }

        .div-submit__input{
            width: 235px;
            height: 60px;
            font-size: 26px;
            margin-bottom: 44px;
        }
    }
</style>