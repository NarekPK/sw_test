<template>
  <div id="app">
    <header class="main-header">
      <a href="/">
        <img class="main-header__image" src="./assets/sw-logo.png" alt="STAR WARS">
      </a>
    </header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '@/styles/normalize.scss'

@Component
export default class App extends Vue {

}
</script>


<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0c5460;
  padding: 85px 10px 10px;
}

.main-header {
  position: fixed;
  top: 0;
  left: 0;
  background: url("./assets/milkyway.jpg") no-repeat center;
  background-size: cover;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  z-index: 10;
}

.main-header__image {
  width: 95px;
}

</style>
