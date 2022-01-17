import { CommandInteraction } from 'discord.js';

export interface ICommand {
  name: string;
  category: string;
  description: string;
  run(interaction: CommandInteraction): Promise<void>;
}
