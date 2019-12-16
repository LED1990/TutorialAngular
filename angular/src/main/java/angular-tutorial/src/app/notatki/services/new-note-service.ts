import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Note} from "../model/note";

@Injectable({
  providedIn: 'root'
})
/**
 * BehaviorSubject allows set object as observable via asObservable()
 * than to change object value just use next()
 */
export class NewNoteService {

  private message = new BehaviorSubject<Note>(undefined);
  currentMsg = this.message.asObservable();
  constructor() { }

  changeMessage(note: Note){
    this.message.next(note);
  }
}
