## Beginner Level

### 1. What is SQL?
SQL stands for Structured Query Language and it is used to communicate with relational databases. It allows you to create, read, update, and delete data, as well as manage the structure of the database itself. Almost every relational database system like MySQL, PostgreSQL, Oracle, and SQL Server uses SQL as its core language.

```sql
SELECT * FROM employees;
```

### 2. What is the difference between SQL and MySQL?
SQL is a language used to query and manage data in relational databases, while MySQL is an actual database management system that implements SQL. In other words, SQL is the standard, and MySQL is one of many software products (like PostgreSQL or Oracle) that use SQL under the hood. MySQL also adds its own extensions and functions on top of standard SQL.

```sql
-- This is standard SQL, executed inside a MySQL server
SELECT VERSION();
```

### 3. What are the different types of SQL commands?
SQL commands are grouped into categories such as DDL (Data Definition Language), DML (Data Manipulation Language), DQL (Data Query Language), DCL (Data Control Language), and TCL (Transaction Control Language). DDL deals with structure (CREATE, ALTER, DROP), DML deals with data (INSERT, UPDATE, DELETE), and DCL/TCL handle permissions and transactions. Knowing this classification helps in understanding how different operations affect the database.

```sql
CREATE TABLE departments (id INT PRIMARY KEY, name VARCHAR(50)); -- DDL
INSERT INTO departments VALUES (1, 'Engineering');               -- DML
GRANT SELECT ON departments TO 'readonly_user';                  -- DCL
```

### 4. What is a Primary Key?
A primary key is a column or set of columns that uniquely identifies each row in a table, and it cannot contain NULL values. Every table can have only one primary key, though that key can be composed of multiple columns known as a composite key. It is commonly used as a reference point for foreign keys in other tables.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL
);
```

### 5. What is a Foreign Key?
A foreign key is a column that creates a link between two tables by referencing the primary key of another table. It enforces referential integrity, meaning you cannot insert a value in the child table that does not exist in the parent table. This is fundamental to maintaining consistent relationships in a relational database.

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 6. What is the difference between WHERE and HAVING?
WHERE is used to filter rows before any grouping happens, while HAVING is used to filter groups after the GROUP BY clause has been applied. WHERE cannot be used with aggregate functions like COUNT or SUM directly, but HAVING can. This distinction is important because misuse of the two is a very common beginner mistake.

```sql
SELECT department, COUNT(*) AS total
FROM employees
WHERE status = 'active'
GROUP BY department
HAVING COUNT(*) > 5;
```

### 7. What is the difference between DELETE, TRUNCATE, and DROP?
DELETE removes specific rows from a table based on a condition and can be rolled back if used inside a transaction. TRUNCATE removes all rows at once and resets any auto-increment counter, but it is generally faster and logged differently than DELETE. DROP removes the entire table structure along with its data permanently from the database.

```sql
DELETE FROM employees WHERE id = 10;
TRUNCATE TABLE employees;
DROP TABLE employees;
```

### 8. What are SQL data types?
SQL data types define what kind of value a column can store, such as numbers, text, dates, or boolean values. Common types in MySQL include INT, VARCHAR, TEXT, DATE, DATETIME, DECIMAL, and BOOLEAN. Choosing the correct data type is important for performance, storage efficiency, and data accuracy.

```sql
CREATE TABLE products (
    id INT,
    name VARCHAR(100),
    price DECIMAL(10,2),
    created_at DATETIME
);
```

### 9. What is a NULL value in SQL?
NULL represents missing or unknown data, and it is different from an empty string or zero. You cannot use standard comparison operators like `=` to check for NULL, so you must use IS NULL or IS NOT NULL instead. Handling NULL correctly is important because it can silently affect the results of joins, aggregates, and filters.

```sql
SELECT * FROM employees WHERE manager_id IS NULL;
```

### 10. What is the difference between CHAR and VARCHAR?
CHAR is a fixed-length string type that always uses the same amount of storage regardless of the actual string length, padding with spaces if needed. VARCHAR is a variable-length type that only uses as much storage as the actual string requires, plus a small overhead. CHAR is slightly faster for fixed-size data like country codes, while VARCHAR is better for variable-length data like names or emails.

```sql
CREATE TABLE codes (
    country_code CHAR(2),
    description VARCHAR(255)
);
```

---

## Intermediate Level

### 11. What are the different types of JOINs in SQL?
JOINs are used to combine rows from two or more tables based on a related column. The main types are INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN, each returning a different combination of matched and unmatched rows. MySQL does not support FULL OUTER JOIN directly, so it is usually simulated using a UNION of LEFT and RIGHT joins.

```sql
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

