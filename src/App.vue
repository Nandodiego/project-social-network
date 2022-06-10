<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script> 

<style>

:root{
  --color-text: #2D0B0B;
  --color-buttons:#E7F4F4;
  --border-inputs: 1px solid #2D0B0B;
  --border-black: 1px solid black;
  --border-sections: 0.5px solid #5B4DB5;
  --bg-text-share: lightgray;
  --bg-buttons-submit: #5B4DB5;
  --color-text-error: #65676B;
  --bg-button-follow:#2D0B0B;
  --bg-button-followed:#5C449F;
  --bg-button-createPosts: #5C449F;
  --bg-button-not-follow:#BB4848;
  --color-follow: #E7F4F4;
  --bg-modal: rgba(0,0,0,0.7);
  --white: white;
  --bg-modal-create-posts: #FDFDFD;
}

#app{
  display: flex;
  justify-content: center;
  align-items: center;
}

*{
  background: #E7F4F4;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
</style>
