import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('staff')
    .setDescription('👔 Conheça os responsáveis pelo Lapa.'),
  async execute(interaction: CommandInteraction): Promise<void> {
    const staff: MessageEmbed = new MessageEmbed()
      .setTitle('👔 O staff')
      .addField('Developer', '<@547861798846464004>', true)
      .addField(
        'Special Helpers',
        '<@843856597456388107>\n<@844990522032652328>',
        true
      )
      .addField('Consultant', '<@852929513460465707>', true)
      .setFooter({
        text: 'Requested by ' + interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp()
      .setColor('#99caf6');

    const row: MessageActionRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('GitHub')
        .setURL('https://github.com/oJPBarbosa/lapa-bot')
        .setStyle('LINK')
    );

    await interaction.reply({ embeds: [staff], components: [row] });
  }
};