### 12. What is the difference between INNER JOIN and LEFT JOIN?
INNER JOIN returns only the rows where there is a match in both tables, discarding any unmatched rows. LEFT JOIN returns all rows from the left table and the matched rows from the right table, filling in NULLs where there is no match. This makes LEFT JOIN useful when you want to preserve all records from a primary table even if related data is missing.

```sql
SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
```

### 13. What is normalization and why is it used?
Normalization is the process of organizing database tables to reduce data redundancy and improve data integrity. It involves splitting large tables into smaller related tables and defining relationships between them using foreign keys. The main normal forms are 1NF, 2NF, and 3NF, each addressing a specific type of redundancy or dependency issue.

```sql
-- Unnormalized: order_items stores product name and price repeatedly
-- Normalized: separate products table referenced by product_id
CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100), price DECIMAL(10,2));
CREATE TABLE order_items (order_id INT, product_id INT, quantity INT);
```

### 14. What is denormalization and when would you use it?
Denormalization is the intentional process of combining tables or adding redundant data to improve read performance, usually at the cost of some data integrity. It is commonly used in reporting systems, dashboards, or read-heavy applications where join performance becomes a bottleneck. The tradeoff is that updates become more complex since the same data may need to be changed in multiple places.

```sql
-- Storing customer_name directly in orders table to avoid a join on every read
CREATE TABLE orders (id INT, customer_id INT, customer_name VARCHAR(100), total DECIMAL(10,2));
```

### 15. What is an index and how does it improve performance?
An index is a data structure, usually a B-Tree, that allows the database to find rows much faster than scanning the entire table. It works similarly to an index in a book, letting the database jump directly to relevant rows instead of checking every row. However, indexes add overhead to write operations like INSERT and UPDATE since the index itself must also be maintained.

```sql
CREATE INDEX idx_email ON users(email);
SELECT * FROM users WHERE email = 'test@example.com';
```

### 16. What is the difference between a clustered and non-clustered index?
A clustered index determines the physical order of data in the table, and in MySQL's InnoDB engine, the primary key is always the clustered index. A non-clustered index, on the other hand, is a separate structure that stores pointers back to the actual row location. A table can only have one clustered index but can have multiple non-clustered (secondary) indexes.

```sql
-- id is the clustered index automatically in InnoDB
CREATE TABLE employees (id INT PRIMARY KEY, email VARCHAR(100));
CREATE INDEX idx_email ON employees(email); -- non-clustered/secondary index
```

### 17. What is a subquery and what are its types?
A subquery is a query nested inside another query, and it can be used in SELECT, FROM, or WHERE clauses. Subqueries can be correlated, where the inner query depends on the outer query's row, or non-correlated, where it runs independently. They are often used to filter results based on aggregated or derived data from another table.

```sql
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

### 18. What is the difference between a subquery and a JOIN?
A subquery is often more readable for simple filtering conditions, while a JOIN is generally more efficient when you need columns from multiple tables at once. Modern query optimizers can sometimes rewrite subqueries into joins internally, but this isn't guaranteed for all query patterns. In practice, JOINs tend to perform better for large datasets, while subqueries are clearer for existence checks or aggregate comparisons.

```sql
-- Subquery approach
SELECT name FROM employees WHERE department_id IN (SELECT id FROM departments WHERE location = 'NY');

-- JOIN approach
SELECT e.name FROM employees e JOIN departments d ON e.department_id = d.id WHERE d.location = 'NY';
```

### 19. What are aggregate functions in SQL?
Aggregate functions perform a calculation on a set of rows and return a single summarized value. Common examples include COUNT, SUM, AVG, MIN, and MAX, and they are typically used together with GROUP BY to summarize data by category. These functions are essential for building reports and dashboards that need totals or averages.

```sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
```

### 20. What is the difference between UNION and UNION ALL?
UNION combines the results of two queries and removes duplicate rows, while UNION ALL combines them without removing duplicates. Because UNION has to check for and eliminate duplicates, it is generally slower than UNION ALL. If you know your result sets won't have overlapping rows or duplicates don't matter, UNION ALL is the better performance choice.

```sql
SELECT city FROM customers
UNION ALL
SELECT city FROM suppliers;
```

### 21. What is a view in SQL?
A view is a virtual table based on the result of a stored SQL query, and it does not store data itself unless it's a materialized view. Views are useful for simplifying complex queries, restricting access to specific columns, or presenting data in a consistent format to applications. Any changes to the underlying tables are automatically reflected when the view is queried.

```sql
CREATE VIEW active_employees AS
SELECT id, name, department FROM employees WHERE status = 'active';

