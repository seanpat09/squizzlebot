function streamerHype(target, username, client) {
  const hypeMessages = [
    `${username} is my favorite stream in the Citadel`,
    `${username}, you are awesome!`,
    `${username}, you got this!`,
    `I love this game!`,
    `What is this game? I haven't seen it before, but it looks fun!`
  ];

  const result = Math.floor(Math.random() * hypeMessages.length);
  client.say(target, `${hypeMessages[result]}`);
}

function laughTrack(target, client) {
  const tracks = [
    "HA HA YOU ARE SO <LOADING COMPLIMENT>!",
    "@squizzleflip stop, I am not programmed to laugh this much",
    "cool story squizz"
  ];

  const result = Math.floor(Math.random() * tracks.length);

  client.say(target, tracks[result]);
}

function raidMessage(target, client) {
  client.say(
    target,
    " 👾SQUIZZLE RAID 👾 SQUIZZLE RAID 👾 SQUIZZLE RAID 👾 SQUIZZLE RAID 👾 SQUIZZLE RAID 👾 SQUIZZLE RAID 👾 SQUIZZLE RAID 👾 SQUIZZLE RAID 👾"
  );
}

exports.streamerHype = streamerHype;
exports.laughTrack = laughTrack;
exports.raidMessage = raidMessage;