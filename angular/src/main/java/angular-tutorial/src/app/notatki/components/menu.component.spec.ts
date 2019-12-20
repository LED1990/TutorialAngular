import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {Note} from "../model/note";
import {NoteType} from "../model/enums/note-type.enum";
import {APP_BASE_HREF} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import {AppModule} from "../../app.module";
import {NoteService} from "../services/note.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {of} from "rxjs/internal/observable/of";
import {NewNoteService} from "../services/new-note-service";


describe('MenuComponent', () => {

  let fixture: ComponentFixture<MenuComponent>;
  let comp: MenuComponent;
  let newNoteSpy: NewNoteService;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {provide: APP_BASE_HREF, useValue: ''},
          {provide: NoteService, useClass: MockNoteService},
        ],
        imports: [
          MaterialModule,
          AppModule
        ]

      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(MenuComponent);
        comp = fixture.componentInstance;//getting instance for every test
        comp.listOfNotes = getMockNotes();


        newNoteSpy = jasmine.createSpyObj('NewNoteService',['changeMessage']);
      });

    }
  ));

  it('should return only hibernate notes', async(() => {
    comp.getHibernateNotes().forEach(obj => {
      expect(obj.noteType).toEqual(NoteType.HIBERNATE);
    });
  }));

  it('should return only spring notes', async(() => {
    comp.getSpringNotes().forEach(obj => {
      expect(obj.noteType).toEqual(NoteType.SPRING);
    });
  }));

  it('should return only angular notes', async(() => {
    comp.getAngularNotes().forEach(obj => {
      expect(obj.noteType).toEqual(NoteType.ANGULAR);
    });
  }));

  it('should add new note which already has ID = 99', async(() => {
    let noteWithID = new Note();
    noteWithID.id = 99;
    noteWithID.noteText = 'note with id equal to 99';
    comp.onNewNote(noteWithID);
    expect(comp.listOfNotes).toContain(noteWithID);
  }));

  it('should add new note received from external service (note id 100)', async(() => {
    let newNote = new Note();
    newNote.noteText = 'new note from external service with ID = 100';
    comp.onNewNote(newNote);
    expect(comp.listOfNotes.some(value => value.id == 100)).toBeTruthy()
  }));

  it('should get notes from external service within ngOnInit()', async(() => {
    expect(comp.listOfNotes.length == 10).toBeTruthy();
    let resultArray = getMockNotes();
    for (let i = 0; i < 10; i++) {
      expect(resultArray[i] === comp.listOfNotes[i]);
    }
  }));
});

@Injectable({
  providedIn: 'root'
})
export class MockNoteService {
  saveNewNote(note: Note): Observable<Note> {
    note.id = 100;
    return of(note);
  }

  getNotes(): Observable<Note[]> {
    let notes = getMockNotes();
    return of(notes);
  }
}

function getMockNotes(): Note[] {
  let notes: Note[] = [];
  for (let i = 0; i < 10; i++) {
    let note = new Note();
    note.id = i;
    note.noteText = 'text ' + i;
    note.noteTopic = 'topic ' + i;
    if (i < 3) {
      note.noteType = NoteType.HIBERNATE;
    }
    if (i >= 3 && i < 7) {
      note.noteType = NoteType.ANGULAR;
    }
    if (i > 6) {
      note.noteType = NoteType.SPRING;
    }
    notes.push(note);
  }
  return notes;
}
