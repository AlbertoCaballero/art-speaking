import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';
import { Piece, Question, User } from '../_models'
import { ContentService } from '../_services/content.service';
import { AuthService } from '../_services/auth.service';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  piece: Piece;
  questionsIds: string[];
  user: User;
  questionBox: string;

  constructor(private content: ContentService, private state: StateService, public auth: AuthService, private questionService: QuestionService) {
    this.state.currentPiece.subscribe(piece => {
      this.piece = piece;
    });

    this.state.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    //console.log(this.piece);
    if (this.user.questionsData.length == 0) {
      this.getUserQuestionsIds(this.user.id);
    }

    console.log(this.user);
  }

  // Read user data to retrive question ids
  getUserQuestionsIds(id: string) {
    if (this.user.questionsData.length == 0) {
      this.content.readDocument("users", id).subscribe(doc => {
        if (this.user.questionsData.length == 0) {
          this.questionsIds = doc.payload.get("questions");
          this.getQuestionsData(this.questionsIds);
        }
      });
    }
  }

  getQuestionsData(ids: string[]) {
    if (!this.user.questionsData.length) {
      for (let id in ids) {
        this.content.readDocument("questions", ids[id]).subscribe(doc => {
          if (this.user.questionsData.length < this.user.questions.length) {
            this.user.questionsData.push({
              id: doc.payload.id,
              question: doc.payload.get("question"),
              user: doc.payload.get("user"),
              piece: doc.payload.get("piece")
            });
          }
        })
      }
      this.user.questions = ids;
      this.state.changeCurrentUser(this.user);
      //console.log(this.user);
    }
  }

  sendQuestion() {

    if (this.questionBox != "") {
      let resp = this.questionService.createQuestion({
        question: this.questionBox,
        user: this.user.id,
        piece: this.piece.id
      });
      this.questionBox = "";

    } else {
      alert("Nothing in question box.");
    }
  }
}
