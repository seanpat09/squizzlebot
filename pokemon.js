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

const encounter = (target, client) => {
    currentTrainers = new Set();
    currentPokemon = getPokemon();
    client.say(target, `A wild ${currentPokemon} appeared! Use !pokeball to catch it for the next 30 seconds!`);
    setTimeout(
       () => attemptCatch(target, client),
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

const attemptCatch = (target, client) => {
  //For each pokeball, there is a 5% chance of catching the pokemon
  let pokeballPlural = currentTrainers.size === 1 ? "Poke Ball" : "Poke Balls";
  
  let chance = (1 - Math.pow(MISS_RATE, currentTrainers.size)) * 100;
  
  let roll = Math.floor(Math.random() * 100);
  
  console.log(chance, roll);
  
  if(chance > roll) {
    client.say(target, `Community threw ${currentTrainers.size} ${pokeballPlural}. We caught ${currentPokemon}!`);
  } else {
    client.say(target, `Community threw ${currentTrainers.size} ${pokeballPlural}. ${currentPokemon} got away!`);
  }
  
  currentPokemon = null;
  currentTrainers = new Set();
}
  
function getPokemon() {
  return pokeDex[Math.floor(Math.random() * pokeDex.length)];
}

exports.encounter = encounter;
exports.handlePokeball = handlePokeball;