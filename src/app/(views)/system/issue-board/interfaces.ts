export enum ETASK_STATUS {
  TODO = 'TODO',
  DONE = 'DONE',
}

export interface ITask {
  id: string;
  title: string;
  content: string;
  status: ETASK_STATUS;
}
