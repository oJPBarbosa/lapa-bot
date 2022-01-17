import { CommandInteraction, MessageEmbed } from 'discord.js';

export = {
  name: 'staff',
  description: '👔 The folks behind Lapa Bot.',
  run: async (interaction: CommandInteraction): Promise<void> => {
    const staff: MessageEmbed = new MessageEmbed()
      .setTitle('👔 The staff')
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

    await interaction.reply({ embeds: [staff] });
  }
};
