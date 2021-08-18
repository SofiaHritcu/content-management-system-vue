<template>
  <v-row style="height: 100%;" align="center" justify="center">
    <v-btn
    class="my-10"
    @click.stop="dialog = true"
    outlined
    fab
    x-large
    color="teal darken-3">
        <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-dialog
    v-model="dialog"
    width="40%"
    height="95%"
    >
        <v-card class="teal lighten-5 teal--text text--darken-2">
          <v-img
            height="180"
            src="../assets/employees.jpg"
          />
          <v-card-title class="text-h5">
            Add Employee
          </v-card-title>
          <v-card-text width="50%" class="teal--text text--lighten-4">
            Introduce employee data 
            <v-form class="px-3 my-3">
                <v-row>
                  <v-text-field 
                    v-model="firstName" 
                    label="First Name" 
                    filled 
                    placeholder="Jack"
                    color="blue-grey lighten-2"
                    class="mx-2">
                  </v-text-field>
                  <v-text-field 
                    v-model="lastName" 
                    label="Last Name" 
                    filled 
                    placeholder="Nicholson"
                    color="blue-grey lighten-2">
                  </v-text-field>
                </v-row>
                <v-text-field 
                  v-model="email" 
                  label="Email" 
                  filled 
                  placeholder="jake@gmail.com"
                  color="blue-grey lighten-2">
                </v-text-field>
                <v-select
                  :items="genders"
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
                    <img class="preview" :src="profilePicture">
                </div>
                </v-row>
                
                <v-spacer></v-spacer>
                <v-btn 
                  text 
                  color="teal lighten-2"
                  text
                  @click="submit" 
                  class="mx-4 mt-3">
                  Add Employee
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

  export default {
      components: {
      },
      data: () =>{
        return {
          dialog: false , 
          firstName:'', 
          lastName:'',
          email:'',
          birthDate: format(parseISO(subYears(new Date(),16).toISOString()), 'yyyy-MM-dd'),
          profilePicture: "",
          profilePictureChosen: null,

          genders: ['male', 'female'],
          birthDateMenu: false,
          minBirthDate: format(parseISO(new Date("01 01 1900").toISOString()), 'yyyy-MM-dd'),
          maxBirthDate: format(parseISO(subYears(new Date(),16).toISOString()), 'yyyy-MM-dd'),
        }
      },
      methods: {
        submit() {
          console.log(this.firstName, this.lastName, this.email, this.genders, this.profilePicture);
          this.dialog = false;
        },
        previewImage() {
            if (!this.profilePictureChosen) {this.data = "No File Chosen"}
            var reader = new FileReader();
            
            reader.readAsDataURL(this.profilePictureChosen);
            reader.onload = () => {
              this.profilePicture = reader.result;
            }
        }
      },
      computed: {
        computedDateFormattedDatefns () {
          return this.birthDate ? format(parseISO(this.birthDate), 'dd MMMM yyyy') : ''
        }
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
</style>