import 'dotenv/config';

import { IClient } from './interfaces/IClient';
import Discord, { Client, Collection, Intents } from 'discord.js';
import { handle } from './handler';

const client: IClient = new Client({
  intents: [Intents.FLAGS.GUILDS]
});

client.discord = Discord;
client.commands = new Collection();

handle(client);

client.login(process.env.TOKEN);

export { client };
