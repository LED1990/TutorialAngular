import {Component, OnInit} from '@angular/core';
import {Note} from "../../model/note";
import {MatDialog} from '@angular/material/dialog';
import {NewNoteDialogComponent} from "./new-note-dialog/new-note-dialog.component";


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  note: Note;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog() {
    console.log("Opening notes dialog");

    const dialogRef = this.dialog.open(NewNoteDialogComponent, {data: {passedNote: this.note}});
    dialogRef.afterClosed().subscribe(result => {
      console.log("data from new note dialog");
      console.log(result);
      this.note = result;
    });
  }
}
