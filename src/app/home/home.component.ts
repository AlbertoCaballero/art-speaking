import { Component, OnInit } from '@angular/core';
import { Museum } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../_services/content.service';
import { AuthService } from '../_services/auth.service';
import { StateService } from '../_services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Default declaration and values for Home Component Content
   */
  museum: Museum = {
    name: "Art Speaking",
    id: "",
    description: "Jumex Colection is a private art collection owned by Eugenio López Alonso. It includes works by Damien Hirst, Andy Warhol, Gabriel Orozco, Cy Twombly, Jeff Koons, Marcel Duchamp, Andreas Gursky and many more. A museum is an institution that cares for (conserves) a collection of artifacts and other objects of artistic, cultural, historical, or scientific importance. Many public museums make these items available for public viewing through exhibits that may be permanent or temporary. The largest museums are located in major cities throughout the world, while thousands of local museums exist in smaller cities, towns, and rural areas. Museums have varying aims, ranging from serving researchers and specialists to serving the general public. The goal of serving researchers is increasingly shifting to serving the general public."
  }

  constructor(private content: ContentService, private state: StateService, public auth: AuthService) {
    
  }

  ngOnInit() {
    this.state.currentMuseumId.subscribe(museumid => this.museum.id = museumid);
  }
}
