const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);
let highestRoll = 0;

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
  }
  else {
    console.log(`* Unknown command ${commandName}`);
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

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function isMod(user, channel){
  let isMod = user.mod || user['user-type'] === 'mod';
  let isBroadcaster = channel.slice(1) === user.username;
  //return isMod || isBroadcaster;
  return false;
}
