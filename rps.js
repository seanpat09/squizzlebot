const utils = require("./utils.js");

function rockPaperScissors(target, commandName, userstate, client, db) {
  const userThrow = commandName.split(" ")[1];
  const throws = ["rock", "paper", "scissors"];

  if (!throws.includes(userThrow)) {
    client.say(
      target,
      `${userThrow} is not a rock, a paper, or a scissor BOP BOP BOP`
    );

    return;
  }

  let player = db
    .get("users")
    .find({ username: userstate.username })
    .value();
  if (!player) {
    player = utils.addNewUser(userstate.username, db);
  }

  const result = Math.floor(Math.random() * 3);

  let botThrow = throws[result];

  //from the perspective of the bot
  let matchResult;

  if (botThrow === "rock") {
    if (userThrow === "scissors") {
      matchResult = "win";
    } else if (userThrow === "paper") {
      matchResult = "lose";
    } else if (userThrow === "rock") {
      matchResult = "tie";
    }
  } else if (botThrow === "scissors") {
    if (userThrow === "scissors") {
      matchResult = "tie";
    } else if (userThrow === "paper") {
      matchResult = "win";
    } else if (userThrow === "rock") {
      matchResult = "lose";
    }
  } else if (botThrow === "paper") {
    if (userThrow === "scissors") {
      matchResult = "lose";
    } else if (userThrow === "paper") {
      matchResult = "tie";
    } else if (userThrow === "rock") {
      matchResult = "win";
    }
  }

  let winMessage;
  if (matchResult === "win") {
    winMessage = "I win! Let's play again!";
    db.get("users")
      .find({ username: userstate.username })
      .assign({ points: player.points-- });
  } else if (matchResult === "lose") {
    winMessage =
      "I lose... INCONCEIVABLE! Why was I programmed to feel sadness?";
    db.get("users")
      .find({ username: userstate.username })
      .assign({ points: player.points++ });
  } else {
    winMessage = "A tie! It seems that we are at an impasse...";
  }

  client.say(
    target,
    `I threw ${botThrow}, ${userstate.username} threw ${userThrow}. ${winMessage} ${userstate.username} now has ${player.points} points`
  );
}

exports.rockPaperScissors = rockPaperScissors;