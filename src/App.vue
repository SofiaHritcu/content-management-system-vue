<template>
  <v-app class="app">
      <Navbar></Navbar>
      <v-main class="main">
        <employees-list class="tableEmployees"></employees-list>
        <router-view/>
      </v-main>    
  </v-app>
</template>

<script>
import EmployeesList from './components/EmployeesList.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    EmployeesList,
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
    display: flex;
    justify-content: center;
  }
  .tableEmployees {
    margin-top: 2%;
    width: 90%;
    margin-left: 5%;
    color: teal;
    background: #F7DFCF;
  }
</style>
