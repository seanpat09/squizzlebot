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

const encounter = (target, client) => {
    const pokemon = getPokemon();
    client.say(target, `A wild ${pokemon} appeared!`);
  };
  
function getPokemon() {
  return pokeDex[Math.floor(Math.random() * pokeDex.length)];
}

exports.encounter = encounter;