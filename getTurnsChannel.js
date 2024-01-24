const { ChannelType } = require("discord.js");

module.exports = async function getTurnsChannel(client) {
  const guildId = process.env.DISCORD_SERVER_ID;
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.error("Guild not found.");
    return null;
  }

  // Find or create the "turns" channel
  let turnsChannel = guild.channels.cache.find(
    (channel) => channel.name === "turns"
  );

  if (!turnsChannel) {
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
