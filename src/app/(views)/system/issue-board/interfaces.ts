export enum ETASK_STATUS {
  TODO = 'TODO',
  DONE = 'DONE',
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: ETASK_STATUS;
}
