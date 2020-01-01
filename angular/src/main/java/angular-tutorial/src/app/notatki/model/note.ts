import {NoteType} from "./enums/note-type.enum";

/**
 * Real note object. will be used in note details component after geting full note from DB
 */
export class Note {
  id: number;
  noteType: NoteType;
  noteTopic: string;
  noteText: string;


  constructor(init?: Partial<Note>) {
    Object.assign(this, init);
  }
}
