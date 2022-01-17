import { IInteraction } from '../../interfaces/IInteraction';

export = {
  name: 'ping',
  category: 'Utility',
  description: 'Replies with pong!',
  run: async (interaction: IInteraction) => {
    await interaction.reply('Pong!');
  }
};
