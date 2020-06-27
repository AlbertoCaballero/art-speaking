import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  testid: string;

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.currentMuseumId.subscribe(museumid => this.testid = museumid);
  }

}
