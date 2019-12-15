import {NoteType} from "./enums/note-type.enum";

export class Note {
  private _id: number;
  private _noteType: NoteType;
  private _noteTopik: string;
  private _noteText: string;


  constructor(init?: Partial<Note>) {
    Object.assign(this, init);
  }


  get noteType(): NoteType {
    return this._noteType;
  }

  set noteType(value: NoteType) {
    this._noteType = value;
  }

  get noteTopik(): string {
    return this._noteTopik;
  }

  set noteTopik(value: string) {
    this._noteTopik = value;
  }

  get noteText(): string {
    return this._noteText;
  }

  set noteText(value: string) {
    this._noteText = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
