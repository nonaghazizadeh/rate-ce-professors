import express from 'express';
import { create, delete_one, update } from '../controllers/comment.js';

const router = express.Router();

function set_comment_router(app) {

    // add comment
    router.post('/new', create);

    // update comment
    router.post('/update', update);

    // delete comment
    router.delete('/', delete_one)

    app.use('/comments', router);
};

export default set_comment_router;