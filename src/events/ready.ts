import { IClient } from './../interfaces/IClient';

export = {
  name: 'ready',
  once: true,
  execute(client: IClient): void {
    console.log(client.user.username + ' is up and running!');
  }
};
