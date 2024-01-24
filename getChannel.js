const { ChannelType } = require("discord.js");

module.exports = async function getChannel(
  client,
  name,
  createIfNotFound = true
) {
  const guildId = process.env.DISCORD_SERVER_ID;
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.error("Guild not found.");
    return null;
  } else {
    console.info("Found guild", guild.name);
  }

  // Find or create the "turns" channel
  let turnsChannel = guild.channels.cache.find(
    (channel) => channel.name === name
  );

  if (!turnsChannel && createIfNotFound) {
    try {
      turnsChannel = await guild.channels.create({
        name: "turns",
        type: ChannelType.GuildText,
      });
      console.log(`Created "turns" channel: ${turnsChannel.name}`);
    } catch (error) {
      console.error('Error creating "turns" channel:', error);
    }
  }

  if (turnsChannel) {
    return turnsChannel;
  } else return null;
};
