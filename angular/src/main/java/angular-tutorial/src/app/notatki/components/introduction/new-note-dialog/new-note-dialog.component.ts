import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {Note} from "../../../model/note";
import {FormBuilder} from "@angular/forms";
import {NoteType} from "../../../model/enums/note-type.enum";
import {NoteServiceService} from "../../../services/note-service.service";

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.css']
})
export class NewNoteDialogComponent implements OnInit {

  noteTypesEnum = NoteType;
  cancelPressed: boolean;
  selectedFile: File = null;
  // savedNote: Note;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<NewNoteDialogComponent>, private noteService: NoteServiceService) { }
  noteForm = this.fb.group({
    noteType: [''],
    noteTopic: [''],
    noteText: ['']
  });

  ngOnInit() {
    // this.savedNote = undefined;
    console.log("init dialog");
  }

  closeDialog(): void{
    console.log("closing dialog");
    this.cancelPressed = true;
    this.dialogRef.close();
  }
  onSubmit(): void{
    console.log("saving and closing dialog");
    if (this.noteForm.valid && !this.cancelPressed){
      console.log("11111111111");
      if (this.selectedFile !== null){
        console.log("222222222222");
        this.saveImageAndNote();
      } else {
        console.log("33333333333333");
        this.dialogRef.close(new Note(this.noteForm.value));
      }
    }
    this.cancelPressed = false;
  }

  onFileChange(event){
    this.selectedFile = event.target.files[0];
  }
  removeFile(){
    this.selectedFile = null;
  }

  saveImageAndNote(){
    console.log("start save with img");
    let data = new FormData();
    const blob = new Blob([JSON.stringify(new Note(this.noteForm.value))],{type:'application/json'});
    data.append('img', this.selectedFile);
    data.append('note', blob);
    this.noteService.saveNoteImage(data).then(value => {
      console.log('recived value');
      console.log(value);
      this.dialogRef.close(value);
    });
    console.log("end save with img");
  }
}
