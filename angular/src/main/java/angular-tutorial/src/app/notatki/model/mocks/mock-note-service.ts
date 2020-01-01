import {Note} from "../note";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {NoteType} from "../enums/note-type.enum";

@Injectable({
  providedIn: 'root'
})
export class MockNoteService {
  saveNewNote(note: Note): Observable<Note> {
    note.id = 100;
    return of(note);
  }

  getNotes(): Observable<Note[]> {
    let notes = this.getMockNotes();
    return of(notes);
  }

  getMockNotes(): Note[] {
    let notes: Note[] = [];
    for (let i = 0; i < 10; i++) {
      let note = new Note();
      note.id = i;
      note.noteText = 'text ' + i;
      note.noteTopic = 'topic ' + i;
      if (i < 3) {
        note.noteType = NoteType.HIBERNATE;
      }
      if (i >= 3 && i < 7) {
        note.noteType = NoteType.ANGULAR;
      }
      if (i > 6) {
        note.noteType = NoteType.SPRING;
      }
      notes.push(note);
    }
    return notes;
  }
}

