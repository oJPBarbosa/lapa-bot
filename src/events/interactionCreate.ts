import { Collection, CommandInteraction } from 'discord.js';
import { ICommand } from './../interfaces/ICommand';

export = {
  name: 'interactionCreate',
  async execute(
    interaction: CommandInteraction,
    commands: Collection<string, ICommand>
  ) {
    if (interaction.isCommand()) {
      const command: ICommand = commands.get(interaction.commandName);

      if (!command) {
        return interaction.followUp({ content: 'error' });
      }

      try {
        command.run(interaction);
      } catch (err) {
        interaction.followUp({ content: err.message });
      }
    }
  }
};
