const { SlashCommandBuilder, messageLink} = require('discord.js');
const fs = require('fs');
const {generateScrambleSync} = require("scrambled");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("do-a-solve")
        .setDescription("The bot will generate a scramble and then you can put in a time.")
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
    async execute(interaction, client)
    {
        let passed = false;
        let cubeSize = 3;
        const cubeType = interaction.options.getString("type");
        switch (cubeType)
        {
            case "2x2":
                out = generateScrambleSync(9, 2);
                cubeSize = 2;
                break;
            case "3x3":
                out = generateScrambleSync(20, 3);
                cubeSize = 3;
                break;
            case "4x4":
                out = generateScrambleSync(40, 4);
                cubeSize = 4;
                break;
            case "5x5":
                out = generateScrambleSync(60, 5);
                cubeSize = 5;
                break;
            case "6x6":
                out = generateScrambleSync(80, 6);
                cubeSize = 6;
                break;
            case "7x7":
                out = generateScrambleSync(100, 7);
                cubeSize = 7;
                break;
            default:
                out = generateScrambleSync(20, 3);
                cubeSize = 3;
                break;
        }
        interaction.reply(`${out.scramble}\nEnter your time in a message.`);
        client.on("messageCreate", async (message) =>
        {
            if (passed) return;
            if (message.author.bot) return;

            let score = message.content;

            let done = false;
            for (let i = 1; !done; i++)
            {
                if (!fs.existsSync(`./scoredb/${interaction.user.id}/${cubeSize.toString()}scores/`))
                    return interaction.reply("Run /add-me first.");

                if (fs.existsSync(`./scoredb/${interaction.user.id}/${cubeSize.toString()}scores/time${i}`))
                    return;

                fs.writeFileSync(
                   `./scoredb/${interaction.user.id}/${cubeSize.toString()}scores/time${i}\n`,
                   `${out.scramble}\n${message.content}\n`
                );
                done = true;
            }
            passed = true;
        });
    }
}