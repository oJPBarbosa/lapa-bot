import { readdirSync } from 'fs';
import { join } from 'path';
import { IClient } from '../interfaces/Client';
import { CommandT } from '../interfaces/Command';
import { EventT } from '../interfaces/Event';

export const handle: Function = async (client: IClient): Promise<void> => {
  const dir: string = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

  const commands: any[] = [];
  readdirSync(join(process.cwd(), dir, 'commands')).forEach(
    (category: string) => {
      readdirSync(join(process.cwd(), dir, 'commands', category)).forEach(
        (file: string) => {
          const command: CommandT = require(join(
            process.cwd(),
            dir,
            'commands',
            category,
            file,
          )).default;

          client.commands.set(command.data.name, command);
          commands.push(command.data.toJSON());
        },
      );
    },
  );

  readdirSync(join(process.cwd(), dir, 'events')).forEach((file: string) => {
    const event: EventT = require(join(process.cwd(), dir, 'events', file));

    if (event.once) {
      client.once(event.name, (...args: [any]) =>
        event.execute(...args, commands),
      );
    } else {
      client.on(event.name, (...args: [any]) =>
        event.execute(...args, client.commands),
      );
    }
  });
};
