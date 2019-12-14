import {NoteType} from "./enums/note-type.enum";

export class Note {
  private noteType: NoteType;
  private noteTopik: string;
  private noteText: string;


  constructor(init?: Partial<Note>) {
    Object.assign(this, init);
  }
}
