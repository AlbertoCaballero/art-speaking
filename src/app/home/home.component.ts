import { Component, OnInit } from '@angular/core';
import { Museum } from '../_models';
import { ContentService } from '../_services/content.service';
import { AuthService } from '../_services/auth.service';
import { StateService } from '../_services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  museum: Museum = new Museum;

  constructor(private content: ContentService, private state: StateService, public auth: AuthService) {  }

  ngOnInit() {
    this.state.currentMuseum.subscribe(museum => this.museum = museum);
  }
}
