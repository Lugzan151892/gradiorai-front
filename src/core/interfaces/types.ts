export interface IUser {
  id: number;
  email: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface ITest {
  id?: number;
  question: string;
  responses: Array<{
    answer: string;
    correct: boolean;
    id: number;
  }>;
}
