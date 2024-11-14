import express from "express";
import { endpointName, endpointType, vulnerabilityTemplate, multiplierTemplate, resetTemplates, checkType, checkTypeWeaknesses, mergeObjects, calculateVulnerability, checkMultipliers } from "./public/scripts/pokedex.js";

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

const worksData = [{
    "title": "ROLL!",
    "description": "Browser-based pixel art dice roller",
    "tags": ["pixel art", "web development"],
    "thumbnail": "/assets/roll_cover.PNG",
    "endpoint": "/roller",
    "modal": "",
},

{
    "title": "plant 300!",
    "description": "A poetry chapbook for romantics",
    "tags": ["poetry", "writing"],
    "thumbnail": "/assets/plant300/plant300cover.PNG",
    "endpoint": "",
    "modal": "plant300",
},

{
    "title": "Poke Checker",
    "description": "PokeAPI-integrated match-up checker",
    "tags": ["web development", "javascript"],
    "thumbnail": "/assets/ball_pattern.png",
    "endpoint": "/poke-checker",
    "modal": "",
},

{
    "title": "B12",
    "description": "A poetry chapbook for social climbers",
    "tags": ["poetry", "writing"],
    "thumbnail": "/assets/b12/b12cover.PNG",
    "endpoint": "",
    "modal": "b12",
},

{
    "title": "Best Delegate",
    "description": "A poetry chapbook for high performers",
    "tags": ["poetry", "writing"],
    "thumbnail": "/assets/bestdelegate/bestdelegatecover.PNG",
    "endpoint": "",
    "modal": "bestdelegate",
},
];

var worksTemplate = {
    "title": "",
    "description": "",
    "tags": [],
    "thumbnail": "",
    "endpoint": "",
    "modal": "",
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.render("index.ejs", { data: worksData })
});

app.get("/roller", (req, res) => {
    res.render("roller.ejs")
});

app.get("/poke-checker", (req, res) => {
    res.render("pokedex.ejs");
});

app.post("/", async (req, res) => {
    const searchTerm = req.body.pokemonName.toLowerCase();

    try {
        resetTemplates();
        const pokeType = await checkType(endpointName, searchTerm);
        var typeWeakness = await checkTypeWeaknesses(endpointType, pokeType.pTypes.pTypeOne);

        if (pokeType.pTypes.pTypeTwo !== "") {
            var typeWeaknessB = await checkTypeWeaknesses(endpointType, pokeType.pTypes.pTypeTwo);
            typeWeakness = mergeObjects(typeWeakness, typeWeaknessB);
        };

        const pokeWeaknesses = calculateVulnerability(vulnerabilityTemplate, typeWeakness);
        const pokeMultipliers = checkMultipliers(multiplierTemplate, pokeWeaknesses);

        res.render("pokedex.ejs", {
            typeData: pokeType,
            weaknessData: pokeWeaknesses,
            multiplierData: pokeMultipliers,
        });

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("pokedex.ejs", {
            errorMessage: error.message,
            errorStatus: error.response.status
        });
    }
});

app.listen(PORT, HOST);
console.log(`Application is listening on PORT ${PORT}:${HOST}`);

