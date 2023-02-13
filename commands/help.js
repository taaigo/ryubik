const { SlashCommandBuilder } = require("discord.js");



 module.exports =
{
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows the help menu."),
    async execute(interaction)
    {
        interaction.reply({
            embeds: [{
                color: 16777215,
                author: {
                    name: `${interaction.client.user.username}'s help guide!`
                },
                title: `Commands of ${interaction.client.user.username}`,
                fields: [
                    {
                        name: "/quick-scramble",
                        value: "Creates a quick scramble, nothing else."
                    },
                    {
                        name: "/add-me",
                        value: "Adds the user who executed the command to the database scorelist."
                    },
                    {
                        name: "/do-a-solve",
                        value: "Will give you a scramble and then asks for the time it took the solve, this time gets added to the database.(not done yet)"
                    },
                    {
                        name: "/help",
                        value: "Shows this very menu."
                    },
                ],
                footer: {
                    icon_url: interaction.client.user.displayAvatarURL(),
                    text: "Ryubik\nCreated by taigo#8744",
                },
            }]
        })
    }
}