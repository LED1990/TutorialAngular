import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {Note} from "../../../model/note";
import {FormBuilder} from "@angular/forms";
import {NoteType} from "../../../model/enums/note-type.enum";

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.css']
})
export class NewNoteDialogComponent implements OnInit {

  noteTypesEnum = NoteType;
  cancelPressed: boolean;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<NewNoteDialogComponent>) { }
  noteForm = this.fb.group({
    noteType: [''],
    noteTopik: [''],
    noteText: ['']
  });

  ngOnInit() {
  }

  closeDialog(): void{
    console.log("closing dialog");
    this.cancelPressed = true;
    this.dialogRef.close();
  }
  onSubmit(): void{
    console.log("saving and closing dialog");
    if (this.noteForm.valid && !this.cancelPressed){
      this.dialogRef.close(new Note(this.noteForm.value));
    }
    this.cancelPressed = false;
  }
}
