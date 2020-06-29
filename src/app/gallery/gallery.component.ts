import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';
import { Piece, Museum } from '../_models';
import { ContentService } from '../_services/content.service';
import { stat } from 'fs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  museum: Museum;

  constructor(private state: StateService, private content: ContentService) { 
    // Get current museum object
    this.state.currentMuseum.subscribe(museum => {
      this.museum = museum;
    });
  }

  ngOnInit() {
    if(this.museum.piecesData.length == 0) {
      this.getPiecesData();
    }
  }

  pieceClicked(id: string) {
    // We have the choosen piece id
    console.log(id);

    // Set state service piece for all components to see
    this.state.changeCurrentPiece(this.museum.piecesData[this.museum.pieces.indexOf(id)])
  }

  getPiecesData() {
    for(var i in this.museum.pieces) {
      this.museum.piecesData.push(this.getPiece(this.museum.pieces[i]));
    }

    this.state.changeCurrentMuseum(this.museum);
    console.log(this.museum);
  }

  getPiece(id: string) {
    let p: Piece = new Piece();
    this.content.readDocument("pieces", id).subscribe(doc => {
        p.id = doc.payload.id;
        p.title = doc.payload.get("title");
        p.author = doc.payload.get("author");
        p.description = doc.payload.get("description");
        p.miniature = doc.payload.get("miniature");
        p.highres = doc.payload.get("highres");
    });
    return p;
  }

  /**
   * Changes the miniature of the given document object to the image url
   * @param id Id of the element to change
   * @param url Url of the miniature image
   */
  changeMiniature(id: string, url: string) {
    document.getElementById(id).style.backgroundImage = "url('"+ url +"')";
  }
}