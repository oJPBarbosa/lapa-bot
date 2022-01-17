import { IEvent } from './../interfaces/IEvent';
import { readdirSync } from 'fs';
import { join } from 'path';
import { IClient } from './../interfaces/IClient';
import { ICommand } from '../interfaces/ICommand';

export const handle: Function = async (client: IClient): Promise<void> => {
  readdirSync(join(process.cwd(), 'src/events')).forEach((file: string) => {
    const event: IEvent = require(join(process.cwd(), 'src/events', file));

    if (event.once) {
      client.once(event.name, (): void => event.execute(client));
    } else {
      client.on(event.name, (): void => event.execute(client));
    }
  });

  const commands: any[] = [];
  readdirSync(join(process.cwd(), 'src/commands')).forEach(
    (category: string) => {
      readdirSync(join(process.cwd(), 'src/commands', category)).forEach(
        (file: string) => {
          const command: ICommand = require(join(
            process.cwd(),
            'src/commands',
            category,
            file
          ));

          client.commands.set(command.name, command);
          commands.push(command);
        }
      );
    }
  );

  client.once('ready', async (): Promise<void> => {
    await client.application.commands.set(commands);
  });
};
