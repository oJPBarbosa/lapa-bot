import { IClient } from './../interfaces/IClient';
import { ICommand } from './../interfaces/ICommand';

export = {
  name: 'ready',
  once: true,
  async execute(client: IClient, commands: ICommand[]): Promise<void> {
    await client.application.commands.set(commands);
    console.log(client.user.username + ' is up and running!');
  }
};
