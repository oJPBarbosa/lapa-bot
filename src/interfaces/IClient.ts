import { Client, Collection } from 'discord.js';
import { ICommand } from './ICommand';

export interface IClient extends Client {
  commands?: Collection<string, ICommand>;
}
