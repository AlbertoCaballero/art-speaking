import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private firestore: AngularFirestore) { }

  /**
   * Create a Firestore document under a collection 
   * @param collection Firestore collection where the document will be created
   * @param document Document tha will be added to the collection
   */
  createDocument(collection: string, document: any) {
    return this.firestore.collection(collection).doc(document);
  }

  /** 
   * Read a doument from a given collection and id
   * @param collection Firestore collection where the document is located
   * @param id Id of the document to be read
   */
  readDocument(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).snapshotChanges();
  }

  updateDocument(collection: string, id: string, document: any) {
    this.firestore.doc(collection+"/"+id).update(document);
  }

  deleteDocument(collection: string, id: string, document: any) {
    this.firestore.doc(collection+"/"+id).delete();
  }
}
