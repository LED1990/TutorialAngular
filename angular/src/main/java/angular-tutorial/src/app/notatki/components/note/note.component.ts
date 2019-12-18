import {Component, OnInit} from '@angular/core';
import {Note} from "../../model/note";
import {NoteServiceService} from "../../services/note-service.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  currentNote: Note;
  imageBlob: string | ArrayBuffer = null;

  constructor(private noteService: NoteServiceService, private route: ActivatedRoute, private router: Router) {
    this.checkEvent(this.router);
  }

  ngOnInit() {
    this.getNoteFromService();
    this.getNoteImageFromService();
  }

  private checkEvent(router: Router) {
    console.log("event event event");
    router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.getNoteFromService();
        this.getNoteImageFromService();
      }
    });
  }

  private getNoteFromService() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.noteService.getNoteById(id).subscribe(value => this.currentNote = value);
  }

  private getNoteImageFromService() {
    console.log("getting note with image!");
    const id = +this.route.snapshot.paramMap.get('id');
    this.noteService.getNoteImage(id).subscribe(value => {
      console.log("recieved blob");
      console.log(value);
      this.blobToImage(value)},
        error1 => console.log(error1));
  }

  private blobToImage(image: Blob) {
    if (image.size >0){
      let reader = new FileReader();
      reader.addEventListener("load", () => this.imageBlob = reader.result);
      if (image){
        console.log("recieved image");
        console.log(image);
        reader.readAsDataURL(image);
      }
    }else {
      this.imageBlob = undefined;
    }
  }
}
