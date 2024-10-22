import client from "../config/connection.js";
import 'console.table';

export async function getAllEmployees() {
    const sql = `
    SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(employee_manager.first_name, ' ', employee_manager.last_name) AS manager
    FROM employee
    LEFT JOIN role
        ON employee.role_id = role.id
    LEFT JOIN department
        ON role.department_id = department.id
    LEFT JOIN employee employee_manager
        ON employee.manager_id = employee_manager.id
    `;

    const {rows} = await client.query(sql);

    return rows;
}

export async function getAllRoles() {
    const sql = `
    SELECT
        role.id,
        role.title,
        department.name AS department,
        role.salary,
    FROM role
    LEFT JOIN department
        ON role.department_id = department.id
    `;

    const {rows} = await client.query(sql);

    return rows;
}

export async function getAllDepartments () {
    const sql = `
    SELECT
    *
    FROM department;
    `;

    const {rows} = await client.query(sql);

    return rows;
}

export async function addDepartment(name: string) {
    const sql = `
    INSERT INTO department (name) VALUES ($1)
    `;

    await client.query(sql, [name]);
}

export async function addRole(title: string, salary: number, department_id: number) {
    const sql = `
    INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)
    `;

    await client.query(sql, [title, salary, department_id]);
}

export async function addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number) {
    const sql = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3)
    `;

    await client.query(sql, [first_name, last_name, role_id, manager_id]);
}

export async function updateEmployee(id: number, role_id: number) {
    const sql = `
    UPDATE employee SET role_id = $1 WHERE id = $2
    `;

    await client.query(sql, [role_id, id]);
}