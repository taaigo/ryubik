const { SlashCommandBuilder } = require("discord.js");
const { generateScrambleSync } = require('scrambled');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("quick-scramble")
        .setDescription("Creates a quick scramble, nothing else.")
        .addStringOption(option =>
            option.setName("type")
                  .setDescription("Put in the WCA type of puzzle.")
                  .addChoices(
                          { name: "2x2x2", value: "2x2" },
                          { name: "3x3x3 (default)", value: "3x3" },
                          { name: "4x4x4", value: "4x4" },
                          { name: "5x5x5", value: "5x5" },
                          { name: "6x6x6", value: "6x6" },
                          { name: "7x7x7", value: "7x7" }
                  )
            ),
    async execute(interaction)
    {
        const cubeType = interaction.options.getString("type");
        switch (cubeType)
        {
            case "2x2":
                out = generateScrambleSync(9, 2);
                interaction.reply(out.scramble);
                break;
            case "3x3":
                out = generateScrambleSync(20, 3);
                interaction.reply(out.scramble);
                break;
            case "4x4":
                out = generateScrambleSync(40, 4);
                interaction.reply(out.scramble);
                break;
            case "5x5":
                out = generateScrambleSync(60, 5);
                interaction.reply(out.scramble);
                break;
           case "6x6":
               out = generateScrambleSync(80, 6);
               interaction.reply(out.scramble);
               break;
           case "7x7":
               out = generateScrambleSync(100, 7);
               interaction.reply(out.scramble);
               break;
            default:
                out = generateScrambleSync(20, 3);
                interaction.reply(out.scramble);
                break;
        }
    },
};