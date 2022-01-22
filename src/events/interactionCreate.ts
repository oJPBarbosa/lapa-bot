import {
  ButtonInteraction,
  Collection,
  CommandInteraction,
  Message,
  MessageEmbed,
} from 'discord.js';
import { CommandT } from '../interfaces/Command';
import { buttonInteractionHandler as shrekButtonInteractionHandler } from '../commands/troll/shrek';
import { APIMessage } from 'discord-api-types';

export = {
  name: 'interactionCreate',
  async execute(
    interaction: CommandInteraction | ButtonInteraction,
    commands: Collection<string, CommandT>,
  ): Promise<void | APIMessage | Message<boolean>> {
    if (interaction.isCommand()) {
      const command: CommandT = commands.get(interaction.commandName);

      if (!command) {
        return interaction.followUp({ content: 'error' });
      }

      try {
        return command.execute(interaction);
      } catch (err) {
        return interaction.followUp({ content: err.message });
      }
    }

    if (interaction.isButton()) {
      const { message } = interaction;

      if (message.interaction.user.id === interaction.user.id) {
        (message as Message<true>).delete();

        if (interaction.customId.startsWith('shrek')) {
          shrekButtonInteractionHandler(interaction);
        }
      } else {
        const unauthorized: MessageEmbed = new MessageEmbed()
          .setTitle('🚫 Você não tem permissão para realizar essa ação!')
          .setFooter({
            text: 'Requested by ' + interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTimestamp()
          .setColor('#dd2e44');

        return interaction.reply({ embeds: [unauthorized], ephemeral: true });
      }
    }
  },
};
