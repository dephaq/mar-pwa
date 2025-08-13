export type StudyStatus = 'sent' | 'opened' | 'started' | 'finished';

export interface Study {
  id: number;
  topic: string;
  duration: number; // minutes
  reward: number; // currency units
  deadline: string; // ISO date string
  status: StudyStatus;
}
