import express from 'express';
import { create } from '../controllers/comment.js';

const router = express.Router();

function set_comment_router(app) {

    // add comment
    router.post('/new', create);

    app.use('/comments', router);
};

export default set_comment_router;