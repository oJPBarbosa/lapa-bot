import { IClient } from './IClient';
import { IInteraction } from './IInteraction';

export interface ICommand {
  name: string;
  category: string;
  description: string;
  run(interaction: IInteraction, client?: IClient): Promise<void>;
}
