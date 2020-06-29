import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';
import { Piece } from '../_models'

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  piece: Piece;

  constructor(private state: StateService) { 
    this.state.currentPiece.subscribe(piece => {
      this.piece = piece;
    })
  }

  ngOnInit() {
    console.log(this.piece)
  }

}
