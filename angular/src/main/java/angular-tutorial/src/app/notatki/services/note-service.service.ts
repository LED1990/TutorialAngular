import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Note} from "../model/note";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  private noteUrl = 'http://localhost:9093/api/notes';//todo later change in config so all request would go to springboot app

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private httpClient: HttpClient) { }

  saveNewNote(note: Note): Observable<Note>{
    console.log("sending new note request to springboot");
    console.log(note);
    const url = this.noteUrl + '/new';
    return this.httpClient.put<Note>(url, note, this.httpOptions);
  }

  getNotes(): Observable<Note[]>{
    const url = this.noteUrl + '/getall';
    return this.httpClient.get<Note[]>(url, this.httpOptions);
  }

  getNoteById(id: number): Observable<Note>{
    const url = this.noteUrl + '/note';
    const params = new HttpParams()
      .set('id', String(id));
    return this.httpClient.get<Note>(url, {params});
  }

  saveNoteImage(formData: FormData): Promise<Note>{
    console.log("sending new note with image request to springboot");
    const opt = {
      headers: new HttpHeaders({  })
    };

    const url = this.noteUrl + '/file';
    return this.httpClient.put<Note>(url, formData, opt).toPromise();
  }

  getNoteImage(id: number): Observable<Blob>{
    console.log("getting image form spring boot to note: " + id);
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
      responseType: 'blob' as 'json'//todo potrzebne?
    };
    console.log("request!");
    return this.httpClient.get<Blob>(url, opt);
  }

}
