# NG.CASH | Digital Wallet

Desafio técnico da NG.CASH

## Rodando a aplicação

No diretório do projeto, você deve executar:

### `docker-compose up -d --build`
Para construir e iniciar todos os containers.

### `docker exec app_backend npm run db:migrate`
Para construir as tabelas do bando de dados.

Agora você pode abrir [http://localhost:3000](http://localhost:3000) para acessar a aplicação no navegador.

## Rodando os testes

A aplicação possui testes unitários da camada de domínio.

### `docker exec app_backend npm run test`
