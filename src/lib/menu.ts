import inquirer from 'inquirer';
import 'console.table';

import {getAllEmployees, getAllRoles, getAllDepartments, updateEmployee} from './query.js';

let showWelcome = false;


export async function updateEmployeeId () {
    const employeeArray = await getAllEmployees(true);
    const rolesArray = await getAllRoles();
    const {id, role_id} = await inquirer.prompt([
        {
            message: 'Please select an employee to update',
            name: 'id',
            type: 'list',
            choices: employeeArray.map((userObj) => {
                return {
                    name: userObj.full_name,
                    value: userObj.id
                }
            })
        },
        {
            message: 'Please select a new role for the employee',
            name: 'role_id',
            type: 'list',
            choices: rolesArray.map((roleObj) => {
                return {
                    name: roleObj.title,
                    value: roleObj.id
                }
            })
        },
    ]);

    await updateEmployee(id, role_id);
    console.log('\nEmployee updated successfully!\n');
};

export async function showAllEmployees() {
    const employeesArray = await getAllEmployees(false);
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
