<template>
  <v-row :class="{addEmployee : !edit}" >
    <v-btn
      class="my-10 add-action"
      v-if="!edit"
      @click.stop="dialog = true"
      outlined
      fab
      x-large
      color="teal darken-3"
    >
        <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-btn
        class="actions update-action"
        v-if="edit"
        @click="editClicked"
        outlined
        fab
        color="teal darken-3"
    >
        <v-icon>mdi-account-edit</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="40%"
      height="95%"
    >
        <v-card class="teal lighten-5 teal--text text--darken-2">
          <v-img
            v-if="!edit"
            height="180"
            src="../assets/employees.jpg"
          />
          <v-img
            v-else
            height="180"
            src="../assets/leadership.jpg"
          />
          <v-card-title  v-if="!edit" class="text-h5">
            Add Employee
          </v-card-title>
          <v-card-title  v-else class="text-h5">
            Update Employee
          </v-card-title>
          <v-card-text width="50%" class="teal--text text--lighten-4">
            Introduce employee data 
            <v-form class="px-3 my-3" ref="employeeForm">
                <v-row>
                  <v-text-field 
                    v-model="firstName" 
                    label="First Name" 
                    :rules="nameRules"
                    filled 
                    placeholder="Jack"
                    color="blue-grey lighten-2"
                    class="mx-2">
                  </v-text-field>
                  <v-text-field 
                    v-model="lastName" 
                    label="Last Name"
                    :rules="nameRules" 
                    filled 
                    placeholder="Nicholson"
                    color="blue-grey lighten-2">
                  </v-text-field>
                </v-row>
                <v-text-field 
                  v-model="email" 
                  label="Email" 
                  :rules="emailRules"
                  filled 
                  placeholder="jake@gmail.com"
                  color="blue-grey lighten-2"
                  class="my-4">
                </v-text-field>
                <v-select
                  v-model="gender"
                  :items="genders"
                  :rules="genderRules"
                  filled
                  dense
                  color="teal lighten-2"
                  label="Gender"
                ></v-select>
                <v-menu
                  v-model="birthDateMenu"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDateFormattedDatefns"
                      clearable
                      label="Birthdate"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="birthDate = null"
                      color="teal lighten-2"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="birthDate"
                    @change="birthDateMenu = false"
                    color="teal lighten-2"
                    :min="minBirthDate"
                    :max="maxBirthDate"
                  ></v-date-picker>
                </v-menu>
                <v-file-input
                  label="Profile picture"
                  filled
                  prepend-icon="mdi-camera"
                  color="teal lighten-2"
                  v-model="profilePictureChosen"
                  @change="previewImage"
                ></v-file-input>
                <v-row class="justify-center align-center">
                  <div class="image-preview text-center" v-if="profilePicture" text-center>
                    <img ref="previewImg" class="preview" :src="profilePicture">
                </div>
                </v-row>
                
                <v-spacer></v-spacer>
                <v-btn 
                  text 
                  color="teal lighten-2"
                  text
                  v-if="!edit"
                  @click="submit"
                  :loading="loading" 
                  class="mx-4 mt-3">
                  Add Employee
                </v-btn>
                <v-btn 
                  text 
                  color="teal lighten-2"
                  text
                  v-else
                  @click="submit"
                  :loading="loading" 
                  class="mx-4 mt-3">
                  Update Employee
                </v-btn>
                <v-btn
                  color="teal lighten-4"
                  text
                  @click="dialog = false"
                  class="mx-4 mt-3">
                  Close
                </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
  import { format, parseISO, subYears } from 'date-fns'
  import Store from '../store/employee-store'

  export default {
      props: ['edit', 'id'],
      data: () =>{
        return {
          // employee data 
          firstName:'', 
          lastName:'',
          email:'',
          gender:'',
          birthDate: format(parseISO(subYears(new Date(),16).toISOString()), 'yyyy-MM-dd'),
          profilePicture: "",

          // ui needed data
          dialog: false , 
          profilePictureChosen: null,
          genders: ['male', 'female'],
          birthDateMenu: false,
          minBirthDate: format(parseISO(new Date("01 01 1900").toISOString()), 'yyyy-MM-dd'),
          maxBirthDate: format(parseISO(subYears(new Date(),16).toISOString()), 'yyyy-MM-dd'),
          loading: false,
          snackbarEmployeeUpdated: false,

          // validation rules
          nameRules : [
            n => !!n || 'This field is required',
          ],
          emailRules : [
            e => /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/.test(e) || 'Email must have a valid format'
          ],
          genderRules : [
            g => !!g || 'This field is required',
          ],

          // store
          employeesStore: new Store(),
        }
      },
      methods: {
        submit() {
          if(this.$refs.employeeForm.validate()) {
            this.loading = true
            if(!this.edit){
              this.employeesStore.addEmployee(this.firstName, this.lastName, this.email, this.birthDate, this.gender, this.profilePicture);
            }else{
              this.employeesStore.updateEmployee(this.$props.id, this.firstName, this.lastName, this.email, this.birthDate, this.gender, this.profilePicture)
            }
            this.loading = false
            this.$refs.employeeForm.reset();
            this.profilePicture = '';
            this.dialog = false;
            if(!this.edit){
              this.$emit('employeeAdded');       
            }else{
              this.$emit('employeeUpdated');       
            }
            this.$emit('employeeAdded');       
            }
        },
        previewImage() {
            if (!this.profilePictureChosen) {this.data = "No File Chosen"}
            else{
              var reader = new FileReader();
            
              reader.readAsDataURL(this.profilePictureChosen);
              reader.onload = () => {
                this.profilePicture = reader.result;
              }
            }
        },
        async editClicked() {
          this.dialog = true;
          let store = new Store();
          let currentEmployee = await store.getEmployeeById(this.$props.id);
          this.firstName = currentEmployee.firstNameEmployee;
          this.lastName = currentEmployee.lastNameEmployee;
          this.email = currentEmployee.emailEmployee;
          this.gender = currentEmployee.gender;
          this.birthDate = format(new Date(currentEmployee.birthDateEmployee.seconds*1000),'yyyy-MM-dd');
          this.profilePicture = currentEmployee.imageEmployee;
        }
      },
      computed: {
        computedDateFormattedDatefns () {
          return this.birthDate ? format(parseISO(this.birthDate), 'dd MMMM yyyy') : ''
        }
      },

      created(){
      }
      
  }
</script>

<style>
  .preview {
    /* border-radius: 50%; */
    width: 50%;
    height: 50%;
  }
  .image-preview {
    width: fit-content;
  }
  .addEmployee {
    height: 100%!important;
  }
  .update-action {
    margin-left: 45% !important;
    margin-top: 0;
    margin-bottom: 90% !important;
  }
  .add-action {
    margin-left: 35%;
  }
</style>