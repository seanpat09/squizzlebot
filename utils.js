function isMod(user, channel) {
  let isMod = user.mod || user["user-type"] === "mod";
  let isBroadcaster = channel.slice(1) === user.username;
  let isSquizzle = user.username === "squizzleflip";
  return isMod || isBroadcaster || isSquizzle;
}

function addNewUser(username, db) {
  const newUser = { username: username, points: 100 };
  db.get("users")
    .push(newUser)
    .write();
  console.log("New user inserted in the database");
  return newUser;
}

exports.isMod = isMod;
exports.addNewUser = addNewUser;