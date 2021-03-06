const { MessageEmbed, Client } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const axios = require('axios');
module.exports = {
  name: "paranoia", //the command name for the Slash Command
  description: "Gives a Paranoia question", //the command description for Slash Command Overview
  cooldown: 1,
  memberpermissions: [], 
  requiredroles: [], 
  alloweduserids: [], 
  options: [
		{"StringChoices": { name: "rating", description: "What rating do you want?", required: false, choices: [["pg", "pg"], ["pg13", "pg13"], ["r", "r"]] }}, 
        {"User": { name: "user", description: "The reciever who will get the question", required: false }},
  ],
  run: async (client, interaction) => {
    try{
        const res = await axios.get(`https://api.truthordarebot.xyz/v1/paranoia?rating=${interaction.options.get("rating")? interaction.options.get("rating").value : "pg"}`);
        const embed = new MessageEmbed()
            .setColor("#ffff00")
            .setTitle("Paranoia question")
            .setDescription(res.data.question)
            .setTimestamp()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.avatarURL(),
            })
            .setFooter({text:`Rating: ${res.data.rating}`})
        if(interaction.options.get("user")){
            interaction.reply({content: `This one is for <@${interaction.options.get("user").user.id}>`, embeds: [embed]})
        } else {
            interaction.reply({embeds: [embed]})
        }
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}
/**
  * @INFO
  * Bot coded by vachanmn123 | http://github.com/vachanmn123/
  * @INFO
  * Bot template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
*/
