const tmi = require("tmi.js");
const pokebot = require("./pokemon.js");
const utils = require("./utils.js");
const hype = require("./hype.js");
const rps = require("./rps.js");

// Define configuration options
const opts = {
  identity: {
    username: process.env.MK1_USERNAME,
    password: process.env.MK1_OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync(".data/db.json");
var db = low(adapter);
db.defaults(
  { users: [] },
  { pokemon: [] }
).write();

// Create a client with our options
const client = new tmi.client(opts);
let highestRoll = 0;
let diceLock;

function initSquizzleBot() {
  // Register our event handlers (defined below)
  client.on("message", onMessageHandler);
  client.on("connected", onConnectedHandler);

  // Connect to Twitch:
  client.connect();
}

// Called every time a message comes in
function onMessageHandler(target, userstate, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName.startsWith("!d")) {
    rollDice(target, commandName);
  } else if (commandName === "!resetDie") {
    resetDie(target, userstate);
  } else if (commandName.startsWith("!lock")) {
    lockDice(target, commandName);
  } else if (commandName === "!roll") {
    rollLockedDice(target);
  } else if (commandName === "!laughTrack") {
    hype.laughTrack(target, client);
  } else if (commandName === "say thank you, squizzle bot!") {
    client.say(target, '"Thank you squizzle bot!"');
  } else if (commandName.startsWith("!throw")) {
    rps.rockPaperScissors(target, commandName, userstate, client, db);
  } else if (commandName === "!streamerHype") {
    hype.streamerHype(target, userstate.username, client);
  } else if (commandName === "!resetDb") {
    resetDb(target, userstate);
  } else if (commandName === "!raidMsg") {
    hype.raidMessage(target, client);
  } else if (commandName === "!encounter") {
    if (utils.isMod(userstate, target)) {
      pokebot.encounter(target, client);
    }
  } else if (commandName === "!pokeball") {
    pokebot.handlePokeball(userstate.username, target, client);
  } else if (commandName === "!testing") {
    if (utils.isMod(userstate, target)) {
      client.say(target, "testing 324");
    }
  }
}

function resetDb(target, userstate) {
  if (!utils.isMod(userstate, target)) {
    return;
  }
  db.get("users")
    .remove()
    .write();
  console.log("Database cleared");
  client.say(target, "Database cleared");
}

function resetDie(target, userstate) {
  console.log(userstate, target);
  if (utils.isMod(userstate, target)) {
    highestRoll = 0;
    client.say(
      target,
      `The die has been reset. The highest roll so far is ${highestRoll}`
    );
  } else {
    client.say(
      target,
      "BOP BOP BOP Only mods or the broadcaster can reset the die!"
    );
  }
}

// Function called when the "dice" command is issued
function rollDice(target, commandName) {
  const regex = /!d\d{1,3}\b/g;
  const found = commandName.match(regex);

  const sides = parseInt(found[0].replace("!d", ""), 10);

  const result = Math.floor(Math.random() * sides) + 1;

  if (result > highestRoll) {
    highestRoll = result;
  }

  client.say(
    target,
    `You rolled a ${result} with a ${sides} sided die. The highest roll so far is ${highestRoll}`
  );
  console.log(`* Executed ${commandName} command`);
}

function lockDice(target, commandName) {
  const regex = /!lock\d{1,3}\b/g;
  const found = commandName.match(regex);

  const sides = parseInt(found[0].replace("!lock", ""), 10);

  diceLock = sides;
  client.say(target, `Die locked to ${sides} sides. Roll for success!`);
}

function rollLockedDice(target) {
  const result = Math.floor(Math.random() * diceLock) + 1;

  client.say(target, `You rolled a ${result} with a ${diceLock} sided die.`);
}



// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  setInterval(() => {
    hype.streamerHype("#squizzleflip", "squizzleflip", client);
  }, 300000);

  setInterval(() => {
    pokebot.encounter("#squizzleflip", client, db);
  }, 180000);

  // client.say(
  //   "#squizzleflip",
  //   "SQUIZZLE BOT ONLINE. PROTOCOL 3: HYPE THE STREAMER"
  // );
  console.log(`* Connected to ${addr}:${port}`);
}


exports.initSquizzleBot = initSquizzleBot;
