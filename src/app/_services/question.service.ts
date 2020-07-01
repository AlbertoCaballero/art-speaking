import { Injectable } from '@angular/core';
import { ContentService } from './content.service';
import { Question, User } from '../_models';
import { resolve } from 'url';
import { AngularFirestore } from '@angular/fire/firestore';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  user: User;

  constructor(private content: ContentService, private firestore: AngularFirestore, private state: StateService) { 
    this.state.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  createQuestion(question: Question) {
    return new Promise<Question>((resolve, reject) => {
      this.firestore
          .collection("questions")
          .add(question)
          .then(
            res => {
              //console.log(res.id);
              question.id = res.id;
              //console.log(question);
              this.user.questions.push(res.id);
              this.state.changeCurrentUser(this.user);
              this.content.updateDocument("users", this.user.id, this.user);
            },
            err => {
              alert("Unable to send question, try again later");
            }
          )
    })
  }
}
