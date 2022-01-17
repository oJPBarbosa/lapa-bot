import { CommandInteraction, Message, MessageEmbed } from 'discord.js';

export = {
  name: 'ping',
  category: 'Utility',
  description: 'Replies with pong!',
  run: async (interaction: CommandInteraction): Promise<void> => {
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
        text: 'By ' + interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp()
      .setColor('#dd2e44');

    await interaction.reply({ embeds: [ping] });
  }
};
