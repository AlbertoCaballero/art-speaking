import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { ContentService } from './_services/content.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Museum } from './_models';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StateService } from './_services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Art Speaking';
  museum: Museum = new Museum;

  /**
   * @param activatedRoute Current Router route
   * @param content Content Service provider
   * @param auth Authorization Service provider
   */
  constructor(private activatedRoute: ActivatedRoute, private content: ContentService, private state: StateService, public auth: AuthService) {
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];

      if (id != null) {
        this.museum.id = id;
        this.getMuseumName(this.museum.id);
        state.changeCurrentMuseum(this.museum);

      } else {
        console.log("No museum id defined");
      }
    });
  }

  ngOnInit() {  }

  /**
   * Returns the museum name base on the id provided
   */
  getMuseumName(id: string) {
    this.content.readDocument("museums", id).subscribe(doc => {
      this.museum.name = doc.payload.get("name");
      this.museum.description = doc.payload.get("description");
    });
  }
}
