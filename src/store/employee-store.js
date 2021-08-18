import {getNumberOfEmployeesDocFirestore,addEmployeeToFirestore, getMaxId} from "../firebase/employee-firebase.js";
import Employee from '../model/employee'

class Store {
    constructor (){
        this.filters = new Map([['gender', ""], ['image', ""], ['birthDate', {start: new Date('1900-01-01'), end: new Date('2005-12-31')}]]);;
        this.currentId = 0;
        this.getCurrentId();
    }


    async addEmployee(firstName, lastName, email, birthdate, gender, image){
        var employee = new Employee(this.currentId, firstName, lastName, email, birthdate, gender, image);
        this.currentId++;
        await addEmployeeToFirestore(employee);
    }
    
    async  deleteEmployee(employeeToDeleteId){
        this.currentId--;
        await deleteEmployeeFromFirestore(employeeToDeleteId);
    }
    
    async updateEmployee(id, firstName, lastName, email, birthdate, gender, image){
        await updateEmployeeFromFirestore(id, firstName, lastName,email, birthdate, gender, image );
    }
    
    getEmployeeById(idEmployee) {
        return getEmployeeByIdFirestore(idEmployee);
    }

    async getCurrentId(){
        let numberEmployees = await this.getNumberOfEmployees();
        if( numberEmployees !== 0){
            let maxId = await getMaxId();
            this.currentId = maxId + 1;
        } else {
            this.currentId = 1;
        }
        console.log(this.currentId);
    }

    
    getNumberOfEmployees(){
        return getNumberOfEmployeesDocFirestore();
    }
    
    putData() {
        
    }
    
    async loadData() {
        return await getEmployeesFromFirestore();
    };
    
    
    //filters
    filter(filter, filterValue){
        this.filters.set(filter, filterValue);
    }
    
    
    
    async filterEmployeeByGender(gender) {
        filter('gender', gender)
        // return await filterEmployeeByGenderFirestore(gender);
        return await filterAllFirestore(filters);
    }
    
    async filterEmployeeByProfile(profile){
        filter('image', profile)
        // return await filterEmployeeByProfileFirestore(profile);
        return await filterAllFirestore(filters);
    }
    
    async filterEmployeeByBirthdate(startFilter, endFilter){
        filter('birthDate', {start: new Date(startFilter), end: new Date(endFilter)})
        // return await filterEmployeeByBirthdateFirestore(startFilter, endFilter);
        return await filterAllFirestore(filters);
    }
    
}

export default Store