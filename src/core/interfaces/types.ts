import { ESKILL_LEVEL } from '@/core/interfaces/enums';

export interface IUser {
  id: number;
  email: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
  last_ip?: string;
  last_login?: string;
  ip_log?: Array<{
    createdAt: string;
    id: number;
    ip: string;
    userId: number;
  }>;
}

export interface ITest {
  id?: number;
  question: string;
  responses: Array<{
    answer: string;
    correct: boolean;
    id: number;
  }>;
  technologies?: ITechnology[];
}

export interface ITechnology {
  id: number;
  name: string;
  description?: string;
  specialization: ISpecialization[];
}

export interface ITechWithCount extends ITechnology {
  _count?: {
    questions: number;
  };
}

export interface ISpecialization {
  id: number;
  name: string;
  technology: ITechnology[];
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
