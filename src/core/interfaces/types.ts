import { IInterview } from '@/app/(views)/(interview)/interview/types';
import { EGPT_SETTINGS_TYPE, ESKILL_LEVEL } from '@/core/interfaces/enums';

export interface IUserRating {
  id: number;
  user_id: number;
  user: IUser;
  tests_rating: number;
  interviews_rating: number;
  total_rating: number;
  last_activity: string;
  updated_at: string;
  created_at: string;
}

export interface IUser {
  id: number;
  email: string;
  admin: boolean;
  avatar?: string;
  username?: string;
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
  questions_passed?: Array<{
    passed_at: string;
    question_id: number;
    user_id: number;
  }>;
  files: Array<IFile>;
  user_rating: IUserRating;
  /** Пользователь зарегистрировался через Google */
  isGoogle?: boolean;
  /** Пользователь создал пароль */
  is_password_created?: boolean;
}

export interface IUserReview {
  id: number;
  created_at: string;
  text: string;
  rating: number | null;
  checked: boolean;
  saved_by: {
    id: number;
    email: string;
    admin: boolean;
  } | null;
  ip: string | null;
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

export interface IActionsLog {
  id: number;
  createdAt: string;
  type: EGPT_SETTINGS_TYPE;
  user_ip?: string;
  interview?: IInterview;
  user?: IUser;
  user_id?: number;
  interview_id?: number;
  content?: string;
}

export interface ISystemTransaction {
  id: number;
  created_at: string;
  transaction_maker: IUser;
  paid_time: string;
  transaction_maker_id: number;
  amount: number;
  reason: string;
}

export interface IFile {
  id: string;
  /** Уникальное имя файла */
  filename: string;
  /** Название файла указанное при загружке */
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export enum ACHIEVEMENT_TYPE {
  ONESHOT = 'ONESHOT',
  PROGRESS = 'PROGRESS',
}

export enum ACHIEVEMENT_TRIGGER {
  ANSWER_QUESTION = 'ANSWER_QUESTION',
  PASS_TEST = 'PASS_TEST',
  REGISTER = 'REGISTER',
  FIRST_TEST = 'FIRST_TEST',
  LOGIN = 'LOGIN',
}

export interface IAchievement {
  id: number;
  key: string;
  title: string;
  description: string;
  type: ACHIEVEMENT_TYPE;
  trigger: ACHIEVEMENT_TRIGGER;
  target: number;
  reward_points: number;
  image_id: number;
  image: File | IFile | null;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IAchievementWithProgress extends IAchievement {
  userProgress: {
    completed: boolean;
    completed_at: string;
    progress: number;
  };
}
