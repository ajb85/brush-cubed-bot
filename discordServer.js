const { Client, GatewayIntentBits } = require("discord.js");
const getTurnsChannel = require("./getTurnsChannel");
const getEmbed = require("./getEmbed");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", async () => {
  try {
    console.info(`Logged in as ${client.user.tag}`);
    const turnsChannel = await getTurnsChannel(client);
    if (turnsChannel) {
      const messageData = await turnsChannel.messages.fetch({ limit: 1 });
      const message = messageData.first();

      const embed = await getEmbed(client);
      if (!message) {
        await turnsChannel.send({ embeds: [embed] });
      } else {
        message.edit({ embeds: [embed] });
      }
    }
  } catch (err) {
    console.error(`!!Server error: ${err.message}`);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
