<template>
  <v-data-table
    :headers="headers"
    :items-per-page="4"
    :items="employees.value"
    color="teal"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
        <v-text-field
          v-model="search"
          filled
          label="Search"
          color="blue-grey lighten-2"
        ></v-text-field>
      </template>
    <template v-slot:item.id="{ item }">
        <v-avatar class="avatar my-2"
                  size="65"
                >
                  <img v-if="item.image" alt="Image placeholder" :src="item.image"/>
                  <img v-else="item.image" alt="Image placeholder" src="../assets/noProfile.jpg"/>
        </v-avatar>
        <p class="font-weight-bold text-center">{{  item.id }}</p>
    </template>
  </v-data-table>
</template>


<script>
    // :items="employees"

import { useLoadEmployees } from '../firebase/employee-firebase'
export default {
    data (){
        return {
            search: '',
            headers: [
                {
                    text: 'Id',
                    align: 'center',
                    sortable: false,
                    value: 'id',
                    class: "brown lighten-3 brown--text text--darken-2"
                },
                {   
                    text: 'First Name',
                    value: 'firstName',
                    class: "brown lighten-3 brown--text text--darken-2"

                },
                {   
                    text: 'Last Name',
                    value: 'lastName',
                    class: "brown lighten-3 brown--text text--darken-2"
                },
                {   
                    text: 'Email',
                    value: 'email',
                    class: "brown lighten-3 brown--text text--darken-2"
                },
                {   
                    text: 'Birthdate', 
                    value: 'birthDate',
                    class: "brown lighten-3 brown--text text--darken-2"
                },
                { 
                    text: 'Gender', 
                    value: 'gender',
                    sortable: false,
                    class: "brown lighten-3 brown--text text--darken-2"
                },
            ],
            employees: useLoadEmployees()
        }
    }, 
}
</script>

<style>
    .avatar {
        border-radius: 50%;
        border-color: #BCAAA4;
        box-shadow: 0px 0px 0px 4px rgba(224, 242, 241, 1); 
    }
</style>