SELECT * FROM active_employees;
```

### 22. What is a stored procedure?
A stored procedure is a precompiled block of SQL code stored in the database that can be executed repeatedly with different parameters. It helps encapsulate business logic close to the data, reduces network overhead by executing multiple statements in one call, and can improve performance through caching of the execution plan. Stored procedures also make it easier to enforce consistent logic across multiple applications.

```sql
DELIMITER //
CREATE PROCEDURE GetEmployeesByDept(IN dept_id INT)
BEGIN
    SELECT * FROM employees WHERE department_id = dept_id;
END //
DELIMITER ;

CALL GetEmployeesByDept(3);
```

### 23. What is the difference between a stored procedure and a function?
A stored procedure can perform actions like INSERT, UPDATE, or DELETE and may or may not return a value, while a function must always return a single value and is typically used inside a SELECT statement. Functions cannot modify database state in most systems, whereas procedures often perform data manipulation tasks. Procedures are called using CALL, while functions can be used directly within expressions.

```sql
CREATE FUNCTION GetFullName(first_name VARCHAR(50), last_name VARCHAR(50))
RETURNS VARCHAR(100) DETERMINISTIC
RETURN CONCAT(first_name, ' ', last_name);

SELECT GetFullName('John', 'Doe');
```

### 24. What is a trigger in MySQL?
A trigger is a block of SQL code that automatically executes in response to a specific event like INSERT, UPDATE, or DELETE on a table. Triggers are useful for enforcing business rules, maintaining audit logs, or automatically updating related data without requiring explicit application logic. They run implicitly, so overusing them can make debugging and understanding data flow more difficult.

```sql
CREATE TRIGGER before_employee_delete
BEFORE DELETE ON employees
FOR EACH ROW
INSERT INTO employee_audit(employee_id, action) VALUES (OLD.id, 'DELETED');
```

### 25. What is the difference between a transaction and a query?
A query is a single request to read or write data, while a transaction is a group of one or more queries executed as a single logical unit of work. Transactions follow the ACID properties, meaning either all the operations succeed together or none of them are applied at all. This is critical for operations like bank transfers where partial success would leave data in an inconsistent state.

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

### 26. What are ACID properties in a database?
ACID stands for Atomicity, Consistency, Isolation, and Durability, and these properties guarantee reliable processing of database transactions. Atomicity ensures a transaction is all-or-nothing, Consistency ensures the database moves from one valid state to another, Isolation ensures concurrent transactions don't interfere with each other, and Durability ensures committed changes survive system failures. InnoDB in MySQL is designed to fully support ACID compliance, unlike the older MyISAM engine.

```sql
START TRANSACTION;
INSERT INTO orders (customer_id, total) VALUES (1, 500);
UPDATE inventory SET stock = stock - 1 WHERE product_id = 10;
COMMIT;
```

---

## Advanced Level

### 27. What is the difference between InnoDB and MyISAM storage engines?
InnoDB supports transactions, foreign keys, and row-level locking, making it suitable for applications requiring high concurrency and data integrity. MyISAM is simpler and can be faster for read-heavy workloads, but it only supports table-level locking and lacks transaction support. Since MySQL 5.5, InnoDB has been the default storage engine because it better handles modern application requirements.

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    total DECIMAL(10,2)
) ENGINE=InnoDB;
```

### 28. What is a deadlock and how can it be avoided?
A deadlock happens when two or more transactions are waiting on locks held by each other, resulting in a situation where none of them can proceed. MySQL's InnoDB engine automatically detects deadlocks and rolls back one of the transactions to break the cycle. Deadlocks can be minimized by always acquiring locks in a consistent order, keeping transactions short, and using appropriate indexes to reduce lock scope.

```sql
-- Transaction 1
START TRANSACTION;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
UPDATE accounts SET balance = balance + 50 WHERE id = 2;
COMMIT;
```

### 29. What are the different transaction isolation levels?
The four standard isolation levels are READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE, each offering a different tradeoff between consistency and concurrency. READ UNCOMMITTED allows dirty reads, while SERIALIZABLE offers the strictest consistency at the cost of performance. MySQL's InnoDB engine uses REPEATABLE READ as its default isolation level, which also helps prevent phantom reads through a mechanism called next-key locking.

