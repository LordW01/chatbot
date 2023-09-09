const { SlashCommandBuilder, ChannelType, EmbedBuilder, Colors, PermissionFlagsBits } = require("discord.js")
const { Hercai } = require("hercai")
const hercaiClient = new Hercai()
module.exports = {
        data: new SlashCommandBuilder()
        .setName('resimçiz')
        .setDescription("Resim Çizer")
        .addStringOption(option => option.setName("resim").setDescription("Resimi Yazın").setRequired(true)),
        async execute(client, interaction) {
                const embed = new EmbedBuilder()
                .setTitle("Resim Çiziliyor")
                .setDescription("Lütfen Bekleyiniz...")
                .setColor(Colors.Blue)
                await interaction.reply({ embeds: [embed] })
                await hercaiClient.drawImage({model:"v2-beta",prompt:interaction.options.getString("resim")}).then(async (response) => {
                        const embed = new EmbedBuilder()
                        .setTitle("Resim Çizildi")
                        .setDescription("Resim Aşağıdadır.")
                        .setColor(Colors.Green)
                        .setImage(response.url)
                        await interaction.editReply({ embeds: [embed] })
                })
        },
};