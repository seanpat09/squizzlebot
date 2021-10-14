const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME,
    "bobaskoro"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);
let highestRoll = 0;
let diceLock;

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, userstate, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName.startsWith('!d')) {
    rollDice(target, commandName);
  } else if(commandName === "!resetDie") {
    resetDie(target, userstate);
  } else if (commandName.startsWith('!lock')) {
    lockDice (target, commandName)
  } else if (commandName === "!roll") {
    rollLockedDice(target);
  } else if (commandName === "!laughTrack") {
    laughTrack(target);
  } else if (commandName === "!ashctuually") {
        client.say(
      target,
        "well ashctuually it was frankenstein's monster"
    )
  } else if (commandName === ("!thanks")) {
    client.say(
      target,
        "Thank you squizzle bot!");
  } else if (commandName === ("!boRaid")) {
    
    client.say(
      target,
        `SingsMic Bobaskoro Raid KAPOW Bobaskoro Raid SingsNote Bobaskoro Raid SingsMic`);

  }
}

function resetDie(target, userstate) {
  console.log(userstate, target);
  if(isMod(userstate, target)) {
    highestRoll = 0;
    client.say(
        target,
        `The die has been reset. The highest roll so far is ${highestRoll}`
    );
  } else {
    client.say(
      target,
        "BOP BOP BOP Only mods or the broadcaster can reset the die!"
    )
  }
}

// Function called when the "dice" command is issued
function rollDice (target, commandName) {
  const regex = /!d\d{1,3}\b/g;
  const found = commandName.match(regex);

  const sides = parseInt(found[0].replace("!d",""), 10);
  
  const result = Math.floor(Math.random() * sides) + 1;
  
  if(result > highestRoll) {
    highestRoll = result;
  }
  
  client.say(
    target,
    `You rolled a ${result} with a ${sides} sided die. The highest roll so far is ${highestRoll}`);
  console.log(`* Executed ${commandName} command`); 
}

function lockDice (target, commandName) {
  const regex = /!lock\d{1,3}\b/g;
  const found = commandName.match(regex);

  const sides = parseInt(found[0].replace("!lock",""), 10);
  
  diceLock = sides;
  client.say(
    target,
    `Die locked to ${sides} sides. Roll for success!`);
}

function rollLockedDice(target) {
  const result = Math.floor(Math.random() * diceLock) + 1;
  
  client.say(
    target,
    `You rolled a ${result} with a ${diceLock} sided die.`);
}

function laughTrack(target) {
  const tracks = [
    "HA HA YOU ARE SO <LOADING COMPLIMENT>!",
    "@squizzleflip stop, I am not programmed to laugh this much",
    "cool story squizz"
  ];
  
  const result = Math.floor(Math.random() * tracks.length);
  
  client.say(
    target,
    tracks[result]
  );
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function isMod(user, channel){
  let isMod = user.mod || user['user-type'] === 'mod';
  let isBroadcaster = channel.slice(1) === user.username;
  let isSquizzle = user.username === "squizzleflip";
  return isMod || isBroadcaster || isSquizzle;
}

function rockPaperScissors() {
  
}

