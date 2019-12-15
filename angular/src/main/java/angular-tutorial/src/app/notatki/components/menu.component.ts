import {Component, OnInit} from '@angular/core';
import {Note} from "../model/note";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  listOfNotes: Note[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  counter: number = 0;//todo remove when db connection will work
  onNewNote(note: Note) {
    console.log("new note received");//todo change to logger
    console.log(note);
    note.id = this.counter;//todo remove when db connection will work
    this.counter++;//todo remove when db connection will work
    this.listOfNotes.push(note);
  }

  getHibernateNotes(): Note[]{
    return this.listOfNotes.filter(value => value.noteType === "HIBERNATE");
  }
  getSpringNotes(): Note[]{
    return this.listOfNotes.filter(value => value.noteType === "SPRING");
  }
  getAngularNotes(): Note[]{
    return this.listOfNotes.filter(value => value.noteType === "ANGULAR");
  }
}
