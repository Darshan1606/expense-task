# server port

PORT=5000

# Postgres database configuration

DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=

# JWT secret key

JWT_SECRET_KEY=expense@darshan

# admin credentials

ADMIN_EMAIL=admin@work.com
ADMIN_PASSWORD=Admin@123







# add above env in server and run below sql before start server and connect db

CREATE TABLE categories (
id SERIAL PRIMARY KEY,
name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TYPE user_status AS ENUM ('active', 'inactive');

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
status user_status NOT NULL
);

CREATE TABLE expenses (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
category_id INT NOT NULL,
amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
description TEXT,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
