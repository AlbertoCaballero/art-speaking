import { Question } from './question';

export class Piece {
    id: string;
    title: string;
    author: string;
    description: string;
    museumid: string;

    miniature: string;
    highres: string;

    questions?: Question[];

    constructor() {
        this.id = "";
        this.title = "";
        this.author = "";
        this.description = "";
        this.museumid = "";
        this.miniature = "";
        this.highres = "";
    }
}