import { Question } from './question';

export class User {
    id: string;
    name: string;
    lastname: string;
    age: number;
    sex: string;
    email: string;
    musueum: string;

    questions: Question[];

    token?: string;
}