import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Note} from "../model/note";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  private noteUrl = 'http://localhost:9093/api/note';//todo later change in config so all request would go to springboot app

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private httpClient: HttpClient) { }

  saveNewNote(note: Note): Observable<any>{
    console.log("sending new note request to springboot");
    console.log(note);
    const url = this.noteUrl + '/new';
    return this.httpClient.put(url, note, this.httpOptions);
  }

  getNotes(): Observable<Note[]>{
    const url = this.noteUrl + '/getall';
    return this.httpClient.get<Note[]>(url, this.httpOptions);
  }
}
