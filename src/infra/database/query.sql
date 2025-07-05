-- SQL = Linguagem (Structure Query Language)

-- DDL = Estrutura do Banco (Data Definition Language)
-- CREATE
-- DROP
-- ALTER 

-- DML = Estrutura do Registro (Data Manipulation Language)
-- INSERT
-- UPDATE
-- DELETE

-- DQL = Estrutura de Consulta (Data Query Language)
-- SELECT

CREATE TABLE Products(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT(100) NOT NULL,
    description TEXT(250) NOT NULL,
    brand TEXT(100) NOT NULL,
    price TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    image_URL TEXT,
    created_at DATATIME DEAFULT CURRENT_TIMESTAMP,
    update_at DATETIME DEAFULT CURRENT_TIMESTAMP,
    status TEXT
);

CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT(100) NOT NULL,
    email TEXT(200) NOT NULL,
    password TEXT(16) NOT NULL,
    age INTEGER(3),
    cpf TEXT(14) NOT NULL,
    born_date DATETIME NOT NULL,
    phone TEXT(10) NOT NULL,
    created_at DATATIME DEAFULT CURRENT_TIMESTAMP,
    update_at DATETIME DEAFULT CURRENT_TIMESTAMP,
    status TEXT
);

-- CREATE TABLE users (
-- id INTEGER PRIMARY KEY AUTOINCREMENT,
-- name TEXT NOT NULL,
-- email TEXT UNIQUE NOT NULL,
-- password TEXT NOT NULL
-- );

-- CREATE TABLE addresses (
-- id INTEGER PRIMARY KEY AUTOINCREMENT,
-- user_id INTEGER NOT NULL,
-- street TEXT NOT NULL,
-- city TEXT NOT NULL,
-- state TEXT NOT NULL,
-- zip_code TEXT NOT NULL,
-- FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- CREATE TABLE products (
-- id INTEGER PRIMARY KEY AUTOINCREMENT,
-- name TEXT NOT NULL,
-- description TEXT,
-- price REAL NOT NULL,
-- stock INTEGER NOT NULL
-- );

-- CREATE TABLE shopping_cart (
-- id INTEGER PRIMARY KEY AUTOINCREMENT,
-- user_id INTEGER NOT NULL,
-- product_id INTEGER NOT NULL,
-- quantity INTEGER NOT NULL,
-- added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
-- FOREIGN KEY (user_id) REFERENCES users(id),
-- FOREIGN KEY (product_id) REFERENCES products(id)
-- );

