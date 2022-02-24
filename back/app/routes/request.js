import express from 'express';
import { create, get_all } from '../controllers/request.js';

const router = express.Router();

function set_request_router(app) {

    // add request
    router.post('/new', create);

    // retrieve all requests
    router.get('/', get_all);

    app.use('/requests', router);
};

export default set_request_router;