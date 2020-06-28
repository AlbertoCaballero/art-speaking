import { Piece } from './piece';

export class Museum {
    id: string;
    name: string;
    code?: string;
    description?: string;
    pieces?: Piece[];
    background?: string;

    constructor() {
        this.id = "default-id",
        this.name = "Art Speaking",
        this.description = "This is a desciption of the art speaking system"
    }
}