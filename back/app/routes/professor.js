import express from 'express';
import { create } from '../controllers/professor.js';

const router = express.Router();

function set_professor_router(app) {

    // create new professor
    router.post('/new', create);

    app.use('/professors', router);
};

export default set_professor_router;