# setup database

1.  create database in postgres
2.  run below sql query in that database

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

# setup server

1.  create .env file in server directory
2.  add below env in .env file

    ### server port

        PORT=

    ### Postgres database configuration

        DB_USER=
        DB_HOST=
        DB_NAME=
        DB_PASSWORD=
        DB_PORT=

    ### JWT secret key

        JWT_SECRET_KEY=

    ### admin credentials

        ADMIN_EMAIL=
        ADMIN_PASSWORD=

3.  note : admin credentials required for login

4.  run below command in server directory

        npm install
        npm start

# setup client

1.  create .env file in client directory
2.  add below env in .env file

    ### server url

        REACT_APP_PROJECT_MODE=
        REACT_APP_SERVER_URL=

3.  run below command in client directory

        npm install
        npm start
