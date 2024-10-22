\c employee_tracker_db;

/* View All Departments table */
SELECT
    *
FROM department;

/* View All Roles table */
SELECT
    role.id AS id,
    title AS title,
    department.name AS department,
    salary AS salary
FROM role
JOIN department
    ON role.department_id = department.id

/* View All Employees table */
SELECT
    employee.id AS id,
    first_name AS first_name,
    last_name AS last_name,
    title AS title,
    name AS department,
    salary AS salary,
    CONCAT(employee_manager.first_name, ' ', employee_manager.last_name) AS manager
FROM employee
JOIN role
    ON employee.role_id = role.id
JOIN department
    ON role.department_id = department.id
JOIN employee AS employee_manager
    ON employee.manager_id = employee_manager.id

