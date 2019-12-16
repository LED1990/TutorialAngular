import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Note} from "../../model/note";
import {MatDialog} from '@angular/material/dialog';
import {NewNoteDialogComponent} from "./new-note-dialog/new-note-dialog.component";
import {NewNoteService} from "../../services/new-note-service";



@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  note: Note;
  @Output() newNote = new EventEmitter<Note>();

  constructor(private dialog: MatDialog, private data: NewNoteService) {
  }

  ngOnInit() {
  }

  openDialog() {
    console.log("Opening notesapp dialog");

    const dialogRef = this.dialog.open(NewNoteDialogComponent, {data: {passedNote: this.note}, minWidth:'600px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log("data from new note dialog");//todo replace with common messaging
      console.log(result);
      if (result !== undefined){
        this.data.changeMessage(result);
        console.log("new note emitted")
      }
    });
  }
}
