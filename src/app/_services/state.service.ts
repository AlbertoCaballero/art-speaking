import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private museumIdSource = new BehaviorSubject<string>("default-id");
  currentMuseumId = this.museumIdSource.asObservable();

  constructor() { }

  /**
   * Change museum id for all components to see
   * @param newId The new museum id
   */
  changeCurrentMuseumId(newId: string) {
    this.museumIdSource.next(newId);
  }
}
