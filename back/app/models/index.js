import { DB, USER, PASSWORD, HOST, dialect as _dialect } from '../config/db.js';
import Sequelize from 'sequelize';

console.log(DB)
const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: _dialect,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;