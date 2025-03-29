import { ESKILL_LEVEL } from '@/core/interfaces/enums';

export enum ETEST_STEPS {
  FIRST = 1,
  SECOND,
  TEST,
}

export interface ITestParams {
  password?: string;
  techs: Array<number>;
  level: ESKILL_LEVEL;
}

export interface ITech {
  id: number;
  name: string;
  spec: number;
}
