import { Client, Collection } from 'discord.js';
import { CommandT } from './Command';

export interface IClient extends Client {
  commands?: Collection<string, CommandT>;
}
