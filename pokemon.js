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

let currentPokemon;
let currentThrowers;

const encounter = (target, client) => {
    currentThrowers = new Set();
    currentPokemon = getPokemon();
    client.say(target, `A wild ${currentPokemon} appeared!`);
  };

const handlePokeball = (username) => {
  currentThrowers.add(username);
}

const attemptCatch = (target, client) => {
  //For each pokeball, there is a 5% chance of catching the pokemon
  let pokeballPlural = currentThrowers.size > 1 ? "Poke Balls" : "Poke Ball";
  
  let chance = [...currentThrowers].reduce(x => !mySet2.has(x)))

  client.say(target, `Community threw ${currentThrowers.size} ${pokeballPlural}`);
  //Calculate chance of catching
  //Communicate if caught
  //If caught, store pokemon
  //Else, say it got away!
}
  
function getPokemon() {
  return pokeDex[Math.floor(Math.random() * pokeDex.length)];
}

exports.encounter = encounter;

/*
cache the current pokemon done!
cache who is throwing 
handle throws
if successfully caught store pokemon
*/