import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';
import { Piece, Question, User } from '../_models'
import { ContentService } from '../_services/content.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  piece: Piece;
  questionsIds: string[];
  questions: string[] = [];
  user: User;

  constructor(private content: ContentService, private state: StateService, public auth: AuthService) { 
    this.state.currentPiece.subscribe(piece => {
      this.piece = piece;
    });

    this.state.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    console.log(this.piece);
    this.getUserQuestionsIds(this.user.id);
  }

  // Read user data to retrive question ids
  getUserQuestionsIds(id: string) {
    this.content.readDocument("users", id).subscribe(doc => {
      this.questionsIds = doc.payload.get("questions");
      this.getQuestionsData(this.questionsIds);
    });
  }

  getQuestionsData(ids: string[]) {
    for(let id in ids) {
      console.log(ids[id]);
      this.content.readDocument("questions", ids[id]).subscribe(doc => {
        this.questions.push(doc.payload.get("question"));
      })
    }
    console.log(this.questions);
  }
}
