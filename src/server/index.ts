import express from 'express';
import { api } from './api';
import session from "cookie-session"

const app = express();
app.use(session({ secret: "secret" }))
app.use(api)
app.get("/api/hi", (req, res) => res.send("Hello world!"));
app.listen(3002, ()=> console.log('Whoodie Whooo Server running Whoddie Whoo on port 3002'))
