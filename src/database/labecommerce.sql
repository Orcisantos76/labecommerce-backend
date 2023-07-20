-- Active: 1689001725423@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    create_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, create_at as createdAt)
VALUES
    
    ('u001','Orci','orci@email.com','orci1234',datetime('now')),
    ('u002','Ana','ana@email.com','ana1234',datetime('now')),
    ('u003','Arthur','arthur@email.com','arthur1234',datetime('now'))
    ('u004','Guilherme', 'guilherme@email.com', 'guilherme1234', 'datatime(now)');

PRAGMA table_info (users);
SELECT * FROM users;
DROP TABLE users;




CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	price REAL NOT NULL,
	description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

INSERT INTO products (id, name,price, description, imageUrl)
VALUES
    ('prod003', 'Teclado mecanico', 400.00 , 'Teclado mais preciso', 'https://picsum.photos/seed/teclado/400'  ),
    ('prod004', 'Notebook', 6000.00 , 'Nitro 5', 'https://picsum.photos/seed/notebook/400'  ),
    ('prod005', 'Cadeira gamer', 1500.00,'Cadeira gamer para horas de games com maior conforto', 'https://picsum.photos/seed/cadeiragamer/400');

PRAGMA table_info (products);
SELECT * FROM products;
DROP TABLE products;




CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT(datetime('now'))  NOT NULL,
    Foreign Key (buyer) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE        
);

INSERT INTO purchases (id,buyer,total_price,created_at)
VALUES
    ('p001','u001',400,datetime('now')),
    ('p002','u001',300,datetime('now')),
    ('p003','u002',350,datetime('now')),
    ('p004','u002',500,datetime('now'));


PRAGMA table_info (purchases);
SELECT * FROM purchases;
DROP TABLE purchases;




CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    Foreign Key (purchase_id) REFERENCES purchases(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    Foreign Key (product_id) REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ('p004','prod003',2),
    ('p003','prod003',3),
    ('p004','prod003',2);

PRAGMA table_info (purchases_products);
SELECT * FROM purchases_products;
DROP TABLE purchases_products;




--atualizar valor.
UPDATE purchases
SET total_price = 999
WHERE id = 'p004';

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER join products
on products.id = purchases_products.product_id;


--mostrando so as colunas secionadas
SELECT
    purchases.id AS idPurchase,
    users.id AS idUser,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at
FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;

--mostrando todas as colunas
SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;

--busca por name que contenha a palavra gamer
SELECT * FROM products
WHERE name LIKE '%gamer%';

--busca que termina em -----a na coluna name
SELECT * FROM products
WHERE name LIKE '%a';

--busca que inicia em axxxxxxx, na coluna name
SELECT * FROM products
WHERE name LIKE 'a%';

--Criar um novo usuario.id


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


select 
    id AS idProduto,
    name AS nomeProduto,
    price As precoProduto
FROM products;

--Editar update pelo id, ira alterar o set do usuario,
--Pode ser uma ou varias colunas

UPDATE users
SET email = 'orcisantos@email.com'
WHERE id ='u001';

UPDATE products
SET name = 'new name',
    price = 500,
    description = 'new description'
WHERE id = 'prod006';

--CRUD 

--CREATE   criação        creat e insert
--READ     leitura        select
--UPDATE   atualização    update
--DELETE   deleção        delete
