let employeeArray = [];
let storageNumber = 0;

$( document ).ready( onLoad );

function onLoad(){
    $( '#inputEmployee' ).on( 'click', addEmployee );
    $( '#employeeTable' ).on( 'click', '#deleteEmployee', deleteButton);


    $( ".dayNight" ).on("click", function() {
        if( $( "body" ).hasClass( "darkmode" )) {
          $( "body" ).removeClass( "darkmode" );
          $( ".dayNight" ).text( "OFF" );
        } else {
          $( "body" ).addClass( "darkmode" );
          $( ".dayNight" ).text( "ON" );
        }
    });



    displayEmployees();
}


function addEmployee(){

    employeeFirstName = $( '#firstNameInput' ).val();
    employeeLastName = $( '#lastNameInput' ).val();
    employeeID = $( '#idInput' ).val();
    employeeTitle = $( '#titleInput' ).val();
    employeeSalary = $( '#salaryInput' ).val();

    if ( employeeFirstName.length === 0 || employeeLastName.length === 0 || employeeID.length === 0 || employeeTitle.length === 0 || employeeSalary.length === 0){
        alert('Error: One or more fields have been left blank, unable to add new employee.')
    }

    else if ( isNaN(Number(employeeSalary)) ){
        alert('Error: Salary field is not a number.');
    }

    else {
      let pushNumber = `storageNumber${storageNumber}`;

        let newEmployee = {
            firstName: employeeFirstName,
            lastName: employeeLastName,
            id: employeeID,
            title: employeeTitle,
            salary: employeeSalary,
            number: pushNumber,
        }

        employeeArray.push(newEmployee);

        $( '#firstNameInput' ).val( '' );
        $( '#lastNameInput' ).val( '' );
        $( '#idInput' ).val( '' );
        $( '#titleInput' ).val( '' );
        $( '#salaryInput' ).val( '' );

        storageNumber++;
    }

    displayEmployees();
    displayMonthlySalary();
}

function displayEmployees(){
    let listHeader = $( '#employeeHeader' );
    listHeader.empty();
    listHeader.append(`<tr><th>First Name</th><th>Last Name</th><th>ID</th><th>Title</th><th>Annual Salary</th><th></th></tr>`);

    let listBody = $( '#employeeBody' );
    listBody.empty();
    for ( i = 0; i < employeeArray.length; i++ ) {
        listBody.append(`<tr><th>${employeeArray[i].firstName}</th><th>${employeeArray[i].lastName}</th><th>${employeeArray[i].id}</th><th>${employeeArray[i].title}</th><th>$${employeeArray[i].salary}</th><th><button id="deleteEmployee" name="${employeeArray[i].number}">Delete</button></th></tr>`)
    }

}

function deleteButton() {

    let clickedButton = ($(this).attr("name"));

    let entryToDelete;
    for( i = 0; i < employeeArray.length; i++){
        if (employeeArray[i].number === clickedButton ){
            entryToDelete = employeeArray[i];
        }
    }


    let deleteIndex = employeeArray.indexOf(entryToDelete);
    employeeArray.splice( deleteIndex, 1 );

    displayEmployees();
    displayMonthlySalary();
}

function displayMonthlySalary() {
    let annualSalary = 0;
    for ( i = 0; i < employeeArray.length; i++ ){
        annualSalary += Number(employeeArray[i].salary);
    }

    let monthlySalary = annualSalary / 12;

    let displaySalary = $( '#salaryDisplay' );
    displaySalary.empty();

    if ( Number(monthlySalary) > 20000 ) {
        displaySalary.append(`<div class="inRed">Total Monthly: $${monthlySalary}</div>`);
    }
    else {
        displaySalary.append(`<div>Total Monthly: $${monthlySalary}</div>`);
    }
}