\c employee_tracker_db;

-- View All Departments table
SELECT
*
FROM department;

-- View All Roles table
SELECT
    role.id,
    role.title,
    department.name AS department,
    role.salary,
FROM role
LEFT JOIN department
    ON role.department_id = department.id

-- View All Employees table
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

