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

const CATCH_RATE = 0.95;

let currentPokemon;
let currentThrowers;

const encounter = (target, client) => {
    currentThrowers = new Set();
    currentPokemon = getPokemon();
    client.say(target, `A wild ${currentPokemon} appeared!`);
    setTimeout(
       () => attemptCatch(target, client),
       3000
    )
  };

const handlePokeball = (username) => {
  currentThrowers.add(username);
}

const attemptCatch = (target, client) => {
  //For each pokeball, there is a 5% chance of catching the pokemon
  let pokeballPlural = currentThrowers.size === 1 ? "Poke Ball" : "Poke Balls";
  
  let chance = 1 - Math.pow(CATCH_RATE, currentThrowers.size);
  
  let roll = Math.floor(Math.random() * 100);
  
  if(chance > roll) {
    client.say(target, `Community threw ${currentThrowers.size} ${pokeballPlural}. We caught ${currentPokemon}!`);
  } else {
    client.say(target, `Community threw ${currentThrowers.size} ${pokeballPlural}. ${currentPokemon} got away!`);
  }
}
  
function getPokemon() {
  return pokeDex[Math.floor(Math.random() * pokeDex.length)];
}

exports.encounter = encounter;
