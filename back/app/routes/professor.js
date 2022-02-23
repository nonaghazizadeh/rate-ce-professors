import express from 'express';
import { create, find_all, rate, find_one } from '../controllers/professor.js';

const router = express.Router();

function set_professor_router(app) {

    // create new professor
    router.post('/new', create);

    // retrieve all professors
    router.get('/', find_all);

    // rate professor
    router.post('/rate', rate);

    // get one professor data
    router.get('/one', find_one);

    app.use('/professors', router);
};

export default set_professor_router;