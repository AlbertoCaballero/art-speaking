import { Question } from './question';

export class User {
    id: string;
    name: string;
    lastname?: string;
    age?: number;
    sex?: string;
    email: string;
    phone?: string;
    photo?: string;
    musueum?: string;

    questions?: Question[];

    token?: string;
}