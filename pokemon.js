const pokeDex = [
  "Pidgey",
  "Rattata",
  "Caterpie",
  "Weedle",
  "Nidoran ♀",
  "Nidoran ♂",
  "Diglett",
  "Dugtrio",
  "Spearow",
  "Sandshrew",
  "Jigglypuff",
  "Mankey",
  "Squirtle",
  "Charmander",
  "Bulbasaur",
  "Pikachu"
];

const MISS_RATE = 0.95;

let currentPokemon;
let currentTrainers;

const encounter = (target, client, db) => {
    currentTrainers = new Set();
    currentPokemon = getPokemon();
    client.say(target, `A wild ${currentPokemon} appeared! Use !pokeball to catch it for the next 30 seconds!`);
    setTimeout(
       () => attemptCatch(target, client, db),
       30000
    )
  };

const handlePokeball = (username, target, client) => {
  if(currentPokemon) {
    currentTrainers.add(username);  
  } else {
    client.say(target, "BOP BOP BOP there are no pokemon to catch!");
  }
}

const attemptCatch = (target, client, db) => {
  //For each pokeball, there is a 5% chance of catching the pokemon
  let pokeballPlural = currentTrainers.size === 1 ? "Poke Ball" : "Poke Balls";
  
  let chance = (1 - Math.pow(MISS_RATE, currentTrainers.size)) * 100;
  
  let roll = Math.floor(Math.random() * 100);
  
  console.log(chance, roll);
  
  const isCaught = chance > roll;
  
  if(isCaught) {
    client.say(target, `Community threw ${currentTrainers.size} ${pokeballPlural}. We caught ${currentPokemon}!`);
    storePokemon(currentPokemon, db)
    
  } else {
    client.say(target, `Community threw ${currentTrainers.size} ${pokeballPlural}. ${currentPokemon} got away!`);
  }
  
  currentPokemon = null;
  currentTrainers = new Set();
}
  
function getPokemon() {
  return pokeDex[Math.floor(Math.random() * pokeDex.length)];
}

function storePokemon(pokeName, db) {
  let entry = {
    type: pokeName,
    caught_date: new Date(),
    nickname: ""
  };
  db.get("pokemon")
    .push(entry)
    .write();
  console.log("New pokemon inserted in the database");
}

function pokedex(target, client, db) {
  console.log(db.get("pokemon"));
}

exports.encounter = encounter;
exports.handlePokeball = handlePokeball;
exports.pokedex = pokedex;