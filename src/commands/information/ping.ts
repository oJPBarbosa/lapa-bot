import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message, MessageEmbed } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping? 🏓 Pong!'),
  async execute(interaction: CommandInteraction): Promise<void> {
    const message: Message = await interaction.channel.send('.');
    message.delete();

    const ping: MessageEmbed = new MessageEmbed()
      .setTitle('🏓 Pong!')
      .setDescription(
        '└ `' +
          Math.floor(message.createdTimestamp - interaction.createdTimestamp) +
          'ms`'
      )
      .setFooter({
        text: 'Requested by ' + interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp()
      .setColor('#dd2e44');

    await interaction.reply({ embeds: [ping] });
  }
};
