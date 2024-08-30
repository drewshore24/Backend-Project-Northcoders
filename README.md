# Northcoders News API

Please create two .env files (.env.test & .env.development) at the root level. Into each file add PGDATABASE= with the corresponding database found in /db/setup/sql. 
.env.test should have 'PGDATABASE=nc_news_test;'
.env.development should have 'PGDATABASE=nc_news;'

Please run 'npm install'
Please run 'npm i -D supertest'
Please run 'i-D jest'
Please run 'npm install express'
Please run 'npm install fs'
Please run 'npm install pg'
Please run 'npm install dotenv'

Please copy the following scripts object:

  "scripts": {
    "setup-dbs": "psql -f ./db/setup.sql",
    "seed": "node ./db/seeds/run-seed.js",
    "test": "jest",
    "prepare": "husky install"
  },
--- 
Link to hosted version - https://backend-project-northcoders.onrender.com/api

Project summary - Created a database to practise and gain a deeper understand for backend. This utlitizes get,post,patch and delete. It also fucntions with queries to the database. This API accesses application data programmatically. 

Node version - v22.4.0
psql (postgres version) - 16.4

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)