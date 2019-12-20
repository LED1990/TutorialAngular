import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {Note} from "../../../model/note";
import {FormBuilder} from "@angular/forms";
import {NoteType} from "../../../model/enums/note-type.enum";
import {NoteService} from "../../../services/note.service";
import {MessagesAndLogsService} from "../../../services/messages-and-logs.service";

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.css']
})
export class NewNoteDialogComponent implements OnInit {

  noteTypesEnum = NoteType;
  cancelPressed: boolean;
  selectedFile: File = null;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<NewNoteDialogComponent>,
              private noteService: NoteService,
              private msg: MessagesAndLogsService) {
  }

  noteForm = this.fb.group({
    noteType: [''],
    noteTopic: [''],
    noteText: ['']
  });

  ngOnInit() {
    this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] init()');
  }

  closeDialog(): void {
    this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] close with cancel');
    this.cancelPressed = true;
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] start saving new note');
    if (this.noteForm.valid && !this.cancelPressed) {
      this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] saving new note - note VALID');
      if (this.selectedFile !== null) {
        this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] saving new note  - note WITH IMAGE');
        this.saveImageAndNote();
      } else {
        this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] saving new note  - note WITHOUT IMAGE');
        this.dialogRef.close(new Note(this.noteForm.value));
      }
    }
    this.cancelPressed = false;
  }

  onFileChange(event) {
    this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] image changed');
    this.selectedFile = event.target.files[0];
  }

  removeFile() {
    this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] image removed');
    this.selectedFile = null;
  }

  saveImageAndNote() {
    this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] start saving image and note');
    let data = new FormData();
    const blob = new Blob([JSON.stringify(new Note(this.noteForm.value))], {type: 'application/json'});
    data.append('img', this.selectedFile);
    data.append('note', blob);
    this.noteService.saveNoteImage(data).then(value => {
      this.msg.logAndAddMsessage([value], '[NewNoteDialogComponent] saving image and note - SUCCESS');
      this.dialogRef.close(value);
    });
    this.msg.logAndAddMsessage([], '[NewNoteDialogComponent] end saving image and note');
  }
}
