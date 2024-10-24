import inquirer from 'inquirer';
import 'console.table';
import { getAllEmployees, getAllRoles, getAllDepartments, updateEmployee, addDepartment, addRole, addEmployee } from './query.js';
let showWelcome = false;
export async function updateEmployeeId() {
    const employeeArray = await getAllEmployees(true);
    const rolesArray = await getAllRoles();
    const { id, role_id } = await inquirer.prompt([
        {
            message: 'Please select an employee to update',
            name: 'id',
            type: 'list',
            choices: employeeArray.map((userObj) => {
                return {
                    name: userObj.full_name,
                    value: userObj.id
                };
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
                };
            })
        },
    ]);
    await updateEmployee(id, role_id);
    console.log('\nEmployee updated successfully!\n');
}
;
export async function showAllEmployees() {
    const employeesArray = await getAllEmployees(false);
    console.table(employeesArray);
}
;
export async function showAllRoles() {
    const rolesArray = await getAllRoles();
    console.table(rolesArray);
}
;
export async function showAllDepartments() {
    const departmentsArray = await getAllDepartments();
    console.table(departmentsArray);
}
;
export async function showAddDepartment() {
    const departmentsArray = await getAllDepartments();
    const { addNewDepartment } = await inquirer.prompt({
        message: 'Please type the name of the department you would like to add',
        name: 'addNewDepartment',
        type: 'input'
    });
    if (addNewDepartment) {
        departmentsArray.push(addNewDepartment);
        await addDepartment(addNewDepartment);
        console.log('\nDepartment added successfully!\n');
    }
}
;
export async function showAddRole() {
    try {
        const rolesArray = await getAllRoles();
        const { title, salary, departmentId } = await inquirer.prompt([
            {
                message: 'Please type the name of the department you would like to add',
                name: 'title',
                type: 'input'
            },
            {
                message: 'Please enter the salary',
                name: 'salary',
                type: 'input'
            },
            {
                message: 'Please enter the department id',
                name: 'departmentId',
                type: 'input'
            },
        ]);
        if (title && salary && departmentId) {
            rolesArray.push(title, salary, departmentId);
            await addRole(title, salary, departmentId);
            console.log('\nRole added successfully!\n');
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}
;
export async function showAddEmployee() {
    const employeesArray = await getAllEmployees(true);
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            message: 'Please type the first name of the employee you would like to add',
            name: 'firstName',
            type: 'input'
        },
        {
            message: 'Please type the last name of the employee you would like to add',
            name: 'lastName',
            type: 'input'
        },
        {
            message: 'Please enter the role ID for this employee',
            name: 'roleId',
            type: 'input'
        },
        {
            message: 'Please enter the manager ID for this new employee',
            name: 'managerId',
            type: 'input'
        }
    ]);
    if (firstName && lastName && roleId && managerId) {
        employeesArray.push(firstName, lastName, roleId, managerId);
        await addEmployee(firstName, lastName, roleId, managerId);
        console.log('\nEmployee added successfully!\n');
    }
}
;
export async function showMainMenu() {
    if (!showWelcome) {
        console.log('\nWelcome to the Employee Tracker\n');
        showWelcome = true;
    }
    const { optionFunction } = await inquirer.prompt({
        message: 'Please select an option',
        name: 'optionFunction',
        type: 'list',
        choices: [
            {
                name: 'View All Departments',
                value: showAllDepartments
            },
            {
                name: 'View All Roles',
                value: showAllRoles
            },
            {
                name: 'View All Employees',
                value: showAllEmployees
            },
            {
                name: 'Add A Department',
                value: showAddDepartment
            },
            {
                name: 'Add A Role',
                value: showAddRole
            },
            {
                name: 'Add An Employee',
                value: showAddEmployee
            },
            {
                name: 'Update An Employee Role',
                value: updateEmployeeId
            },
            {
                name: 'Quit',
                value: 0
            }
        ]
    });
    if (!optionFunction) {
        console.log('\nThanks for using the Employee Tracker!\n');
        process.exit();
    }
    await optionFunction();
    showMainMenu();
}
//# sourceMappingURL=menu.js.map