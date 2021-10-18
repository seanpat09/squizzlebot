const tmi = require("tmi.js");

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

const client = new tmi.client(opts);

function initSquizzleBot() {
  client.on("message", onMessageHandler);
  client.on("connected", onConnectedHandler);

  // Connect to Twitch:
  client.connect();
}

function onMessageHandler(target, userstate, msg, self) {
  if (self) {
    return;
  } 
}

function onConnectedHandler() {
    client.say(
    "#squizzleflip", "TESTING SQUIZZLE mk2 BOT"
  );
}

exports.initSquizzleBot = initSquizzleBot;