import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';
import { Piece, Museum } from '../_models';
import { ContentService } from '../_services/content.service';

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
    })
  }

  ngOnInit() {}
}