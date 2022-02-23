import Sequelize from 'sequelize';

import { DB, USER, PASSWORD, HOST, dialect as _dialect } from '../config/db.js';
import create_professor_model from './professor.js';
import create_student_model from './student.js';

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

db.professors = create_professor_model(sequelize, Sequelize);
db.students = create_student_model(sequelize, Sequelize);

export default db;