# Desafio NG.CASH

Este repositório contém a minha solução para o desafio técnico proposto pela NG.CASH. O desafio consistiu na criação de uma aplicação full-stack, onde destaco o desenvolvimento do backend. Nele, construí uma API REST em Node.js com TypeScript, seguindo os princípios da Arquitetura Limpa (Clean Architecture) e adotando as boas práticas do Clean Code.

## Tecnologias Utilizadas

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, TypeScript
- **Banco de Dados:** Sequelize, MySQL
- **Outros:** Docker

## Iniciando o Projeto

Para executar o projeto localmente, siga as instruções abaixo:

1. Clone este repositório em sua máquina local:

    `git clone https://github.com/thecrawler1/ng.cash.git`

2. Acesse o diretório do projeto:

    `cd ng-cash-challenge`

3. Construa e inicie os contêineres Docker:

    `docker-compose up -d --build`

4. Execute as migrações do banco de dados para criar as tabelas necessárias:

    `docker exec app_backend npm run db:migrate`

5. Acesse a aplicação em seu navegador, abrindo http://localhost:3000.

## Executando os Testes

A aplicação inclui testes unitários para a camada de domínio. Para executar os testes, utilize o seguinte comando dentro do contêiner do backend:

`docker exec app_backend npm run test`

## Arquitetura

No desenvolvimento do backend, segui os princípios da Arquitetura Limpa, que promove a separação de responsabilidades e a manutenibilidade do código. Isso permitiu criar uma estrutura organizada e escalável para a aplicação.

## Contribuições

Contribuições são bem-vindas! Se você identificar problemas ou tiver sugestões de melhorias, fique à vontade para criar um pull request ou abrir uma issue.
