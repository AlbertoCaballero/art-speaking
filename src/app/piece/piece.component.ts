import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';
import { Piece, User, Museum } from '../_models'
import { ContentService } from '../_services/content.service';
import { AuthService } from '../_services/auth.service';
import { QuestionService } from '../_services/question.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  piece: Piece;
  user: User;
  museum: Museum;
  questionsIds: string[];
  questions: string[];
  questionBox: string;
  form: FormGroup;
  disable: boolean = true;

  constructor(private content: ContentService, private state: StateService, public auth: AuthService, private questionService: QuestionService) {
    this.state.currentPiece.subscribe(piece => {
      this.piece = piece;
    });

    this.state.currentUser.subscribe(user => {
      this.user = user;
    });

    this.state.currentMuseum.subscribe(museum => {
      this.museum = museum;
    })
  }

  ngOnInit() {
    this.form = new FormGroup({
      'question': new FormControl(this.user.questionsData, [
        Validators.required,
        Validators.minLength(10)
      ])
    });
    //console.log(this.piece);
    if (this.user.questionsData.length == 0) {
      this.getUserQuestionsIds(this.user.id);
    }

    //console.log(this.user);
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
    if (this.questionBox) {
      let resp = this.questionService.createQuestion({
        question: this.questionBox,
        user: this.user.id,
        piece: this.piece.id,
        museum: this.museum.id
      });
      this.questionBox = null;

    } else {
      alert("Nothing in question box");
    }
  }
}
