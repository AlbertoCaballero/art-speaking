import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';
import { Piece, Museum } from '../_models';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  test: string;

  pieces: string[];
  museum: Museum;
  imgurl: string = "https://i.pinimg.com/originals/c9/93/06/c9930684262bc560af0bd653d3f082d2.jpg";

  constructor(private state: StateService) { }

  ngOnInit() {
    this.getMuseumPieces();
  }

  getMuseumPieces() {
    this.state.currentMuseum.subscribe(museum => this.museum = museum);
    this.pieces = this.museum.pieces;
  }
}
