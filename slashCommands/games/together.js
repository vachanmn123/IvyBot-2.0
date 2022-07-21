const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "together", //the command name for the Slash Command
  description: "Use the discord together features", //the command description for Slash Command Overview
  cooldown: 1,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!	
    {"StringChoices": { name: "activity_name", description: "Which activity do you want to use?", required: true, choices: [
        ['youtube', 'youtube'], 
        ['youtubedev', 'youtubeDev'], 
        ['poker', 'poker'], 
        ['chess', 'chess'], 
        ['checkers', 'checkers'], 
        ['chessdev', 'chessDev'], 
        ['betreyal', 'betreyal'], 
        ['fishing', 'fishing'],
        ['lettertile', 'lettertile'],
        ['wordsnack', 'wordsnack'],
        ['sketchheads', 'sketchheads'],
        ['spellcast', 'spellcast'],
        ['awkword', 'awkword'],
        ['puttparty', 'puttParty'],
        ['landio', 'landIo'],
        ['blazing8s', 'blazing8s'],
        ['letterleague', 'letterLeague']
    ]}},
    {"Channel": { name: "select_channel", description: "the channel to start activity, if none is provided then the VC you are in", required: false }}, //to use in the code: interacton.getChannel("what_channel")

  ],
  run: async (client, interaction) => {
    try{
        const {options} = interaction;
        if (options.getChannel("select_channel")) {
            channel = options.getChannel("select_channel").id;
        } else channel = interaction.author.voice.channel.id;
        if (!channel) return interaction.reply("You need to join a Voice channel or select one.")
        const inv = await client.discordTogether.createTogetherCode(
                    channel,
                    options.getString("activity_name")
                )
        const emb = new MessageEmbed()
            .setColor('#FFC0CB')
            .setTitle(`Discord Together - ${options.getString('activity_name')}`)
            .setDescription(
                `[Link](${inv.code})`
            )
        interaction.reply({embeds: [emb]})
    } catch (e) {
        interaction.reply(`An error occured \n \`\`\`e\`\`\``)
        console.log(String(e.stack).bgRed)
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
