import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { ContentService } from './_services/content.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Museum } from './_models';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'art-speaking';
  museum: Museum = {
    id: "",
    name: ""
  };
  data: any;
  params: HttpParams;
  client: HttpClient;
  id: any;

  constructor(private activatedRoute: ActivatedRoute, private content: ContentService, public auth: AuthService) {
    // Retrives the URL parameters
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];
      this.id = id;

      if (id != null) {
        this.museum.id = id;
        this.getMuseumName(this.museum.id);
        console.log(this.museum.id);

      } else {
        this.museum.name = "Art Speaking";
      }
    });
  }

  ngOnInit() {

    // Read Http params for museum id
    if (this.id != null) {
      this.content.readDocument(environment.collections.museums, this.id).subscribe(doc => {
        this.data = doc.payload.get("name");
        console.log(this.data);
      });
    }
  }

  /**
   * Returns the museum nae via an id
   */
  getMuseumName(id: string) {
    this.content.readDocument("museums", id).subscribe(doc => {
      this.museum.name = doc.payload.get("name");
    });
  }
}
