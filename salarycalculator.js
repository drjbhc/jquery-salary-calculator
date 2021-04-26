let employeeArray = []; // Create array that holds the information of the current employees.
let storageNumber = 0; // Creates a unique number for every entry as a global variable.
let deletedEmployees = []; // For databasing purposes, to save ex-employees in case the information is needed later.

$( document ).ready( onLoad );

function onLoad(){
    $( '#inputEmployee' ).on( 'click', addEmployee ); // Button to add new employee
    $( '#employeeTable' ).on( 'click', '#deleteEmployee', deleteButton); // Button to delete an employee



    $( '#sortFNA' ).on( 'click', sortFirstNameAscending ); // Sorts the table and array by first name ascending
    $( '#sortFND' ).on( 'click', sortFirstNameDescending); // Sorts the table and array by first name descending

    $( '#sortLNA' ).on( 'click', sortLastNameAscending ); // Sorts the table and array by last name ascending
    $( '#sortLND' ).on( 'click', sortLastNameDescending ); // Sorts the table and array by last name descending

    $( '#sortIDA' ).on( 'click', sortIDAscending ); // Sorts the table and array by ID ascending
    $( '#sortIDD' ).on( 'click', sortIDDescending ); // Sorts the table and array by ID descending

    $( '#sortTA' ).on( 'click', sortTitleAscending ); // Sorts the table and array by title ascending
    $( '#sortTD' ).on( 'click', sortTitleDescending ); // Sorts the table and array by title descending

    $( '#sortSA' ).on( 'click', sortSalaryAscending ); // Sorts the table and array by salary ascending
    $( '#sortSD' ).on( 'click', sortSalaryDescending ); // Sorts the table and array by salary descending



    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        $( 'body' ).addClass( 'darkmode' );
        $( '.dayNight' ).text( 'ON' );
    }
    // Checks if browser settings is set to prefer dark mode. If yes, sets page to dark mode by default.


    $( '.dayNight' ).on( 'click', function() {
        if( $( 'body' ).hasClass( 'darkmode' )) {
          $( 'body' ).removeClass( 'darkmode' );
          $( '.dayNight' ).text( 'OFF' );
        } else {
          $( 'body' ).addClass( 'darkmode' );
          $( '.dayNight' ).text( 'ON' );
        }
    });
    // Creates a 'button'/switch to change the page to and from darkmode.


    displayEmployees();
    // Displays employees
}


function addEmployee(){

    employeeFirstName = $( '#firstNameInput' ).val();
    employeeLastName = $( '#lastNameInput' ).val();
    employeeID = $( '#idInput' ).val();
    employeeTitle = $( '#titleInput' ).val();
    employeeSalary = $( '#salaryInput' ).val();
    // Gets the information from the inputs and creates variables for them.


    if ( employeeFirstName.length === 0 || employeeLastName.length === 0 || employeeID.length === 0 || employeeTitle.length === 0 || employeeSalary.length === 0){
        alert('Error: One or more fields have been left blank, unable to add new employee.')
    }
    // Makes sure no field is empty


    else if ( isNaN(Number(employeeSalary)) ){
        alert('Error: Salary field is not a number.');
    }
    // Makes sure the salary field is a number


    else if ( isNaN(Number(employeeID)) ){
        alert('Error: ID field is not a number.');
    }
    // Makes sure the ID Number is a number


    else {
      let pushNumber = `storageNumber${storageNumber}`;
      // Creates unique ID for the new input

        let newEmployee = {
            firstName: employeeFirstName,
            lastName: employeeLastName,
            id: employeeID,
            title: employeeTitle,
            salary: employeeSalary,
            number: pushNumber,
        }
        // Takes input information and unique ID and creates an object

        employeeArray.push(newEmployee);
        // Pushes object to the employeeArray.

        $( '#firstNameInput' ).val( '' );
        $( '#lastNameInput' ).val( '' );
        $( '#idInput' ).val( '' );
        $( '#titleInput' ).val( '' );
        $( '#salaryInput' ).val( '' );
        // Clears the input fields.

        storageNumber++;
        // Increments the unique ID so that it remains unique.
    }

    displayEmployees(); // Displays employees in the employeeArray
    displayMonthlySalary(); // Displays the monthly total salary of all current employees.
}

function displayEmployees(){

    let listBody = $( '#employeeBody' ); // Targets the table body
    listBody.empty();
    for ( i = 0; i < employeeArray.length; i++ ) {
        listBody.append(`<tr><th>${employeeArray[i].firstName}</th><th>${employeeArray[i].lastName}</th><th>${employeeArray[i].id}</th><th>${employeeArray[i].title}</th><th>$${employeeArray[i].salary}</th><th><button id="deleteEmployee" name="${employeeArray[i].number}">Delete</button></th></tr>`)
    }
    // Appends each employee from the employeeArray into the table body
}

