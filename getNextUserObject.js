const getNextTurnUserId = require("./getNextTurnUserId");

module.exports = async function getNextUserObject(client, date, skip) {
  const userId = getNextTurnUserId(date, skip);

  if (!userId) {
    throw new Error("No user ID returned");
  }

  const user = await client.users.fetch(userId);

  if (!user) {
    throw new Error("User ID not found in server");
  }

  return {
    username: user.displayName,
    avatarUrl: user.displayAvatarURL(),
    accentColor: user.accentColor,
  };
};
