import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, EmbedFieldData, MessageEmbed } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { ICommand } from '../../interfaces/ICommand';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Precisando de uma ajudinha, step bro? 🙋'),
  async execute(interaction: CommandInteraction): Promise<void> {
    const dir: string = process.env.NODE_ENV === 'production' ? 'build' : 'src';

    const commands: EmbedFieldData[] = [];
    readdirSync(join(process.cwd(), dir, 'commands')).forEach(
      (category: string) => {
        readdirSync(join(process.cwd(), dir, 'commands', category)).forEach(
          (file: string) => {
            const command: ICommand = require(join(
              process.cwd(),
              dir,
              'commands',
              category,
              file
            )).default;

            if (command.data.name != 'help') {
              commands.push({
                name: '`' + command.data.name + '`',
                value: command.data.description
              });
            }
          }
        );
      }
    );

    const help: MessageEmbed = new MessageEmbed()
      .setTitle('🙋 Help')
      .addFields(commands)
      .setFooter({
        text: 'Requested by ' + interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp()
      .setColor('#e58032');

    await interaction.reply({ embeds: [help] });
  }
};
