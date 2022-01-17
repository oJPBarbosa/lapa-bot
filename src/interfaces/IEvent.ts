import { Collection } from 'discord.js';
import { ICommand } from './ICommand';

export interface IEvent {
  name: string;
  once?: boolean;
  execute(args: any[], commands?: any[] | Collection<string, ICommand>): void;
}
