import experss from "express";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';

var corsOptions = {
    origin: "http://localhost:3000"
  };

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: resolve(__dirname, '../.env')});

const app = experss();
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

const PORT = process.env.BACKEND_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});