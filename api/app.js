import {Auth} from './middleware/index.js';
import {AuthController} from './controllers/index.js'
import {router} from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import express from 'express';

const app = express();
const PORT = process.env.PORT | 8080;


app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send(JSON.stringify({message: "hello world 2"}));
});

app.get("/login", AuthController.login);
app.post("/signup", AuthController.signup);
app.use('/api/v1', Auth.verifyUser ,router);


app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running, and App is listening on port ${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
