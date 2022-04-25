import express from 'express';
import path from 'path';
const app = express();
const __dirname=path.resolve(path.dirname(''));
const port=process.env.PORT || 3000;
let message = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true})) // O corpo (body) da requisição
app.use(express.json()) // converter para JSON

const pokedex =[
    {
        id:1,
        number:1,
        name: "Bulbasaur",
        type:"Grass",
        img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        description:"There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        height:"0.7 m",
        weight:"6.9 kg",
        category:"Seed",
        ability:"Overgrow"

    },
    {
        id:2,
        number:2,
        name: "Ivysaur",
        type:"Grass",
        img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
        description:"When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
        height:"1 m",
        weight:"13 kg",
        category:"Seed",
        ability:"Overgrow"
    },
    {
        id:3,
        number:3,
        name: "Venusaur",
        type:"Grass",
        img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
        description:"Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
        height:"2 m",
        weight:"100 kg",
        category:"Seed",
        ability:"Overgrow"
    }    
];
let element;
let pokemonEdit;

//rotas
app.get('/', (req, res) => {
    setTimeout(() => {
        message = "";
      }, 1000);

    res.render('index.ejs',{
      pokedex, message
    });
});

app.get('/register', (req, res) => {
    res.render('register.ejs', {
        message
    });
});

app.post('/register', (req, res) => {
    const value = pokedex[pokedex.length-1].id + 1
    const { number, name, type, img, description, height, weight, category, ability  } = req.body;
    pokedex.push({id: value, number, name, type, img, description, height, weight, category, ability});
    message = `Pokémon successfully registered !`;
    res.redirect("/");
});

app.get('/details', (req, res) => {
    res.render('details.ejs',{
      pokedex,element,message
    });
});

app.get('/details/:id', (req, res) => {
    let pokemon=[];
    pokedex.filter((element)=>{
        if(element.id==req.params.id){
            pokemon[0]=element
        }
    });
    res.render('details.ejs',{
        pokemon,message
    });
});

app.get('/edit/:id', (req, res) => {
    pokemonEdit=[];
    pokedex.filter((element)=>{
        if(element.id==req.params.id){
            pokemonEdit[0]=element
        }
    });
    res.render('editPokemon.ejs',{
        pokemonEdit,message
    });
});

app.post('/edit/:id', (req, res) => {
    const value = pokedex[pokemonEdit[0].id-1].id
    const { number, name, type, img, description, height, weight, category, ability  } = req.body;
    pokedex[pokemonEdit[0].id-1]={id: value, number, name, type, img, description, height, weight, category, ability};
    message = `Pokémon successfully edited !`;
    res.redirect("/");
});

app.get('/remove/:id', (req, res) => {
    pokedex.filter((element)=>{
        if(element.id==req.params.id){
            pokedex.splice(req.params.id-1,1);
            for(let i in pokedex){
                pokedex[i].id=Number(i)+1
            }
            message = `Pokémon successfully removed !`;
        }
    });
    res.redirect("/");
});

app.listen(port, ()=>console.log(`Server function in http://localhost:${port} `));        