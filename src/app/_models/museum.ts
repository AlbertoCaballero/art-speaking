import { Piece } from './piece';

export class Museum {
    id: string;
    name: string;
    code?: string;
    description?: string;
    pieces?: string[];
    piecesData?: Array<Piece>;
    background?: string;
    gallery?: string;

    constructor() {
        this.id = "default-id";
        this.name = "Art Speaking";
        this.description = "This is a desciption of the art speaking system.";
        this.background = "https://images.squarespace-cdn.com/content/v1/53e43c86e4b0e9902e0be236/1487697157510-662ZESNNIJFSUGEU7D0A/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfNdxJhjhuaNor070w_QAc94zjGLGXCa1tSmDVMXf8RUVhMJRmnnhuU1v2M8fLFyJw/_DFA3999-Edit.jpg";
        this.piecesData = [];
    }
}