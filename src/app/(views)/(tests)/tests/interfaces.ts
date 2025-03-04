import {
  EQUESTION_AMOUNT,
  ESKILL_LEVEL,
  ETEST_SPEC,
} from '@/core/interfaces/enums';

export enum ETEST_STEPS {
  FIRST = 1,
  SECOND,
  THIRD,
  TEST,
}

export interface ITestParams {
  password: string;
  amount: EQUESTION_AMOUNT;
  level: ESKILL_LEVEL;
  spec: ETEST_SPEC;
}

export interface ITest {
  question: string;
  responses: Array<{
    answer: string;
    correct: boolean;
    id: number;
  }>;
}
