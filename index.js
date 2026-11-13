
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = process.env.CHANNEL_ID;
const TOKEN = process.env.DISCORD_TOKEN;

client.once("ready", () => {
  console.log(`STX BOT is online: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "test") {
    const channel = await client.channels.fetch(CHANNEL_ID);

    if (!channel || !channel.isTextBased()) {
      return interaction.reply({
        content: "لم أتمكن من الوصول إلى قناة النشر.",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#E62F4F")
      .setTitle("TEAM STX")
      .setDescription("تم تشغيل البوت بنجاح!")
      .addFields(
        { name: "الحالة", value: "متصل ويعمل", inline: true },
        { name: "القناة", value: "قناة نشر الفصول", inline: true }
      )
      .setTimestamp();

    await channel.send({ embeds: [embed] });

    await interaction.reply({
      content: "تم إرسال رسالة الاختبار بنجاح.",
      ephemeral: true
    });
  }
});

client.login(TOKEN);
