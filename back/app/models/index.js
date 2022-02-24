import Sequelize from 'sequelize';

import { DB, USER, PASSWORD, HOST, dialect as _dialect } from '../config/db.js';
import create_professor_model from './professor.js';
import create_student_model from './student.js';
import create_admin_model from './admin.js';
import create_comment_model from './comment.js';
import create_request_model from './request.js';

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
db.admins = create_admin_model(sequelize, Sequelize);
db.comments = create_comment_model(sequelize, Sequelize);
db.comments.belongsTo(db.students, {foreignKey: {name: 'stu_id'}});
db.comments.belongsTo(db.professors, {foreignKey: {name: 'prof_id'}});
db.requests = create_request_model(sequelize, Sequelize);

export default db;