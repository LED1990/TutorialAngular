import {Component, OnInit} from '@angular/core';
import {Note} from "../../model/note";
import {NoteService} from "../../services/note.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MessagesAndLogsService} from "../../services/messages-and-logs.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  private _currentNote: Note;
  private _imageBlob: string | ArrayBuffer = null;

  constructor(private noteService: NoteService,
              private route: ActivatedRoute,
              private router: Router,
              private msg: MessagesAndLogsService) {
    this.checkEvent(this.router);
  }

  ngOnInit() {
    this.msg.logAndAddMsessage([], '[NoteComponent] init()');
  }

  private checkEvent(router: Router) {
    router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        //todo restrict only note component invokcation
        this.msg.logAndAddMsessage([], '[NoteComponent] opening existing note');
        this.getNoteFromService();
        this.getNoteImageFromService();
      }
    });
  }

  private getNoteFromService() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.noteService.getNoteById(id).subscribe(value => {
      this.msg.logAndAddMsessage([value], '[NoteComponent] note downloaded from server');
      this._currentNote = value
    });
  }

  private getNoteImageFromService() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.noteService.getNoteImage(id).subscribe(value => {
      this.msg.logAndAddMsessage([value], '[NoteComponent] notes image downloaded form server');
      this.blobToImage(value)
    });
  }

  private blobToImage(image: Blob) {
    if (image.size > 0) {
      this.msg.logAndAddMsessage([], '[NoteComponent] converting image');
      let reader = new FileReader();
      reader.addEventListener("load", () => this._imageBlob = reader.result);
      if (image) {
        this.msg.logAndAddMsessage([], '[NoteComponent] image converted');
        reader.readAsDataURL(image);
      }
    } else {
      this.msg.logAndAddMsessage([], '[NoteComponent] notes doesnt have image');
      this._imageBlob = undefined;
    }
  }


  get currentNote(): Note {
    return this._currentNote;
  }

  get imageBlob(): string | ArrayBuffer {
    return this._imageBlob;
  }
}
