# Project Name - JQuery Salary Calculator

## Description

The JQuery Salary Calculator has input fields for an employee's first name, last name, ID number, job title, and annual salary.

When the submit button is pressed it takes the information in the input fields and checks to make sure that
all the fields have been filled, and that the ID and Salary fields are both numbers. If everything is filled
and the ID and salary are numbers it then creates a new object with those properties and also assigns the
object a unique ID.

It then updates the table that displays the employees and, in the process, creates a 'Delete' button for each entry that
corresponds to that unique ID. When the Delete button is pressed it will ask the user if they are sure they want the entry
to be deleted. If they are then it will take the object from the array and push it to a new array of deleted entries (in case
such information is needed at a later time) and then deletes it from the original array. It will then update the table display
and will stop showing the entry.

Below the table it shows the monthly expenditure on salary, which updates every time an employee is added or removed from the
table. If the expenditure goes above $20000 the background for the element turns red.

Above the input fields there are also buttons which can be used to sort the table. There are buttons to sort in ascending or 
descending order for all inputs.

Above that is a switch for going back and forth between dark and light mode. The page will detect if your browser is set to
prefer dark mode and, if so, will default to having it turned on.



Some features I had planned but was unable to implement include:
- Find out why, when the page transitions from light to dark mode, there are a few lines running across the screen during the
    transition and then fix the issue.
- A new input field for 'Start Date' and, when the delete button was clicked, 'End Date' (which, if left blank, would default
    to the current date).
- A second HTML document with which would have two tables, one with current employees and one with former employees. These tables
    would display the 'Start Date' and 'End Date' (with End Date stating 'Current Employed' for those still employed).
- Putting the sort buttons as part of the table header. If an input was being used as a criteria it would have an arrow ( ↑ or ↓ )
    displayed next to it depending on if it was ascending or descending. If a field was not the target of the sort it would instead
    display a dash ( - ).
    I was able to get this done for one input but realized that if I continued to try using the method I was using that the sorting
    code would likely match the rest of the code in length, and as such I abandoned that method in order to look into other methods
    to accomplish this.
