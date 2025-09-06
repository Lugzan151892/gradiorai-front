export enum ESYSTEM_PAGES {
  LOGS = 'LOGS',
  GPT = 'GPT',
  QUESTIONS = 'QUESTIONS',
  ENTITIES = 'ENTITIES',
  USERS = 'USERS',
  REVIEWS = 'REVIEWS',
  INTERVIEWS = 'INTERVIEWS',
  FILES = 'FILES',
  ACTIONS = 'ACTIONS',
  TRANSACTIONS = 'TRANSACTIONS',
  BACKUPS = 'BACKUPS',
  TRANSLATIONS = 'TRANSLATIONS',
  ANALIZE = 'ANALIZE',
  FAKE_USERS = 'FAKE_USERS',
}

export interface IFakeUser {
  id: string;
  name: string;
  total_rating: number;
}
