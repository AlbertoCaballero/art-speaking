import { User } from './user';

export class Question {
    id: string;
    question: string;
    user: string;
    piece: string;
    intent?: string;
    prtedicted?: string;
}

/**
 * This can be extended for firebase.User 
 * https://firebase.google.com/docs/reference/js/firebase.User
 */