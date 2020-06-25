import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { PieceComponent } from './piece/piece.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AccessComponent } from './access/access.component';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { AngularFireModule } from '@angular/fire';

const firebaseConfig  = {
  apiKey: "AIzaSyDwVNABo9Kem6qSSolucVfNwsD_dFASvFU",
  authDomain: "artspeaking-8dc29.firebaseapp.com",
  databaseURL: "https://artspeaking-8dc29.firebaseio.com",
  projectId: "artspeaking-8dc29",
  storageBucket: "artspeaking-8dc29.appspot.com",
  messagingSenderId: "429565406876",
  appId: "1:429565406876:web:56a06fc8f856b89de14759" 
};

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    HomeComponent,
    PieceComponent,
    AboutComponent,
    ContactComponent,
    AccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
