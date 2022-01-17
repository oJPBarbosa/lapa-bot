import { CommandInteraction } from 'discord.js';

export = {
  name: 'ping',
  category: 'Utility',
  description: 'Replies with pong!',
  run: async (interaction: CommandInteraction) => {
    await interaction.reply({
      content: 'Pong!',
      ephemeral: true
    });
  }
};