function deleteButton() {

    let clickedButton = ($(this).attr("name")); // Finds the unique ID for the delete button

    let entryToDelete;
    let deleteIndex;
    for( i = 0; i < employeeArray.length; i++){
        if (employeeArray[i].number === clickedButton ){
            entryToDelete = employeeArray[i];
            deleteIndex = i;
            
        }
    }
    // Finds the corresponding ID in the employeeArray and gets the Index Number of the entry and the entry itself.


    if (confirm(`Are you sure you wish to delete the entry for ${entryToDelete.firstName} ${entryToDelete.lastName}?`)){ // Asks to confirm deletion

        deletedEmployees.push(employeeArray[deleteIndex]); // Pushes the employee entry to a new array
        
        employeeArray.splice( deleteIndex, 1 ); // Removes the employee from the employeeArray

        displayEmployees(); // Updates the display of employees
        displayMonthlySalary(); // Updates the display of the total monthly salary
    }
}

function displayMonthlySalary() {
    let annualSalary = 0;
    for ( i = 0; i < employeeArray.length; i++ ){
        annualSalary += Number(employeeArray[i].salary);
    }
    // Finds total annual salary of all employees

    let monthlySalary = (annualSalary / 12).toFixed(2); // Finds the monthly salary and rounds it to 2 decimals

    let displaySalary = $( '#salaryDisplay' );
    displaySalary.empty();
    // Empties the div the salary will be displayed

    if ( Number(monthlySalary) > 20000 ) {
        displaySalary.append(`<span class="inRed">Total Monthly: $${monthlySalary}</span>`); // If the salary exceeds 20000 it will create a div to display it with a class "inRed"
    }
    else {
        displaySalary.append(`<span>Total Monthly: $${monthlySalary}</span>`); // If the salary does not exceed 20000 the displayed div will not have a class
    }
}







function sortFirstNameAscending(){

    employeeArray.sort(function(a, b) {
        let nameA = a.firstName.toUpperCase();
        let nameB = b.firstName.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        else if (nameA > nameB) {
            return 1;
        }
        else {
            return 0;
        }
      });

    displayEmployees();
}

function sortFirstNameDescending(){

    employeeArray.sort(function(a, b) {
        let nameA = a.firstName.toUpperCase();
        let nameB = b.firstName.toUpperCase();

        if (nameA > nameB) {
            return -1;
        }
        else if (nameA < nameB) {
            return 1;
        }
        else {
            return 0;
        }
      });

    displayEmployees();
}

function sortLastNameAscending(){

    employeeArray.sort(function(a, b) {
        let nameA = a.lastName.toUpperCase();
        let nameB = b.lastName.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        else if (nameA > nameB) {
            return 1;
        }
        else {
            return 0;
        }
      });

    displayEmployees();
}

function sortLastNameDescending(){

    employeeArray.sort(function(a, b) {
        let nameA = a.lastName.toUpperCase();
        let nameB = b.lastName.toUpperCase();

        if (nameA > nameB) {
            return -1;
        }
        else if (nameA < nameB) {
            return 1;
        }
        else {
            return 0;
        }
      });

    displayEmployees();
}

function sortIDAscending(){

    employeeArray.sort(function (a, b) {
        return a.id - b.id;});

    displayEmployees();
}

function sortIDDescending(){

    employeeArray.sort(function (a, b) {
        return b.id - a.id;});

    displayEmployees();
}

function sortTitleAscending(){

    employeeArray.sort(function(a, b) {
        let nameA = a.title.toUpperCase();
        let nameB = b.title.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        else if (nameA > nameB) {
            return 1;
        }
        else {
            return 0;
        }
      });

    displayEmployees();
}

function sortTitleDescending(){

    employeeArray.sort(function(a, b) {
        let nameA = a.title.toUpperCase();
        let nameB = b.title.toUpperCase();

        if (nameA > nameB) {
            return -1;
        }
        else if (nameA < nameB) {
            return 1;
        }
        else {
            return 0;
        }
      });

    displayEmployees();
}

function sortSalaryAscending(){

    employeeArray.sort(function (a, b) {
        return a.salary - b.salary;});

    displayEmployees();
}

function sortSalaryDescending(){

    employeeArray.sort(function (a, b) {
        return b.salary - a.salary;});

    displayEmployees();
}