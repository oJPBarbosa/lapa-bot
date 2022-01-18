import {
  SlashCommandBuilder,
  SlashCommandStringOption
} from '@discordjs/builders';
import {
  ButtonInteraction,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed
} from 'discord.js';
import { description } from '../../utils/shrek';

let sending: boolean = true;
let i: number = 0;

export default {
  data: new SlashCommandBuilder()
    .setName('shrek')
    .setDescription('📜 O roteiro inteiro de Shrek? Temos!')
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName('action')
        .setDescription('Reinicie, pause, continue ou pare o envio do roteiro.')
        .setRequired(false)
        .addChoice('reiniciar', 'restart')
        .addChoice('pausar', 'stop')
        .addChoice('continuar', 'resume')
        .addChoice('parar', 'kill')
    ),
  async execute(interaction: CommandInteraction): Promise<void> {
    if (interaction.options.get('action')) {
      const action: string | number | boolean =
        interaction.options.get('action').value;

      switch (action) {
        case 'restart':
          const restart: MessageEmbed = new MessageEmbed()
            .setTitle('🔄 Envio reiniciado!')
            .setFooter({
              text: 'Requested by ' + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
            .setColor('#3a88c2');

          interaction.reply({ embeds: [restart], ephemeral: true });

          sending = true;
          i = 0;

          break;
        case 'stop':
          const stop: MessageEmbed = new MessageEmbed()
            .setTitle('⏸️ Envio pausado!')
            .setFooter({
              text: 'Requested by ' + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
            .setColor('#3a88c2');

          interaction.reply({ embeds: [stop], ephemeral: true });

          sending = false;

          break;
        case 'resume':
          const resume: MessageEmbed = new MessageEmbed()
            .setTitle('↪️ Envio retomado!')
            .setFooter({
              text: 'Requested by ' + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
            .setColor('#3a88c2');

          interaction.reply({ embeds: [resume], ephemeral: true });

          sending = true;

          break;
        case 'kill':
        case 'restart':
          const kill: MessageEmbed = new MessageEmbed()
            .setTitle('❌ Envio parado!')
            .setFooter({
              text: 'Requested by ' + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
            .setColor('#dd2f45');

          interaction.reply({ embeds: [kill], ephemeral: true });

          sending = false;

          break;
      }
    } else {
      const shrek: MessageEmbed = new MessageEmbed()
        .setTitle('⚠️  Atenção!')
        .setDescription(description)
        .setFooter({
          text: 'Requested by ' + interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp()
        .setColor('#f4c75e');

      const row: MessageActionRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('shrekProceed')
          .setLabel('👍')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId('shrekCancel')
          .setLabel('👎')
          .setStyle('DANGER')
      );

      await interaction.reply({
        embeds: [shrek],
        components: [row]
      });
    }
  }
};

export const send: Function = (
  interaction: ButtonInteraction,
  text: string
): void => {
  const lines = text.split('\n');

  setInterval(() => {
    if (sending) {
      if (i >= lines.length) {
        return;
      }

      if (lines[i].trim() !== '') {
        interaction.channel.send(lines[i]);
      }

      i++;
    }
  }, 1500);
};
