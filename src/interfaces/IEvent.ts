import { IClient } from './IClient';

export interface IEvent {
  name: string;
  once?: boolean;
  execute(client: IClient): void;
}
