import {
  SlashCommandBuilder,
  SlashCommandNumberOption
} from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('🗑️ Limpezinha?')
    .addNumberOption((option: SlashCommandNumberOption) =>
      option
        .setName('amount')
        .setDescription('O número de mensagens a serem apagadas.')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction): Promise<void> {
    const amount: number = interaction.options.get('amount').value as number;

    if (amount > 100) {
      const badRequest: MessageEmbed = new MessageEmbed()
        .setTitle('🚫 Não é possível apagar mais de 100 mensagens de uma vez!')
        .setFooter({
          text: 'Requested by ' + interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp()
        .setColor('#dd2e44');

      interaction.reply({ embeds: [badRequest], ephemeral: true });
    } else {
      await interaction.channel.messages
        .fetch({ limit: amount })
        .then((messages) => {
          messages.forEach((message) => {
            message.delete();
          });

          const cleared: MessageEmbed = new MessageEmbed()
            .setTitle(`🗑️ ${amount} mensagens foram apagadas!`)
            .setFooter({
              text: 'Requested by ' + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
            .setColor('#8dbbc9');

          interaction.reply({ embeds: [cleared], ephemeral: true });
        })
        .catch(() => {
          const error: MessageEmbed = new MessageEmbed()
            .setTitle('❌ Ocorreu um erro!')
            .setFooter({
              text: 'Requested by ' + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
            .setColor('#dd2e44');

          interaction.reply({ embeds: [error], ephemeral: true });
        });
    }
  }
};
