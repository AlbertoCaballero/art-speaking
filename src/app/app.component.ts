import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { ContentService } from './_services/content.service';

import { Museum } from './_models';
import { ActivatedRoute } from '@angular/router';
import { StateService } from './_services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Art Speaking';
  museum: Museum = new Museum;
  resposiveMenuVisible: boolean = false;

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
        this.getMuseumData(this.museum.id);
        state.changeCurrentMuseum(this.museum);
        //console.log(this.museum.pieces);

      } else {
        this.museum.id = "5XeHXwdtQ4K3GvvRSzVY"; // Pretty much default museum id TODO: ArtSpeaking Id
        this.getMuseumData(this.museum.id);
        state.changeCurrentMuseum(this.museum);
        //console.log("No museum id defined");
      }
    });

  }

  ngOnInit() { 
    this.changeBackgrounds();
    this.resposiveMenuVisible = true;
  }

  getMuseumData(id: string) {
    this.content.readDocument("museums", id).subscribe(doc => {
      this.museum.name = doc.payload.get("name");
      this.museum.description = doc.payload.get("description");
      this.museum.background = doc.payload.get("background");
      this.museum.pieces = doc.payload.get("pieces");
      this.changeBackgrounds();
    });
  }

  changeBackgrounds() {
    // Set background images
    document.body.style.backgroundImage = "url('"+ this.museum.background +"')";
    document.getElementById("nav-id").style.backgroundImage = "url('"+ this.museum.background +"')";
    //console.log(this.museum); 
  }

  toggleResponsiveMenu() {
    var x = window.matchMedia("(max-width: 1000px)");
    if (x.matches) {
      this.resposiveMenuVisible = !this.resposiveMenuVisible;
    }
  }

  onResize() {
    var x = window.matchMedia("(max-width: 1000px)");
    if (x.matches) {
      this.resposiveMenuVisible = !this.resposiveMenuVisible;
    }
  }
}
