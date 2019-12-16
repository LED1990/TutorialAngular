import {Component, OnDestroy, OnInit} from '@angular/core';
import {Note} from "../model/note";
import {NoteServiceService} from "../services/note-service.service";
import {NewNoteService} from "../services/new-note-service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  listOfNotes: Note[] = [];

  constructor(private noteService: NoteServiceService, private data: NewNoteService) {
  }

  ngOnInit() {
    this.data.currentMsg.subscribe(value => {
      if (value !== undefined){
        this.onNewNote(value)
      }
    });
    this.noteService.getNotes().subscribe(value => {
      for (let val of value){
        this.listOfNotes.push(val);
      }
    });
  }

  onNewNote(note: Note) {
    console.log("new note received");//todo change to logger
    console.log(note);
    this.noteService.saveNewNote(note).subscribe(value => this.listOfNotes.push(value));

    //todo some error logging
  }

  getHibernateNotes(): Note[]{
    return this.listOfNotes.filter(value => value.noteType == "HIBERNATE");
  }
  getSpringNotes(): Note[]{
    return this.listOfNotes.filter(value => value.noteType == "SPRING");
  }
  getAngularNotes(): Note[]{
    return this.listOfNotes.filter(value => value.noteType == "ANGULAR");
  }
}
