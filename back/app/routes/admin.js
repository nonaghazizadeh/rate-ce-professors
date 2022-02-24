import express from 'express';
import { login } from '../controllers/admin.js';

const router = express.Router();

function set_admin_router(app) {

    // login admin
    router.get('/login', login);

    app.use('/admins', router);
};

export default set_admin_router;