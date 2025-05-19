import { IUser } from '@/core/interfaces/types';

export enum EMESSAGE_TYPE {
  USER = 'USER',
  GPT = 'GPT',
}

export interface IInterviewMessage {
  id: number;
  text: string;
  type: 'USER' | 'GPT';
  created_at: string;
}

export interface IInterview {
  id: string;
  user: IUser;
  files: Array<any>;
  user_description: string;
  messages: Array<IInterviewMessage>;
  result: string;
  recomendations: string;
  approved: boolean;
  finished: boolean;
}
