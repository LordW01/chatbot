const { Events, EmbedBuilder, Colors, PermissionFlagsBits } = require('discord.js');
const axios = require("axios")
const config = require("../config.js")

module.exports = {
	name: Events.MessageCreate,
	once: false,
	async execute(message) {
		if (message.author.bot) return;
		if (!message.mentions.has(config.id) || message.content.includes("@everyone") || message.content.includes("@here")) return
        await message.channel.sendTyping()
		const editedmsg = await message.content.replaceAll(config.id, "")
		await axios.get(`https://apis-h9h8.onrender.com/apis/chatbot/v1/?message=${editedmsg.toString()}`).then(async (response) => {
			await message.reply(response.data.reply)
		})
	},
};