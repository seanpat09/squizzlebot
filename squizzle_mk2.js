const tmi = require("tmi.js");
const utils = require("./utils.js");

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
  //mk2client.on("join", onJoinHandler);
  // Connect to Twitch:
  mk2client.connect();
}

function onMessageHandler(target, userstate, msg, self) {
  if (self) {
    return;
  }
  
  const commandName = msg.trim();

  if (commandName.startsWith("!shoutout")) {
    shoutOut(target, commandName, userstate);
  }
}

function onConnectedHandler() {
  // mk2client.say(
  //   "#squizzleflip",
  //   "SQUIZZLE BOT ONLINE. INITIATING WELCOME WAGON PROTOCOL!"
  // );
}

function onJoinHandler(channel, username, self) {
  mk2client.say("#squizzleflip", `Welcome in ${username}`);
}

function shoutOut(target, command, userstate) {
  let username = command.split(" ")[1];
  if(utils.isMod(userstate, target) && username) {
    mk2client.say(target, `Check and follow ${username} at https://twitch.com/${username}`);
  }
}

exports.initSquizzleBot = initSquizzleBot;
