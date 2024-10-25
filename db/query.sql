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


-- View All Employees Basic
SELECT
    id,
    CONCAT(first_name, ' ', last_name) AS full_name
FROM employee


-- View employees by manager
-- 1) Get all managers
SELECT DISTINCT
    employee_manager.id,
    employee_manager.first_name,
    employee_manager.last_name
FROM employee
INNER JOIN employee employee_manager
    ON employee.manager_id = employee_manager.id

-- 2) Get employees by selected manager
SELECT
    employee.manager_id,
    CONCAT(employee_manager.first_name, ' ', employee_manager.last_name) AS     manager,
    CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name
FROM employee
JOIN employee employee_manager
    ON employee.manager_id = employee_manager.id


-- View employees by department
-- 1) Get all departments (already above)
-- 2} Get employees by selected department
SELECT
    employee.id,
    CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name,
FROM employee
JOIN role
    ON employee.role_id = role.id
JOIN department
    ON role.department_id = department.id


-- Update employee managers
-- 1) Get all employees
-- 2) Get all managers


-- Delete departments, roles, and employees
DELETE FROM employee
WHERE id = $1

DELETE FROM role
WHERE id = $1

DELETE FROM department
WHERE id = $1


-- View the total utilized budget by department