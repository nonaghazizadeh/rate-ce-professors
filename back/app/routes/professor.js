import express from 'express';
import { create } from '../controllers/professor.js';

const router = express.Router();

function set_admin_router(app) {

    // create new note
    router.post('/new', create);

    app.use('/professors', router);
};

export default set_admin_router;