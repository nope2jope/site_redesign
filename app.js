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
    "spread": []
},

{
    "title": "plant 300!",
    "description": "A poetry chapbook for romantics",
    "tags": ["poetry", "writing"],
    "thumbnail": "/assets/plant300/plant300cover.PNG",
    "endpoint": "",
    "modal": "plant300",
    "spread": ["assets/plant300/plant300cover.png",
        "assets/plant300/plant300backcover.png",
        "assets/plant300/plant300plate.png",
        "assets/plant300/plant300_01.png",
        "assets/plant300/plant300_02.png",
        "assets/plant300/plant300_03.png",
        "assets/plant300/plant300_04.png",
        "assets/plant300/plant300_05.png",
        "assets/plant300/plant300_06.png",
        "assets/plant300/plant300_07.png",
        "assets/plant300/plant300_08.png",
        "assets/plant300/plant300_09.png",
        "assets/plant300/plant300_10.png",
        "assets/plant300/plant300_11.png",
        "assets/plant300/plant300_12.png",
        "assets/plant300/plant300_13.png",
        "assets/plant300/plant300_14.png",
        "assets/plant300/plant300_15.png",
        "assets/plant300/plant300_16.png",
        "assets/plant300/plant300_17.png",
        "assets/plant300/plant300_18.png",
        "assets/plant300/plant300_19.png",
        "assets/plant300/plant300_20.png",
    ]
},

{
    "title": "Poke Checker",
    "description": "PokeAPI-integrated match-up checker",
    "tags": ["web development", "javascript"],
    "thumbnail": "/assets/ball_pattern.png",
    "endpoint": "/poke-checker",
    "modal": "",
    "spread": []
},

{
    "title": "B12",
    "description": "A poetry chapbook for social climbers",
    "tags": ["poetry", "writing"],
    "thumbnail": "/assets/b12/b12cover.PNG",
    "endpoint": "",
    "modal": "b12",
    "spread": ["assets/b12/b12cover.png",
        "assets/b12/b12backcover.png",
        "assets/b12/b12plate.png",
        "assets/b12/b12_01.png",
        "assets/b12/b12_02.png",
        "assets/b12/b12_03.png",
        "assets/b12/b12_04.png",
        "assets/b12/b12_05.png",
        "assets/b12/b12_06.png",
        "assets/b12/b12_07.png",
        "assets/b12/b12_08.png",
        "assets/b12/b12_09.png",
        "assets/b12/b12_10.png",
        "assets/b12/b12_11.png",
        "assets/b12/b12_12.png",
        "assets/b12/b12_13.png",
        "assets/b12/b12_14.png",
        "assets/b12/b12_15.png",
        "assets/b12/b12_16.png",
        "assets/b12/b12_17.png",
        "assets/b12/b12_18.png",
        "assets/b12/b12_19.png",
    ]
},

{
    "title": "Best Delegate",
    "description": "A poetry chapbook for high performers",
    "tags": ["poetry", "writing"],
    "thumbnail": "/assets/bestdelegate/bestdelegatecover.PNG",
    "endpoint": "",
    "modal": "bestdelegate",
    "spread": ["assets/bestdelegate/bestdelegatecover.png",
        "assets/bestdelegate/bestdelegatebackcover.png",
        "assets/bestdelegate/bestdelegateplate.png",
        "assets/bestdelegate/bestdelegate_01.png",
        "assets/bestdelegate/bestdelegate_02.png",
        "assets/bestdelegate/bestdelegate_03.png",
        "assets/bestdelegate/bestdelegate_04.png",
        "assets/bestdelegate/bestdelegate_05.png",
        "assets/bestdelegate/bestdelegate_06.png",
        "assets/bestdelegate/bestdelegate_07.png",
        "assets/bestdelegate/bestdelegate_08.png",
        "assets/bestdelegate/bestdelegate_09.png",
        "assets/bestdelegate/bestdelegate_10.png",
        "assets/bestdelegate/bestdelegate_11.png",
        "assets/bestdelegate/bestdelegate_12.png",
        "assets/bestdelegate/bestdelegate_13.png",
        "assets/bestdelegate/bestdelegate_14.png",
        "assets/bestdelegate/bestdelegate_15.png",
        "assets/bestdelegate/bestdelegate_16.png",
        "assets/bestdelegate/bestdelegate_17.png",
        "assets/bestdelegate/bestdelegate_18.png",
        "assets/bestdelegate/bestdelegate_19.png",
    ]
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

