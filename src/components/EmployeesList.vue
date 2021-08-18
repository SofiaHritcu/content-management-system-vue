<template>
<v-card>
    <v-card-title>
      Employees
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          filled
          label="Search"
          color="blue-grey lighten-2"
          hide-details="true"
          prepend-inner-icon="mdi-account-search"
        ></v-text-field>
    </v-card-title>
        <v-data-table
            :headers="headers"
            :items-per-page="3"
            :items="employees.value"
            color="teal"
            class="elevation-1"
            :search="search"
        >
            <template v-slot:item.id="{ item }">
                <v-avatar class="avatar my-2"
                        size="65"
                        >
                        <img v-if="item.image" alt="Image placeholder" :src="item.image"/>
                        <img v-else="item.image" alt="Image placeholder" src="../assets/noProfile.jpg"/>
                </v-avatar>
                <p class="font-weight-bold text-center">{{  item.id }}</p>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-divider
                    vertical
                ></v-divider>
                <router-link :to="`/edit/`">
                    <v-btn
                        class="actions edit-action"
                        outlined
                        fab
                        color="teal darken-3"
                    >
                        <v-icon>mdi-account-edit</v-icon>
                    </v-btn>
                </router-link>
                <v-btn
                    class="actions"
                    outlined
                    fab
                    color="teal darken-3"
                >
                    <v-icon>mdi-trash-can</v-icon>
                </v-btn>
            </template>
        </v-data-table>
  </v-card>
</template>


<script>
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
                { 
                    text: 'Actions', 
                    value: 'actions',
                    sortable: false,
                    class: "brown lighten-3 brown--text text--darken-2 actions-header"
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
    .v-application a {
        color: white !important;
    }
    .actions{
        margin-bottom: 20%;
    }
    .edit-action {
        margin-left: 28%;
        margin-right: auto;
    }
    .actions-header {
        padding-left: 8% !important;
    }
</style>