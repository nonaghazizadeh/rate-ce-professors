import express from 'express';
import { create } from '../controllers/request.js';

const router = express.Router();

function set_request_router(app) {

    // add request
    router.post('/new', create);

    app.use('/requests', router);
};

export default set_request_router;