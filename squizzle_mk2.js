const tmi = require("tmi.js");

// Define configuration options
const opts = {
  identity: {
    username: process.env.MK2_USERNAME,
    password: process.env.MK2_OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

const mk2client = new tmi.client(opts);
console.log(opts.identity.username);

function initSquizzleBot() {
  mk2client.on("message", onMessageHandler);
  mk2client.on("connected", onConnectedHandler);
  mk2client.on("join", onJoinHandler);
  // Connect to Twitch:
  mk2client.connect();
}

function onMessageHandler(target, userstate, msg, self) {
  if (self) {
    return;
  }
}

function onConnectedHandler() {
  mk2client.say(
    "#squizzleflip",
    "SQUIZZLE BOT ONLINE. INITIATING WELCOME WAGON PROTOCOL!"
  );
}

function onJoinHandler(channel, username, self) {
  mk2client.say("#squizzleflip", `Welcome in ${username}`);
}

exports.initSquizzleBot = initSquizzleBot;
