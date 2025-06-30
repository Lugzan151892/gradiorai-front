import { IUser } from '@/core/interfaces/types';

export enum EMESSAGE_TYPE {
  USER = 'USER',
  GPT = 'GPT',
}

export interface IInterviewMessage {
  id: number;
  text: string;
  is_human: boolean;
  created_at: string;
}

export interface IInterview {
  id: string;
  created_at: string;
  user: IUser;
  files: Array<any>;
  user_prompt: string;
  messages: Array<IInterviewMessage>;
  result: string;
  recomendations: string;
  approved: boolean;
  finished: boolean;
}
