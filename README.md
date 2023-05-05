# Backend Tubes 3 STIMA

Backend for simplified ChatGPT web app 

## Table of Contents

- [Requirements](#requirements)
- [Project Setup](#setup)
- [Authors](#authors)

## Requirements
- Node.js **(*insert version*)**
- MySQL

## Setup

To **clone this repo**, run:
```
git clone https://github.com/raihaniqbal24/Tubes3_13518134_BE.git
cd tubes3_13518134_be
```

After cloning the repository, **install dependencies** by executing:
```
npm install
```

**Set development database variables** by editing `.env` file:

```
DB_DIALECT_DEV=mysql
DB_USERNAME_DEV=
DB_PASSWORD_DEV=
DB_DATABASE_DEV=tubes3stima
DB_HOST_DEV=localhost
DB_PORT_DEV=3306
```

Leave the test and production database variables for later stage of development. Create the database in the DBMS:
```
CREATE DATABASE tubes3stima;
```

After that, try **migrating the sample user model to the database** by executing: 
```
npx sequelize-cli db:migrate
```

And then, try to **insert a sample user data to the database** by executing:
```
npx sequelize-cli db:seed:all
```  

**Run the server** by executing:
```
npm run dev
```

## Authors
- 13518134 Muhammad Raihan Iqbal
- 13521050 Naufal Syifa Firdaus