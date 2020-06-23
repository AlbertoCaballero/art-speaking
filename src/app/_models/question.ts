import { User } from './user';

export class Question {
    id: string;
    question: string;
    intent?: string;
    prtedicted?: string;
    user: User;
}