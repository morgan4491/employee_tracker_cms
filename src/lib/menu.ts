import inquirer from 'inquirer';
import 'console.table';

import {getAllEmployees, getAllRoles, getAllDepartments, updateEmployee} from './query.js';

let showWelcome = false;


export async function updateEmployeeId () {
    const employeeIdArray = await getAllEmployees();
    
};

export async function showAllEmployees() {
    const employeesArray = await getAllEmployees();
    console.table(employeesArray);
};

export async function showAllRoles() {
    const rolesArray = await getAllRoles();
    console.table(rolesArray);
};

export async function showAllDepartments() {
    const departmentsArray = await getAllDepartments();
    console.table(departmentsArray);
};

export async function showMainMenu() {
    if (!showWelcome) {
        console.log('\nWelcome to the Employee Tracker\n');
        showWelcome = true;
    }

    const {optionFunction} = await inquirer.prompt({
        message: 'Please select an option',
        name: '',
        type: 'list',
        choices: [
            {
                name: '',
                value: 
            },
            {
                name: '',
                value:
            },
            {
                name: '',
                value:
            },
        ]
    });

    if (!optionFunction) {
        console.log('\nThanks for using the Employee Tracker!\n');
        process.exit();
    }

    await optionFunction();

    showMainMenu();
}
