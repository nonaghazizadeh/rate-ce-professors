import express from 'express';
import { create, get_pendings, change_status, login, find_one } from '../controllers/student.js';

const router = express.Router();

function set_student_router(app) {

    // create new student
    router.post('/new', create);

    // get all pendig students
    router.get('/pendings', get_pendings);

    // accept or reject student
    router.put('/accept', change_status);

    // login student
    router.get('/login', login);

    // retrieve student data
    router.get('/', find_one);

    app.use('/students', router);
};

export default set_student_router;