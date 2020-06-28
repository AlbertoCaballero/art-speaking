import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Museum } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private sourceMuseum = new BehaviorSubject<Museum>(new Museum);
  currentMuseum = this.sourceMuseum.asObservable();

  constructor() { }

  /**
   * Canges the current museum for all components to see
   * @param musuem The new museum object
   */
  changeCurrentMuseum(musuem: Museum) {
    this.sourceMuseum.next(musuem);
  }
}
