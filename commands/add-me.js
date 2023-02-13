const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('add-me')
        .setDescription('Adds user who executed command to the scoredb folder.'),
    async execute(interaction)
    {
        if (fs.existsSync(`./scoredb/${interaction.user.id}/`)) return interaction.reply("You are already in the database.");
        for (i = 0; i < 7; i++)
        {
            fs.mkdirSync(`./scoredb/${interaction.user.id}/${i+1}scores`, { recursive: true });
        }
        console.log(`${interaction.user.id} got added to the score database.`);
        interaction.reply("You got added to the score successfully.");
    }
};
