const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName('start-session')
        .setDescription('Starts a new speedsolving session.'),
    async execute(interaction)
    {
        console.log(interaction.user.id);
        
    }
};
