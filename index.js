import express from 'express';
import path from 'path';
const app = express();
const __dirname=path.resolve(path.dirname(''));
const port=3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))

const pokedex =[
    {
        id:1,
        name: "Bulbasaur",
        img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        description:"There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        type:"Grass"
    },
    {
        id:2,
        name: "Ivysaur",
        img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
        description:"When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
        type:"Grass"
    },
    {
        id:3,
        name: "Venusaur",
        img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
        description:"Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
        type:"Grass"
    },
    
]

//rotas
app.get('/', (req, res) => {
  res.render('index',{pokedex});
});

app.listen(port, ()=>console.log(`Servidor rodando na porta http://localhost:${port} `));