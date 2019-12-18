import {Component, OnInit} from '@angular/core';
import {Note} from "../../model/note";
import {MatDialog} from '@angular/material/dialog';
import {NewNoteDialogComponent} from "./new-note-dialog/new-note-dialog.component";
import {NewNoteService} from "../../services/new-note-service";
import {MessagesAndLogsService} from "../../services/messages-and-logs.service";


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  note: Note;
  constructor(private dialog: MatDialog,
              private data: NewNoteService,
              private msg: MessagesAndLogsService) {
  }

  ngOnInit() {
    this.msg.logAndAddMsessage([], '[IntroductionComponent] init()');
  }

  openDialog() {
    this.msg.logAndAddMsessage([], '[IntroductionComponent] opening new note dialog');
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {data: {passedNote: this.note}, minWidth:'600px'});
    dialogRef.afterClosed().subscribe(result => {
      this.msg.logAndAddMsessage([], '[IntroductionComponent] new note dialog closed checking if new note must be emitted');
      if (result !== undefined){
        this.data.changeMessage(result);
        this.msg.logAndAddMsessage([result], '[IntroductionComponent] new note dialog closed adding new note emitted');
      }
    });
  }
}
