import express from "express";

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs")
});

app.get("/roller", (req, res) => {
    res.render("roller.ejs")
});

app.listen(PORT, HOST);
console.log(`Application is listening on PORT ${PORT}:${HOST}`);

 