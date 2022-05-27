<template>
  <div class="body">
        <section class="section">
            <img class="section__icon" :src="urlIcon" alt="">
            <h1 class="section__text">Esta página no está disponible</h1>
            <p class="section__textInformation">
                Es posible que el enlace esté roto o que se haya eliminado la página. Verifica que el enlace que quieres abrir es correcto.
            </p>
            <router-link
              class="section__router"
              to="/">
              Volver a la página de Inicio
            </router-link>
        </section>
  </div>
</template>

<script>
export default {
    data(){
        return{
            urlIcon: 'https://static.xx.fbcdn.net/rsrc.php/yN/r/MnQWcWb6SrY.svg'
        }
    }
}
</script>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
    }

    .section{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .section__icon{
        width: 112px;
        height: 112px;
        margin-bottom: 14px;
        cursor: pointer;
    }

    .section__text{
        color: var(--color-text-error);
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }

    .section__textInformation{
        font-size: 14px;
        text-align: center;
        color: var(--color-text-error);
        margin-bottom: 20px;
    }

    .section__router{
        cursor: pointer;
        width: 210px;
        height: 40px;
        border: none;
        background: var(--bg-buttons-submit);
        border-radius: 8px;
        font-size: 14px;
        color: var(--color-buttons);
        font-weight: 600;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }

    .section__router:active{
        transform: scale(.9);
    }

    @media(min-width: 744px){
        .section__icon{
            width: 200px;
            height: 200px;
        }

        .section__text{
            font-size: 33px;
        }

        .section__textInformation{
            margin-bottom: 35px;
            font-size: 24px;
        }

        .section__router{
            width: 450px;
            height: 80px;
            font-size: 24px;
        }
    }
</style>