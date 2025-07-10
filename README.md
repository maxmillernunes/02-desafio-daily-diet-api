# Daily Diet API

> **Summary:**  
> This README is available in both **Portuguese do Brazil** and **English**.  
> Este README está disponível em **Português do Brasil** e **Inglês**.

- [🇧🇷 Português](#daily-diet-api---português)
- [🇺🇸 English](#daily-diet-api---english)

---

# Daily Diet API - PORTUGUÊS

API RESTful para controle de refeições diárias, permitindo que usuários registrem, editem e acompanhem suas refeições, além de obter métricas sobre seus hábitos alimentares.

---

## 📋 Regras da Aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - As refeições devem ser relacionadas a um usuário
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

---

## 🚀 Sobre o Projeto

O **Daily Diet API** é um backend desenvolvido em Node.js, Fastify, TypeScript, Knex e SQLite, que permite:

- Cadastro e autenticação de usuários via cookies de sessão
- Registro, edição, exclusão e listagem de refeições por usuário
- Consulta de métricas alimentares, como total de refeições, refeições dentro/fora da dieta e melhor sequência

## 🛠️ Tecnologias Utilizadas

- Node.js
- Fastify
- TypeScript
- Knex.js
- SQLite
- Zod (validação)
- dotenv (variáveis de ambiente)

## 📦 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/daily-diet-api.git
   cd daily-diet-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o ambiente:**
   - Copie o arquivo `.env.example` para `.env` e ajuste se necessário.

4. **Rode as migrations:**
   ```bash
   npm run knex -- migrate:latest
   ```

5. **Inicie o servidor:**
   ```bash
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3333`.

## 📖 Rotas da API

### Usuários

- **POST `/users`**  
  Cria um novo usuário.  
  **Body:** `{ "name": "Nome", "email": "email@exemplo.com" }`

- **POST `/users/sessions`**  
  Realiza login do usuário (gera cookie de sessão).  
  **Body:** `{ "email": "email@exemplo.com" }`

- **GET `/users/me`**  
  Retorna os dados do usuário autenticado (requer cookie de sessão).

### Refeições

- **POST `/meals`**  
  Cria uma nova refeição para o usuário autenticado.  
  **Body:**  
  ```json
  {
    "name": "Almoço",
    "description": "Arroz, feijão e frango",
    "is_diet": true
  }
  ```

- **PUT `/meals/:mealId`**  
  Edita uma refeição do usuário.  
  **Body:** (qualquer campo pode ser enviado)
  ```json
  {
    "name": "Jantar",
    "description": "Salada",
    "is_diet": false
  }
  ```

- **GET `/meals`**  
  Lista todas as refeições do usuário autenticado.

- **GET `/meals/:id`**  
  Retorna uma refeição específica do usuário.

- **DELETE `/meals/:id`**  
  Remove uma refeição do usuário.

### Métricas

- **GET `/metrics`**  
  Retorna métricas do usuário autenticado:
  - totalMeals: total de refeições
  - mealsOnDiet: refeições dentro da dieta
  - mealsOutOfDiet: refeições fora da dieta
  - bestStreak: melhor sequência dentro da dieta

## ⚠️ Observações

- Todas as rotas de refeições e métricas requerem autenticação via cookie `sessionId`.
- O banco de dados utilizado é SQLite, armazenado em `./db/app.db`.

## 📄 Licença

Este projeto está sob a licença ISC.

---

# Daily Diet API - ENGLISH

A RESTful API for daily meal tracking, allowing users to register, edit, and monitor their meals, as well as retrieve metrics about their eating habits.

---

## 📋 Application Rules

- [x] Users can be created
- [x] Users must be identified between requests
- [x] Users can register a meal with the following information:
  - Meals must be linked to a user
  - Name
  - Description
  - Date and Time
  - Whether it is within the diet or not
- [x] Users can edit a meal, updating any of the above fields
- [x] Users can delete a meal
- [x] Users can list all their meals
- [x] Users can view a single meal
- [x] Users can retrieve their metrics:
  - [x] Total number of meals registered
  - [x] Total number of meals within the diet
  - [x] Total number of meals outside the diet
  - [x] Best sequence of meals within the diet
- [x] Users can only view, edit, and delete meals they have created

---

## 🚀 About the Project

**Daily Diet API** is a backend built with Node.js, Fastify, TypeScript, Knex, and SQLite, providing:

- User registration and authentication via session cookies
- Meal registration, editing, deletion, and listing per user
- Dietary metrics, such as total meals, meals within/outside the diet, and best streak

## 🛠️ Technologies Used

- Node.js
- Fastify
- TypeScript
- Knex.js
- SQLite
- Zod (validation)
- dotenv (environment variables)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/daily-diet-api.git
   cd daily-diet-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and adjust as needed.

4. **Run migrations:**
   ```bash
   npm run knex -- migrate:latest
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   The server will be available at `http://localhost:3333`.

## 📖 API Endpoints

### Users

- **POST `/users`**  
  Create a new user.  
  **Body:** `{ "name": "Name", "email": "email@example.com" }`

- **POST `/users/sessions`**  
  Log in a user (generates a session cookie).  
  **Body:** `{ "email": "email@example.com" }`

- **GET `/users/me`**  
  Get the authenticated user's data (requires session cookie).

### Meals

- **POST `/meals`**  
  Register a new meal for the authenticated user.  
  **Body:**  
  ```json
  {
    "name": "Lunch",
    "description": "Rice, beans, and chicken",
    "is_diet": true
  }
  ```

- **PUT `/meals/:mealId`**  
  Edit a user's meal.  
  **Body:** (any field can be sent)
  ```json
  {
    "name": "Dinner",
    "description": "Salad",
    "is_diet": false
  }
  ```

- **GET `/meals`**  
  List all meals for the authenticated user.

- **GET `/meals/:id`**  
  Get a specific meal for the user.

- **DELETE `/meals/:id`**  
  Delete a user's meal.

### Metrics

- **GET `/metrics`**  
  Retrieve metrics for the authenticated user:
  - `totalMeals`: total number of meals
  - `mealsOnDiet`: meals within the diet
  - `mealsOutOfDiet`: meals outside the diet
  - `bestStreak`: best sequence within the diet

## ⚠️ Notes

- All meal and metrics routes require authentication via the `sessionId` cookie.
- The database used is SQLite, stored at `./db/app.db`.

## 📄 License

This project is licensed under the ISC License.

---

Made with 💜 by [Maxmiller Nunes](https://github.com/maxmillernunes)