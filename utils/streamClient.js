const { StreamClient } = require("@stream-io/node-sdk");
const config = require("../config/config");

async function createUser(name, userId) {
  client = new StreamClient(config.streamApiKey, config.streamSecret, {
    timeout: 3000,
  });

  const newUser = {
    id: String(userId),
    role: "user",
    name: name,
    image: null,
  };

  await client.upsertUsers({
    users: {
      [String(newUser.id)]: newUser,
    },
  });
}

function createToken(userId) {
  client = new StreamClient(config.streamApiKey, config.streamSecret, {
    timeout: 3000,
  });

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  return client.createToken(String(userId), exp);
}

module.exports = { createUser, createToken };
