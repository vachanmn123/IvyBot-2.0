const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const {parseString} = require('xml2js');
const axios = require('axios');
module.exports = {
  name: "realbooru", //the command name for the Slash Command
  description: "Send a pic/vid from realbooru", //the command description for Slash Command Overview
    cooldown: 1,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [	
		{"String": { name: "tags", description: "What do you want to search for?", required: true }}, //to use in the code: interacton.getString("ping_amount")
  ],
  run: async (client, interaction) => {
    try{
        if (!interaction.channel.nsfw) return interaction.reply("This channel is not marked as NSFW");
        const tags = interaction.options.get("tags");
        const url = `https://realbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=${tags.value}`;
        const res = await axios.get(url);
        if (!res.data[0]) return interaction.reply("No results found");
        res_data = res.data[Math.floor(Math.random() * res.data.length)]
        const embed = new MessageEmbed()
            .setColor("DARK_RED")
            .setTitle(`RealBooru`)
            .setDescription(`Tags: ${res_data.tags}`)
            .setAuthor({
                name: client.user.username,
                icon_url: client.user.avatarURL()
            })
        channel = interaction.channel;
        interaction.reply({embeds:[embed]});
        channel.send(`https://realbooru.com/images/${res_data.image.slice(0, 2)}/${res_data.image.slice(2, 4)}/${res_data.image}`);
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}
/**
  * @INFO
  * Bot Coded by vachanmn123
  * @INFO
  * Template by Tomato6966
*/
