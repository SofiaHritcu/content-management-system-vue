<template>
  <v-app class="app">
      <Navbar></Navbar>
      <v-main class="main">
        <router-view/>
      </v-main>    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
}
</script>

<style scoped>
  #app {
    background: url('./assets/background.png')  no-repeat ;
    background-attachment: fixed;
    background-size: cover;
    overflow-y: hidden;
  }
</style>
