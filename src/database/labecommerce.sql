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
    ('u002','Ana','ana@email.com','ana1234',datetime('now')),
    ('u003','Arthur','arthur@email.com','arthur1234',datetime('now'));

INSERT INTO products (id, name,price, description, image_url)
VALUES
    ('prod003', 'Teclado mecanico', 400.00 , 'Teclado mais preciso', 'https://picsum.photos/seed/teclado/400'  ),
    ('prod004', 'Notebook', 6000.00 , 'Nitro 5', 'https://picsum.photos/seed/notebook/400'  ),
    ('prod005', 'Cadeira gamer', 1500.00,'Cadeira gamer para horas de games com maior conforto', 'https://picsum.photos/seed/cadeiragamer/400');
    
PRAGMA table_info ('users');
PRAGMA table_info ('products');

--busca tabela de users:
SELECT * FROM users;

--busca a tabela de products: 
SELECT * FROM products;

--busca por name que contenha a palavra gamer
SELECT * FROM products
WHERE name LIKE '%gamer%';

--Criar um novo usuario.id
INSERT INTO users (id, name, email, password, create_at)
VALUES
    ('insira o id','insira o name', 'insira o email', 'insira o password', 'datatime(now)');

--Criar um novo produto
INSERT INTO products (id, name,price, description, image_url)
VALUES
    ('prod006', 'Teclado mecanico2', 450.00 , 'tempo de resposta 1ms', 'https://picsum.photos/seed/teclado/400'  );


--Deletar um produto pelo id
DELETE FROM products
WHERE id = 'prod006';

--Deletar user pelo id
DELETE FROM users
WHERE id = 'insira o id';

--Editar update pelo id, ira alterar a set = descriçao 
UPDATE products
SET description = 'Melhor da categoria'
WHERE id = 'prod003';

--Editar update pelo id, ira alterar o set do usuario
UPDATE users
SET email = 'orcisantos@email.com'
WHERE id ='u001'

--
UPDATE products
SET price = 500;

select 
    id,
    name,
    price
FROM products;

UPDATE products
SET name = 'new name',
    price = 500,
    description = 'new description'
WHERE id = 'prod006';