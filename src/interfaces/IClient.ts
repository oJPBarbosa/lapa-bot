import Discord, { Client, Collection } from 'discord.js';
import { ICommand } from './ICommand';

export interface IClient extends Client {
  discord?: typeof Discord;
  commands?: Collection<string, ICommand>;
}
