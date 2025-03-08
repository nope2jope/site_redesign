import express from "express";
import { endpointName, endpointType, vulnerabilityTemplate, multiplierTemplate, resetTemplates, checkType, checkTypeWeaknesses, mergeObjects, calculateVulnerability, checkMultipliers } from "./public/scripts/pokedex.js";
import  {wData} from "./public/scripts/works-data.js";

const PORT = 8000;
const HOST = '0.0.0.0';

const app = express();

const worksData = wData;
;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/about", (req, res) => {
    res.render("about.ejs")
});

app.get("/works", (req, res) => {
    res.render("works.ejs", { data: worksData })
})

app.get("/roller", (req, res) => {
    res.render("roller.ejs")
});

app.get("/poke-checker", (req, res) => {
    res.render("pokedex.ejs");
});

app.post("/poke-checker", async (req, res) => {
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

