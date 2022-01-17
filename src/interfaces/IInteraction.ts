import { Interaction } from 'discord.js';

export interface IInteraction extends Interaction {
  reply(message: string): Promise<void>;
}