```sql
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT balance FROM accounts WHERE id = 1;
COMMIT;
```

### 30. What are window functions in SQL?
Window functions perform calculations across a set of rows related to the current row without collapsing the result set like GROUP BY does. Common window functions include ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and SUM used with an OVER clause. They are extremely useful for running totals, ranking data, and comparing a row to previous or next rows in analytical queries.

```sql
SELECT name, salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
FROM employees;
```

### 31. What is the difference between RANK, DENSE_RANK, and ROW_NUMBER?
ROW_NUMBER assigns a unique sequential number to each row regardless of ties, RANK assigns the same rank to tied rows but skips the next rank numbers, and DENSE_RANK also assigns the same rank to ties but does not skip any numbers afterward. These are commonly used in leaderboard-style queries or when you need to select the top N records per group. Choosing the right one depends on how you want tied values to be treated.

```sql
SELECT name, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
    RANK() OVER (ORDER BY salary DESC) AS rank_num,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank_num
FROM employees;
```

### 32. How do you find the second highest salary in a table?
This is a classic interview question that tests your understanding of subqueries, LIMIT/OFFSET, and window functions. One common approach uses a subquery with MAX and a NOT IN or comparison operator, while another uses LIMIT with OFFSET after sorting. A more scalable and modern approach uses the DENSE_RANK window function, which also handles ties gracefully.

```sql
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Alternative using window function
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = 2;
```

### 33. What is query optimization and how do you approach it?
Query optimization is the process of improving SQL query performance by reducing execution time and resource usage. It typically involves analyzing the query execution plan using EXPLAIN, adding appropriate indexes, avoiding SELECT *, and rewriting inefficient subqueries as joins where possible. Real-world optimization also considers table statistics, query caching, and how the storage engine reads data from disk.

```sql
EXPLAIN SELECT name FROM employees WHERE department_id = 3;
```

### 34. What does the EXPLAIN keyword do in MySQL?
EXPLAIN shows how MySQL's query optimizer plans to execute a given query, including which indexes it will use, the join order, and the estimated number of rows scanned. It's one of the most important tools for diagnosing slow queries in production. Key things to watch for in the output are the "type" column indicating scan efficiency and the "rows" column indicating estimated rows examined.

```sql
EXPLAIN SELECT * FROM orders WHERE customer_id = 100 AND status = 'pending';
```

### 35. What is the N+1 query problem and how do you solve it?
The N+1 query problem occurs when an application executes one query to fetch a list of records and then executes an additional query for each record to fetch related data, resulting in N+1 total queries. This is a common performance issue in ORMs when eager loading isn't configured correctly. It's typically solved by using JOINs, batch loading with IN clauses, or explicit eager loading strategies provided by the ORM.

```sql
-- Instead of running one query per employee to get their department (N+1 problem)
-- Fetch everything in a single JOIN
SELECT e.name, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id;
```

### 36. What is database sharding?
Sharding is a technique of horizontally partitioning a large database into smaller, faster, more manageable pieces called shards, each hosted on a separate server. It is used to scale databases beyond what a single server can handle, especially for write-heavy applications with massive datasets. The challenge with sharding is that cross-shard queries and joins become significantly more complex to implement and maintain.

```sql
-- Example: users with id 1-1000000 go to shard1, 1000001-2000000 go to shard2
-- Application logic routes queries based on a shard key like user_id
SELECT * FROM users_shard1 WHERE id = 500000;
```

### 37. What is replication in MySQL and what are its types?
Replication is the process of copying data from one MySQL server, called the master or source, to one or more replica servers to improve read scalability and provide redundancy. The main types are asynchronous, semi-synchronous, and group replication, each offering different tradeoffs between performance and consistency guarantees. Replication is commonly used to offload read traffic from the primary database and to provide failover in case the primary server goes down.

```sql
-- On the source server
SHOW MASTER STATUS;

-- On the replica server
CHANGE REPLICATION SOURCE TO SOURCE_HOST='master_host', SOURCE_LOG_FILE='mysql-bin.000001', SOURCE_LOG_POS=154;
START REPLICA;
```

### 38. What is the difference between optimistic and pessimistic locking?
Pessimistic locking assumes conflicts will happen frequently, so it locks a row as soon as it's read to prevent other transactions from modifying it until the lock is released. Optimistic locking assumes conflicts are rare, so it allows multiple transactions to read the same data but checks for changes, often using a version number, before committing an update. Optimistic locking generally performs better under low contention, while pessimistic locking is safer under high contention scenarios.

