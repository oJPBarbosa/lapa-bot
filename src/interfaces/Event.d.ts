import { Collection } from 'discord.js';
import { CommandT } from './Command';

export type EventT = {
  name: string;
  once?: boolean;
  execute(args: any[], commands?: any[] | Collection<string, CommandT>): void;
};
