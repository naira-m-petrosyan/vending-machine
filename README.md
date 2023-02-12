# Setup

* NodeJS 16.7
* Postgres

## Server
### Steps
1. Run `cd server` in command line
2. Create a database named 'vending_machine' or whatever name suits you in postgres
3. Copy `.env.example` file into `.env` and fill in the values respectively
4. Run `npm ci` to install dependencies
5. Run `npm run migrate` to create tables in database
6. For development server startup you can use `npm run dev` and for production `npm start`


## Client
### Steps
1. Run `cd client` in command line
3. Copy `.env.example` file into `.env` and fill in the values respectively
4. Run `npm ci` to install dependencies
6. For server startup you can use `npm start`

