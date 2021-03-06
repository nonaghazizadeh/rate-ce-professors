import experss from "express";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';

import db from './app/models/index.js'
import set_professor_router from './app/routes/professor.js'
import set_student_router from "./app/routes/student.js";
import set_admin_router from "./app/routes/admin.js";
import set_comment_router from "./app/routes/comment.js";
import set_request_router from "./app/routes/request.js";

var corsOptions = {
    origin: "http://localhost:3000"
  };

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: resolve(__dirname, './.env')});

const app = experss();
app.use(cors(corsOptions));
app.use(bodyParser.json());

db.sequelize.sync();

set_professor_router(app);
set_student_router(app);
set_admin_router(app);
set_comment_router(app);
set_request_router(app);

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});