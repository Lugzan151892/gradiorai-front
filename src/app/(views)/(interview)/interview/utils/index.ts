import { EMESSAGE_TYPE } from '../types';

export const interviewMock = {
  id: 'interview-uuid',
  user: {
    id: 1,
    email: 'test email',
    admin: false,
    created_at: 'tte',
    updated_at: 'tea',
  },
  files: [],
  user_description: 'tut opisanie kak user sebya opisyvaetwwswsswswwwwsswwwwwwwsawsawws',
  messages: [
    {
      id: 1,
      text: 'test 1 USER message text',
      type: EMESSAGE_TYPE.USER,
      created_at: 'data',
    },
    {
      id: 2,
      text: 'test 2 GPT message text',
      type: EMESSAGE_TYPE.GPT,
      created_at: 'data',
    },
  ],
  result: 'Result kak user prowel interview',
  finished: false,
  recomendations: 'test recomendation',
  approved: false,
};
