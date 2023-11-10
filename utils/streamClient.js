const { StreamClient } = require("@stream-io/node-sdk");
const config = require("../config/config")


async function createUser(name, userId) {
    client = new StreamClient(config.streamApiKey, config.streamSecret, { timeout: 3000 });

    const newUser = {
        id: userId,
        role: 'user',
        name: name,
        image: null
      };

      await client.upsertUsers({
        users: {
          [newUser.id]: newUser,
        },
    });

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    client.createToken(userId, exp);
}

function createToken(userId){
    client = new StreamClient(config.streamApiKey, config.streamSecret, { timeout: 3000 });

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    client.createToken(userId, exp);
}

module.exports = {createUser, createToken}