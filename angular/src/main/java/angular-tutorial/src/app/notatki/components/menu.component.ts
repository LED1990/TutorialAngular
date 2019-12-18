import {Component, OnInit} from '@angular/core';
import {Note} from "../model/note";
import {NoteServiceService} from "../services/note-service.service";
import {NewNoteService} from "../services/new-note-service";
import {MessagesAndLogsService} from "../services/messages-and-logs.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  private listOfNotes: Note[] = [];

  constructor(private msg: MessagesAndLogsService,
              private noteService: NoteServiceService,
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
    this.noteService.getNotes().subscribe(value => {
      this.msg.logAndAddMsessage([value], '[MenuComponent] getting all notes from server (without img and text)');
      for (let val of value){
        this.listOfNotes.push(val);
      }
    });
  }

  onNewNote(note: Note) {
    if (note.id !== undefined){
      this.msg.logAndAddMsessage([note.id], '[MenuComponent] adding new note - note has ID');
      this.listOfNotes.push(note);
    } else {
      this.msg.logAndAddMsessage([], '[MenuComponent] saving new note');
      this.noteService.saveNewNote(note).subscribe(value => {
        this.msg.logAndAddMsessage([value], '[MenuComponent] new note saved');
        this.listOfNotes.push(value)});
    }
  }

  getHibernateNotes(): Note[]{//todo change to pipe
    return this.listOfNotes.filter(value => value.noteType == "HIBERNATE");
  }
  getSpringNotes(): Note[]{
    return this.listOfNotes.filter(value => value.noteType == "SPRING");
  }
  getAngularNotes(): Note[]{
    return this.listOfNotes.filter(value => value.noteType == "ANGULAR");
  }
}
