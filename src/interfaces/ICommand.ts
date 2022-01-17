import { CommandInteraction } from 'discord.js';

export interface ICommand {
  name: string;
  description: string;
  run(interaction: CommandInteraction): Promise<void>;
}
