import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Note} from "../model/note";
import {Observable} from "rxjs";
import {MessagesAndLogsService} from "./messages-and-logs.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private noteUrl = 'http://localhost:9093/api/notes';//todo later change in config so all request would go to springboot app

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient,
              private msg: MessagesAndLogsService) {
  }

  saveNewNote(note: Note): Observable<Note> {
    this.msg.logAndAddMsessage([note], '[NoteService] sending new note to server');
    const url = this.noteUrl + '/new';
    return this.httpClient.put<Note>(url, note, this.httpOptions);
  }

  getNotes(): Observable<Note[]> {
    this.msg.logAndAddMsessage([], '[NoteService] getting all notes from server');
    const url = this.noteUrl + '/getall';
    return this.httpClient.get<Note[]>(url, this.httpOptions);
  }

  getNoteById(id: number): Observable<Note> {
    this.msg.logAndAddMsessage([id], '[NoteService] getting note by ID from server');
    const url = this.noteUrl + '/note';
    const params = new HttpParams()
      .set('id', String(id));
    return this.httpClient.get<Note>(url, {params});
  }

  saveNoteImage(formData: FormData): Promise<Note> {
    this.msg.logAndAddMsessage([], '[NoteService] sending new image to server');
    const opt = {
      headers: new HttpHeaders({})
    };
    const url = this.noteUrl + '/file';
    return this.httpClient.put<Note>(url, formData, opt).toPromise();
  }

  getNoteImage(id: number): Observable<Blob> {
    this.msg.logAndAddMsessage([], '[NoteService] getting image from server');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const url = this.noteUrl + '/note/image';
    const params = new HttpParams()
      .set('id', String(id));

    const opt = {
      headers: headers,
      params: params,
      responseType: 'blob' as 'json'
    };
    return this.httpClient.get<Blob>(url, opt);
  }

}
