class Employee {
    constructor(id, firstName, lastName, email, birthDate, gender, image){
        this.idEmployee = id;
        this.firstNameEmployee = firstName;
        this.lastNameEmployee = lastName;
        this.emailEmployee = email;
        this.birthDateEmployee = birthDate;
        this.genderEmployee = gender;
        this.imageEmployee = image;
    }

    get id() {
        return this.idEmployee;
    }

    set id( id ) {
        this.idEmployee = id;
    }

    get firstName() {
        return this.firstNameEmployee;
    }

    set firstName (firstName) {
        this.firstNameEmployee = firstName;
    }

    get lastName() {
        return this.lastNameEmployee;
    }

    set lastName (lastName) {
        this.lastNameEmployee = lastName;
    }

    get email() {
        return this.emailEmployee;
    }

    set email (email) {
        this.emailEmployee = email;
    }

    get gender() {
        return this.genderEmployee;
    }

    set gender (gender) {
        this.genderEmployee = gender;
    }

    get birthDate() {
        return this.birthDateEmployee;
    }

    set birthDate (birthDate) {
        this.birthDateEmployee = birthDate;
    }

    get image() {
        return this.imageEmployee;
    }

    set image (image) {
        this.imageEmployee = image;
    }

    
}

// Firestore data converter
var employeeConverter = {
    toFirestore: function(employee) {
        return {
                firstName: employee.firstNameEmployee,
                lastName: employee.lastNameEmployee,
                email: employee.emailEmployee,
                gender: employee.genderEmployee,
                birthDate: employee.birthDateEmployee,
                image: employee.imageEmployee
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Employee( data.firstName, data.lastName, data.email, data.gender, data.birthDate, data.image);
    }
};