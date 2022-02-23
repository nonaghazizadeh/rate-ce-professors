import experss from "express";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';

import db from './app/models/index.js'

var corsOptions = {
    origin: "http://localhost:3000"
  };

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: resolve(__dirname, './.env')});

const app = experss();
app.use(cors(corsOptions));
app.use(bodyParser.json());

db.sequelize.sync();
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.BACKEND_PORT;
console.log(PORT)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});