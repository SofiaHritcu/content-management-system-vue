<template>
  <nav>
    <v-snackbar v-model="snackbarEmployeeAdded" :timeout="4000" top color="teal lighten-4 teal--text text--darken-1">
      <span>Awesome! You added a new employee!</span>
      <v-btn color="white" text @click="snackbarEmployeeAdded = false">Close</v-btn>
    </v-snackbar>

    <v-app-bar app color="teal lighten-5" >
        <v-app-bar-nav-icon  @click="drawer = !drawer" class="teal lighten-4 teal--text text--darken-1"></v-app-bar-nav-icon>
        <v-toolbar-title color="teal lighten-4">
            <v-icon
                large
                color="teal darken-2"
            >
                mdi-account-cog-outline
            </v-icon>
            <span class="teal--text text--lighten-3 font-weight-light">CMS</span>
            <span class="teal--text text--darken-4 mx-1">Employees</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>

   

    <v-navigation-drawer app v-model="drawer">
        <EditAddPopup @employeeAdded="snackbarEmployeeAdded = true" :edit="false" :dialog="false"></EditAddPopup>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import EditAddPopup from './EditAddPopup'

export default {
    components: {EditAddPopup, },
    data() {
    return {
      drawer: false,
      snackbarEmployeeAdded: false,
    }
  }
}
</script>

<style>
    
</style>