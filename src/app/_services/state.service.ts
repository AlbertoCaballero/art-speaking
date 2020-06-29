import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Museum, Piece, User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private sourceMuseum = new BehaviorSubject<Museum>(new Museum);
  currentMuseum = this.sourceMuseum.asObservable();

  private sourcePiece = new BehaviorSubject<Piece>(new Piece);
  currentPiece = this.sourcePiece.asObservable();

  private sourceUser = new BehaviorSubject<User>(new User);
  currentUser = this.sourceUser.asObservable();

  constructor() { }

  /**
   * Canges the current museum for all components to see
   * @param musuem The new museum object
   */
  changeCurrentMuseum(musuem: Museum) {
    this.sourceMuseum.next(musuem);
  }

  /**
   * Changes the current piece for all components to see
   * @param piece Te new piece object
   */
  changeCurrentPiece(piece: Piece) {
    this.sourcePiece.next(piece);
  }

  /**
   * Changes the current user for all components to see
   * @param user The new user object
   */
  changeCurrentUser(user: User) {
    this.sourceUser.next(user);
  }
}
