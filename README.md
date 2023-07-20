# labecommerce-backend
link de publicaçao no postman

https://documenter.getpostman.com/view/27659216/2s93zFWJnQ



A API "labecommerce-backend" é uma aplicação destinada ao registro, atualização e exclusão de usuários, produtos e compras. Ela foi desenvolvida para gerenciar todo o ciclo de vendas de uma loja online, desde o cadastro de usuários até a finalização de compras.

As principais características da API incluem:

Banco de dados: A aplicação utiliza um banco de dados real, com tecnologia SQL e SQLite, para armazenar com segurança as informações dos usuários, produtos e compras.

Tecnologias utilizadas: A API foi construída utilizando NodeJS e Typescript. Além disso, ela faz uso do framework Express para a criação das rotas e manipulação das requisições. A interação com o banco de dados é realizada através do Knex.

Endpoints: A API disponibiliza diversos endpoints para operações relacionadas aos usuários, produtos e compras. Alguns dos principais endpoints são:

Users: Permite cadastrar novos usuários, obter todos os usuários cadastrados, editar informações de um usuário existente e deletar um usuário.

Products: Permite cadastrar novos produtos, obter todos os produtos cadastrados, buscar produtos por nome, editar informações de um produto existente e deletar um produto.

Purchases: Permite cadastrar novas compras, obter todas as compras realizadas, buscar uma compra específica por ID, obter as compras de um usuário específico e editar ou deletar uma compra existente.

Documentação: A API possui uma documentação disponível no formato Postman, que contém detalhes sobre cada endpoint, seus parâmetros e respostas esperadas.
Para instalar a API "labecommerce-backend", você precisa seguir os seguintes passos:

Verificar se o Node.js e o gerenciador de pacotes NPM estão instalados em seu sistema.

Baixar ou clonar o repositório do projeto em sua máquina.

Abrir o terminal no diretório do projeto e executar o comando npm install para instalar as dependências necessárias.

Em seguida, executar o comando npm run start para iniciar o servidor localmente ou npm run dev para iniciar o servidor em modo de desenvolvimento.

Após a instalação, você pode acessar a API utilizando o endpoint http://localhost:3000/. Para informações mais detalhadas sobre como utilizar os endpoints, consulte a documentação da API "labecommerce-backend" disponibilizada no Postman.