```sql
-- Pessimistic locking
SELECT * FROM inventory WHERE product_id = 10 FOR UPDATE;

-- Optimistic locking using a version column
UPDATE inventory SET stock = stock - 1, version = version + 1
WHERE product_id = 10 AND version = 5;
```

### 39. What is a Common Table Expression (CTE) and how does it differ from a subquery?
A CTE is a named temporary result set defined using the WITH clause that can be referenced within a single SQL statement, making complex queries more readable. Unlike subqueries, CTEs can be self-referencing, allowing them to be used for recursive queries such as traversing hierarchical data. CTEs are generally easier to read and maintain than deeply nested subqueries, especially when the same derived result is used multiple times in a query.

```sql
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 100000
)
SELECT department, COUNT(*) FROM high_earners GROUP BY department;
```

### 40. How would you write a recursive CTE, for example to build an organizational hierarchy?
A recursive CTE consists of an anchor member that defines the starting point and a recursive member that repeatedly references the CTE itself until no more rows are returned. This pattern is commonly used for hierarchical data like organizational charts, category trees, or bill-of-materials structures. MySQL has supported recursive CTEs since version 8.0, using the same WITH RECURSIVE syntax as most other relational databases.

```sql
WITH RECURSIVE org_chart AS (
    SELECT id, name, manager_id, 1 AS level FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart;
```

### 41. What is the difference between horizontal and vertical scaling for databases?
Vertical scaling means increasing the resources of a single database server, such as adding more CPU, RAM, or faster storage. Horizontal scaling means distributing the database load across multiple servers, typically through replication or sharding. Vertical scaling is simpler to implement but has physical hardware limits, while horizontal scaling offers virtually unlimited growth but adds significant architectural complexity.

```sql
-- Vertical scaling is an infrastructure change, not SQL
-- Horizontal scaling example: read replicas for read-heavy queries
SELECT * FROM products WHERE category = 'electronics'; -- routed to a read replica
```

### 42. How do you prevent SQL injection in your applications?
SQL injection happens when untrusted user input is directly concatenated into a SQL query, allowing attackers to manipulate the query's logic. The most effective prevention is using parameterized queries or prepared statements, which treat user input strictly as data rather than executable code. Additional layers like input validation, least-privilege database accounts, and ORM query builders further reduce the risk.

```sql
-- Vulnerable
-- "SELECT * FROM users WHERE username = '" + input + "'"

-- Safe, using a prepared statement
PREPARE stmt FROM 'SELECT * FROM users WHERE username = ?';
SET @username = 'john_doe';
EXECUTE stmt USING @username;
```

### 43. What is partitioning in MySQL and how is it different from sharding?
Partitioning divides a single large table into smaller physical pieces based on a defined rule, such as a date range or a hash value, while still being managed as one logical table within a single database server. Sharding, by contrast, splits data across multiple independent database servers entirely. Partitioning helps improve query performance and manageability for very large tables without the operational complexity that sharding introduces.

```sql
CREATE TABLE sales (
    id INT,
    sale_date DATE,
    amount DECIMAL(10,2)
)
PARTITION BY RANGE (YEAR(sale_date)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
);
```

### 44. How do you handle a slow-running query in production?
Handling a slow query typically starts with using EXPLAIN to understand the execution plan and identify missing indexes or inefficient join orders. The next step is often checking the slow query log to confirm how frequently and how badly the query is performing under real traffic. Beyond indexing, solutions can include query rewriting, caching results, adding read replicas, or denormalizing data for read-heavy access patterns.

```sql
-- Enable and check the slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
```

### 45. What is the difference between a composite index and multiple single-column indexes?
A composite index is a single index built on multiple columns together, and it is most effective when queries filter or sort using those columns in the same order they appear in the index. Multiple single-column indexes are separate structures, and MySQL can only efficiently use one of them per table access in most query plans, unless using index merge. Choosing the right composite index based on actual query patterns, following the leftmost prefix rule, usually gives far better performance than several unrelated single-column indexes.

```sql
CREATE INDEX idx_dept_status ON employees(department_id, status);

-- This query can use the composite index efficiently
SELECT * FROM employees WHERE department_id = 3 AND status = 'active';
```

---

*Tip: For a 6-year experience level interview, be ready to go beyond definitions — interviewers will likely ask you to explain trade-offs, walk through EXPLAIN output, and design schemas or optimize queries on a whiteboard.*
