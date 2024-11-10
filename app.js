import express from "express";

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

const worksData = [{
    "title": "ROLL!",
    "description": "Browser-based pixel art dice roller",
    "tags": ["pixel art", "javascript", "ejs"],
    "thumbnail": "/assets/temp_capture.PNG",
    "hyperlink": "/roller",
},

{
    "title": "plant 300!",
    "description": "A poetry chapbook for romantics",
    "tags": ["poetry", "writing"],
    "thumbnail": "/assets/plant300/plant300cover.PNG",
    "hyperlink": "",
},

{
    "title": "Vulnerabiliy Finder",
    "description": "Poke API integrated vulnerability checker",
    "tags": ["full stack", "API", "javascript", "ejs"],
    "thumbnail": "/assets/plant300/plant300cover.PNG",
    "hyperlink": "",
},

{
    "title": "B12",
    "description": "A poetry chapbook for social climbers",
    "tags": ["poetry", "writing", ""],
    "thumbnail": "/assets/b12/b12cover.PNG",
    "hyperlink": "",
},
];

var worksTemplate = {
    "title": "",
    "description": "",
    "tags": [],
    "thumbnail": "",
    "hyperlink": "",
};



app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { data: worksData })
});

app.get("/roller", (req, res) => {
    res.render("roller.ejs")
});

app.listen(PORT, HOST);
console.log(`Application is listening on PORT ${PORT}:${HOST}`);

