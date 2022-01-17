import { IEvent } from './../interfaces/IEvent';
import { readdirSync } from 'fs';
import { join } from 'path';
import { IClient } from './../interfaces/IClient';
import { ICommand } from '../interfaces/ICommand';

export const handle: Function = async (client: IClient): Promise<void> => {
  const dir: string = process.env.NODE_ENV === 'production' ? 'build' : 'src';

  const commands: ICommand[] = [];
  readdirSync(join(process.cwd(), dir, 'commands')).forEach(
    (category: string) => {
      readdirSync(join(process.cwd(), dir, 'commands', category)).forEach(
        (file: string) => {
          const command: ICommand = require(join(
            process.cwd(),
            dir,
            'commands',
            category,
            file
          ));

          client.commands.set(command.name, command);
          commands.push(command);
        }
      );
    }
  );

  readdirSync(join(process.cwd(), dir, 'events')).forEach((file: string) => {
    const event: IEvent = require(join(process.cwd(), dir, 'events', file));

    if (event.once) {
      client.once(event.name, (...args: [any]) =>
        event.execute(...args, commands)
      );
    } else {
      client.on(event.name, (...args: [any]) =>
        event.execute(...args, client.commands)
      );
    }
  });
};
