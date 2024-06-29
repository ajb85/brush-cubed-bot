const { Client, GatewayIntentBits } = require("discord.js");
const getChannel = require("./getChannel");
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
    const turnsChannel = await getChannel(client, "turns");
    if (turnsChannel) {
      const messageData = await turnsChannel.messages.fetch({ limit: 1 });
      const message = messageData.first();
      const embed = await getEmbed(client);

      const embedData = { embeds: [embed] };
      if (!message) {
        await turnsChannel.send(embedData);
        console.info("Sent message");
      } else {
        await message.edit(embedData);
        console.info("Edited message");
      }

      // const generalChannel = await getChannel(client, "general", false);
      // if (generalChannel) {
      //   const tyson = await client.users.fetch(process.env.DISCORD_TYSON_ID);
      //   if (tyson) {
      //     generalChannel.send(
      //       `Confirmed Sons of the Forest has been loaded. Waiting for ${tyson.toString()} to start game.`
      //     );
      //   }
      // }
    }
    client.destroy();
  } catch (err) {
    console.error(`!!Server error: ${err.message}`);
    client.off();
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
