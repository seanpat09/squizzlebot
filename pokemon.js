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

let current 

  encounter(target, client) {
    const pokemon = this.getPokemon();
    client.say(target, `A wild ${pokemon} appeared!`);
  }
  
  getPokemon() {
    return pokeDex[Math.floor(Math.random() * pokeDex.length)];
  }
