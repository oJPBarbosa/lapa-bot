import {
  SlashCommandBuilder,
  SlashCommandStringOption
} from '@discordjs/builders';
import { CommandInteraction, Message, MessageEmbed } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('🗳️ Lapa Enquetes')
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName('poll')
        .setDescription('A pergunta da enquete.')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction): Promise<void> {
    const poll: MessageEmbed = new MessageEmbed()
      .setAuthor({ name: '🗳️ Lapa Enquetes' })
      .setTitle(interaction.options.get('poll').value as string)
      .setFooter({
        text: 'Requested by ' + interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp()
      .setColor('#407ccd');

    await interaction.reply({ embeds: [poll] });

    interaction.channel.messages.fetch().then((messages) => {
      messages.first().react('👍');
      messages.first().react('👎');
    });
  }
};
