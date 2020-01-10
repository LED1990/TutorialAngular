import {Component, OnInit} from '@angular/core';
import {Note} from "../model/note";
import {NoteService} from "../services/note.service";
import {NewNoteService} from "../services/new-note-service";
import {MessagesAndLogsService} from "../services/messages-and-logs.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  private _listOfNotes: Note[] = [];

  constructor(private msg: MessagesAndLogsService,
              private _noteService: NoteService,
              private data: NewNoteService) {
  }

  ngOnInit() {
    this.msg.logAndAddMsessage([], '[MenuComponent] init()');
    this.data.currentMsg.subscribe(value => {
      if (value !== undefined){
        this.msg.logAndAddMsessage([value], '[MenuComponent] saving note without IMAGE');
        this.onNewNote(value)
      }
    });
    this._noteService.getNotes().subscribe(value => {
      this.msg.logAndAddMsessage([value], '[MenuComponent] getting all notes from server (without img and text)');
      for (let val of value){
        this._listOfNotes.push(val);
      }
    });
  }

  onNewNote(note: Note) {
    if (note.id !== undefined){
      this.msg.logAndAddMsessage([note.id], '[MenuComponent] adding new note - note has ID');
      this._listOfNotes.push(note);
    } else {
      this.msg.logAndAddMsessage([], '[MenuComponent] saving new note');
      this._noteService.saveNewNote(note).subscribe(value => {
        this.msg.logAndAddMsessage([value], '[MenuComponent] new note saved');
        this._listOfNotes.push(value)});
    }
  }

  getHibernateNotes(): Note[]{
    return this._listOfNotes.filter(value => value.noteType == "HIBERNATE");
  }
  getSpringNotes(): Note[]{
    return this._listOfNotes.filter(value => value.noteType == "SPRING");
  }
  getAngularNotes(): Note[]{
    return this._listOfNotes.filter(value => value.noteType == "ANGULAR");
  }


  set listOfNotes(value: Note[]) {
    this._listOfNotes = value;
  }

  get listOfNotes(): Note[] {
    return this._listOfNotes;
  }
}
