import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, Question } from '../_models';
import { StateService } from './state.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  user: User;

  constructor(private firestore: AngularFirestore, private state: StateService, private content: ContentService, public auth: AuthService) {
    this.state.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  /**
   * Create a Firestore document under a collection 
   * @param collection Firestore collection where the document will be created
   * @param document Document tha will be added to the collection
   */
  createDocument(collection: string, document: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection(collection)
          .add(document)
          .then(
            res => {
              //console.log(res.id);
              //console.log(this.user.questionsData);
              this.content.readDocument("questions", res.id).subscribe(doc => {
                this.user.questionsData.push({
                  id: res.id,
                  question: doc.payload.get("question"),
                  piece: doc.payload.get("pieceid"),
                  user: doc.payload.get("userid")
                })
              });
              //console.log(this.user.questionsData);
            },
            err => {
              //console.log(reject(err));
              alert("Error, unable to send question");
            } 
          )
    })
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
   
  private updateQuestionDocument(question: Question) {
    const questionRef: AngularFirestoreDocument<Question> = this.firestore.doc(`questions/${question.id}`);

    const data = {
      id: question.id,
      question: question.question,
      user: question.user,
      piece: question.piece
    };

    return questionRef.set(data, { merge: true });
  }
}
