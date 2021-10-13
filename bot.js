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
let highestRoll = -1;

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName.startsWith('!d')) {
    rollDice(target, commandName);
  } else {
    console.log(`* Unknown command ${commandName}`);
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
    `You rolled a ${result} with a ${sides} sided die The highest roll so far is ${higestRoll}`
  console.log(`* Executed ${commandName} command`); 
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
