-- Active: 1689001725423@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    create_at TEXT NOT NULL
);

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	price REAL NOT NULL,
	description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, create_at)
VALUES
    ('u001','Orci','orci@email.com','orci1234',datetime('now')),
    ('u002','Ana','ana@email.com','orci1234',datetime('now')),
    ('u003','Arthur','arthur@email.com','orci1234',datetime('now'));

INSERT INTO products (id, name,price, description, image_url)
VALUES
    ('prod003', 'Teclado mecanico', 400.00 , 'Teclado mais preciso', 'https://picsum.photos/seed/teclado/400'  ),
    ('prod004', 'Notebook', 6000.00 , 'Nitro 5', 'https://picsum.photos/seed/notebook/400'  ),
    ('prod005', 'Cadeira gamer', 1500.00,'Cadeira gamer para horas de games com maior conforto', 'https://picsum.photos/seed/cadeiragamer/400');
    
PRAGMA table_info ('users');
PRAGMA table_info ('products');

SELECT * FROM users;

select 
    id,
    name,
    price
FROM products;