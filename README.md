# My Wallet

## 1. Seção Inicial

O projeto **My Wallet** é uma aplicação responsiva que simula uma carteira digital, permitindo que os usuários registrem suas entradas e saídas de dinheiro, com atualização automática do saldo.

[[Deploy do backend]](https://projectwallet.onrender.com)

## 2. Sobre
### 2.1 Arquitetura do Backend
O backend deste projeto foi arquitetado com as camadas de routers, controllers e middlewares. Ele é composto por duas entidades principais: User e Transaction.

* ###### **User**: Contém rotas de POST para a funcionalidade de Cadastro e de Login.


###### **CADASTRO => POST/signup:** 
```typescript
{
	name: string,
    email: string,
    password: string,
}
```

###### **LOGIN => POST/signin:** 
```typescript
{
    email: string,
    password: string,
}
```

* ###### **Transaction**: Contém as rotas de POST para adicionar operações de entrada e saída, e uma rota de GET para a listagem de operações.


###### **POST/transaction:** 
```typescript
{
    value: number,
    description: string,
    type: string,
}
```

### 2.2 Motivação

A motivação por trás do projeto é proporcionar aos usuários uma alternativa digital para registrar suas transações financeiras diárias. A ideia é substituir o tradicional bloquinho de notas de mão por um aplicativo responsivo, onde cada usuário tem acesso exclusivo à sua carteira, facilitando a visualização rápida e fácil de seus ganhos e perdas.

### 2.3 Lista de Features

- Cadastro de usuário
- Login de usuário
- Adição de operações de entrada e saída
- Listagem de operações

## Tecnologias

- bcrypt
- cors
- dayjs
- dotenv
- express
- joi
- mongodb
- uuid

## Como Rodar

Para rodar o projeto localmente, siga os passos abaixo:

1. Execute o comando `npm i` para instalar as dependências.
2. Crie um arquivo `.env` e copie as variáveis do arquivo `.env.example`.
3. Execute o comando `npm run dev` para iniciar o servidor local.

Agora, você pode acessar o projeto localmente em [http://localhost:5000](http://localhost:5000).