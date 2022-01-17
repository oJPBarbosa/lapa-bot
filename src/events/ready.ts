import { IClient } from './../interfaces/IClient';

export = {
  name: 'ready',
  once: true,
  async execute(client: IClient, commands: any[]): Promise<void> {
    await client.application.commands.set(commands);
    console.log(client.user.username + ' is up and running!');
  }
};
