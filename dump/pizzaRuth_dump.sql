CREATE DATABASE pizzaRuth;

select * from pizzas;
select * from pedido;

USE pizzaRuth;

CREATE TABLE IF NOT EXISTS adm(
	id_adm int unique primary key,
    email_adm varchar(80) unique,
    pw_adm varchar(160) unique
);

INSERT INTO adm VALUES(1, 'adm@pizza.com', '$2a$12$20GBEMjgDG4ojitrZkUTGueYkfPxEcW4Vgpn2eL6Cq/je3s.XkAhW');
-- admin123456! 
-- 12 caracteres

CREATE TABLE IF NOT EXISTS users(
	id_user int primary key auto_increment,
    nm_user varchar(80) not null,
    email_user varchar(80) not null unique,
    cpf_user char(11) not null unique,
    pw_user varchar(160) not null,
    status_user bool null
); 

CREATE TABLE IF NOT EXISTS pizzas(
	id_pizza int primary key auto_increment,
    nm_pizza varchar(80) not null,
    vl_pizza float not null,
    ingredientes varchar(200) not null,
    descricao varchar(200),
    url_pizza varchar(160) not null
);

CREATE TABLE IF NOT EXISTS produtos(
	id_produto int primary key auto_increment,
    nm_produto varchar(80) not null,
    vl_produto float not null,
    url_produto varchar(160),
    descricao varchar(200)
);

CREATE TABLE IF NOT EXISTS cliente(
	id_cliente int primary key auto_increment,
    nm_cliente varchar(80) not null,
    email_cliente varchar(80) not null UNIQUE,
	celular CHAR(11) not null,
    cpf_cliente char(11) not null unique,
    pw_cliente varchar(160) not null,
    cd_cep CHAR(9) NOT NULL,
    nm_rua varchar(80) not null,
    bairro varchar(80) not null,
    cidade varchar(80) not null,
    num_residencia INT NOT NULL,
    complemento VARCHAR(255),
    id_uf varchar(30)
);

ALTER TABLE cliente
MODIFY COLUMN celular VARCHAR(20) DEFAULT NULL;

CREATE TABLE IF NOT EXISTS pagamento(
	id_pagamento int not null primary key auto_increment,
    tp_pagamento varchar(80) unique not null
);

INSERT INTO pagamento(tp_pagamento) VALUES
	('Dinheiro'),
    ('Pix'),
    ('Crédito'),
    ('Débito'),
    ('VR');

CREATE TABLE IF NOT EXISTS pedido(
    id_pedido int primary key auto_increment,
    id_cliente int,
    id_user int,
    data_pedido timestamp DEFAULT CURRENT_TIMESTAMP,
    status_pedido int not null,
    tipo_pagamento varchar(60) not null
);

-- 0: recusado
-- 1: aguardando
-- 2: aceito/ preparando
-- 3: saiu para entrega
-- 4: finalizado (entregue)

CREATE TABLE IF NOT EXISTS notClient(
	id_not int primary key auto_increment,
    nome varchar(80) not null,
    celular CHAR(11),
    cd_cep CHAR(9) NOT NULL,
    nm_rua varchar(80) not null,
    bairro varchar(80) not null,
    cidade varchar(80) not null,
    num_residencia INT NOT NULL,
    complemento VARCHAR(255),
    id_pedido INT NOT NULL,
    constraint foreign key (id_pedido) REFERENCES pedido(id_pedido)
);

CREATE TABLE IF NOT EXISTS pedido_item(
    id_pedido_item int primary key auto_increment,
    id_pedido int,
    id_pizza int,
    id_produto int,
    quantidade int,
    CONSTRAINT FK_item_pedid FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    CONSTRAINT FK_item_piza FOREIGN KEY (id_pizza) REFERENCES pizzas(id_pizza),
    CONSTRAINT FK_product FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

select * from pizzas;
select * from pedido;
select * from produtos;
select * from cliente;

SELECT
        ped.id_pedido 'idPedido',
        cli.nm_cliente 'nmCliente',
        cli.celular 'celCliente',
        cli.nm_rua 'ruaCliente',
        cli.num_residencia 'resCliente',
        cli.bairro 'bairroCliente',
        piz.nm_pizza 'pizza',
        pro.nm_produto 'produto',
        piz.vl_pizza 'valor',
        item.quantidade 'quantidade'
      FROM pedido ped
      INNER JOIN cliente cli ON cli.id_cliente = ped.id_cliente
      INNER JOIN pedido_item item ON item.id_pedido = ped.id_pedido
      INNER JOIN pizzas piz ON piz.id_pizza = item.id_pizza
      INNER JOIN produtos pro ON pro.id_produto = item.id_produto;
      