<template>
    <div class="body">
        <ul class="body__ul">
            <img v-if="showImage" @click="getUserLanding()" class="ul__image" :src="profileImage" alt="">
            <li @click="getUserLanding()" class="ul__li">{{nick}}</li>
            <img @click="closeList()" class="ul__icon" src="../assets/angulo-pequeno-hacia-arriba.png" alt="">
        </ul>
    </div>
</template>

<script>

export default {
    data(){
        return{
            showImage: true
        }
    },
    props: {
        nick: {
            type: String
        },
        profileImage: {
            type: String
        },
    },
    methods: {
        getUserLanding(){
            this.$emit('getUserLanding');
        },
        closeList(){
            this.$emit('closeList');
        }
    },
    mounted(){
        if(this.nick.length === 0){
            this.showImage = false;
            this.hasTextErrorSearch
        }
    }
}
</script>

<style scoped>
    .body__ul{
        background: var(--white);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .ul__image{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 6px;
        cursor: pointer;
    }

    .ul__li{
        list-style: none;
        color: black;
        background: var(--white);
        width: 100%;
    }

    .ul__li:hover{
        cursor: pointer;
        border-bottom: var(--border-black);
    }

    .ul__icon{
        width: 24px;
        height: 24px;
        background: var(--white);
        position: relative;
        transform: translate(5px, 16px);
        cursor: pointer;
    }

    @media(min-width: 744px){
        .body__ul{
            font-size: 24px;
        }

        .ul__icon{
            transform: translate(0px, 17px);
            width: 30px;
            height: 30px;
        }
    }
</style>