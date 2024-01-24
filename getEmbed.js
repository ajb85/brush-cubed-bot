const { EmbedBuilder } = require("discord.js");
const getNextUserObject = require("./getNextUserObject");
const getEmbedDescription = require("./getEmbedDescription");

module.exports = async function getEmbed(client) {
  const embed = new EmbedBuilder();
  const user = await getNextUserObject(client);
  if (!user) {
    throw new Error("Did not get a user ID");
  }

  embed
    .setColor(user.accentColor || "#240957")
    .setTitle("Brush Cubed Gaming Night")
    .setDescription(getEmbedDescription())
    .addFields({
      name: "Game(s) Picked By:",
      value: user.username,
      inline: true,
    });

  if (user.avatarUrl) {
    embed.setThumbnail(user.avatarUrl);
  }

  return embed;
};
