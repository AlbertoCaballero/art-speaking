import { Piece } from './piece';

export class Museum {
    id: string;
    name: string;
    code?: string;
    description?: string;
    pieces?: Piece[];
    background?: string;
}