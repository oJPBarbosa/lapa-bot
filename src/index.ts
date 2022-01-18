import 'dotenv/config';

import { IClient } from './interfaces/Client';
import { Client, Collection, Intents } from 'discord.js';
import { handle } from './handler';

const client: IClient = new Client({
  intents: Intents.FLAGS.GUILDS
});

client.commands = new Collection();

handle(client);

client.login(process.env.TOKEN);

export { client };
