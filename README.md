# Northcoders News API

Please create two .env files (.env.test & .env.development) at the root level. Into each file add PGDATABASE= with the corresponding database found in /db/setup/sql. 
.env.test should have 'PGDATABASE=nc_news_test;'
.env.development should have 'PGDATABASE=nc_news;'
Please run npm install

Please copy the following scripts object:

  "scripts": {
    "setup-dbs": "psql -f ./db/setup.sql",
    "seed": "node ./db/seeds/run-seed.js",
    "test": "jest",
    "prepare": "husky install"
  },
--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
