import {
  ButtonInteraction,
  Collection,
  CommandInteraction,
  MessageEmbed
} from 'discord.js';
import { CommandT } from '../interfaces/Command';
import { buttonHandler as shrekHandler } from '../utils/shrek';

export = {
  name: 'interactionCreate',
  async execute(
    interaction: CommandInteraction | ButtonInteraction,
    commands: Collection<string, CommandT>
  ) {
    if (interaction.isCommand()) {
      const command: CommandT = commands.get(interaction.commandName);

      if (!command) {
        return interaction.followUp({ content: 'error' });
      }

      try {
        command.execute(interaction);
      } catch (err) {
        interaction.followUp({ content: err.message });
      }
    }

    if (interaction.isButton()) {
      const message: any = interaction.message;

      if (message.interaction.user.id === interaction.user.id) {
        message.delete();

        if (interaction.customId.startsWith('shrek')) {
          shrekHandler(interaction);
        }
      } else {
        const unauthorized: MessageEmbed = new MessageEmbed()
          .setTitle('🚫 Você não tem permissão para realizar essa ação!')
          .setFooter({
            text: 'Requested by ' + interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL()
          })
          .setTimestamp()
          .setColor('#dd2e44');

        interaction.reply({ embeds: [unauthorized], ephemeral: true });
      }
    }
  }
};
