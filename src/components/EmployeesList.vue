<template>
<v-card>
    <v-card-title>
        Employees
        <v-spacer></v-spacer>
        <v-snackbar v-model="snackbarEmployeeUpdated" :timeout="4000" top color="teal lighten-4 teal--text text--darken-1">
            <span>Awesome! You updated the employee!</span>
            <v-btn color="white" text @click="snackbarEmployeeUpdated = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbarDeleted" :timeout="-1" top color="deep-orange lighten-3 red--text text--darken-1">
            <span align="center" class="py-4"><h3>Are you sure ?!</h3></span>
            <v-divider></v-divider>
            <v-btn color="white" text @click="deleteConfirmation" class="mx-10">Confirm</v-btn>
            <v-btn color="white" text @click="closeConfirmation" class="mx-10">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbarDeletedSuccess" :timeout="4000" top color="teal lighten-4 teal--text text--darken-1">
            <span>Successfully deleted the employee !!</span>
            <v-btn color="white" text @click="snackbarDeletedSuccess = false">Close</v-btn>
        </v-snackbar>
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
                    <EditAddPopup @employeeUpdated="snackbarEmployeeUpdated = true" :edit="true" :id="item.id"></EditAddPopup>
                </router-link>
            </template>
            <template v-slot:item.deleteAction="{ item }">
                <v-btn
                    class="actions delete-action"
                    outlined
                    fab
                    color="teal darken-3"
                    @click="deleteCliked(item.id)"
                >
                    <v-icon>mdi-trash-can</v-icon>
                </v-btn>
            </template>
            
        </v-data-table>
  </v-card>
</template>


<script>
import { useLoadEmployees } from '../firebase/employee-firebase'
import EditAddPopup from './EditAddPopup'
import Store from '../store/employee-store'


export default {
    components: {
        EditAddPopup
    },
    data (){
        return {
            search: '',
            snackbarEmployeeUpdated: false,
            snackbarDeleted: false,
            snackbarDeletedSuccess: false,
            deleteId: 0,
            // store
            employeesStore: new Store(),
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
                    text: '', 
                    value: 'actions',
                    sortable: false,
                    class: "brown lighten-3 brown--text text--darken-2 actions-header"
                },
                { 
                    text: '', 
                    value: 'deleteAction',
                    sortable: false,
                    class: "brown lighten-3 brown--text text--darken-2 actions-header"
                },
            ],
            employees: useLoadEmployees()
        }
    }, 
    methods: {
        deleteCliked(id){
            console.log('deleting ' + id);
            this.snackbarDeleted = true;
            this.deleteId = id;
        },
        async deleteConfirmation() {
            this.snackbarDeleted = false;   
            console.log("confirm delete " + this.deleteId);
            await this.employeesStore.deleteEmployee(this.deleteId);
            this.snackbarDeletedSuccess = true;
        },
        closeConfirmation () {
            this.snackbarDeleted = false;   
        }
    }
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
    /* .actions{
        margin-bottom: 50%;
    } */
    .delete-action {
        margin-top: 92% !important;
    }
    
    .actions-header {
        padding-left: 4.5% !important;
    }

    .v-card__title{
        padding-bottom: 0;
        padding-top: 0;
        padding-right: 0;
    }
</style>