import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private firestore: AngularFirestore) { }

  createDocument(collection: string, document: any) {
    return this.firestore.collection(collection).doc(document);
  }

  readDocument(collection: string, document: any) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  updateDocument(collection: string, id: string, document: any) {
    return this.firestore.doc(collection+"/"+id).update(document);
  }

  deleteDocument(collection: string, id: string, document: any) {
    return this.firestore.doc(collection+"/"+id).delete();
  }
}
