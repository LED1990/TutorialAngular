import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {Note} from "../model/note";
import {NoteType} from "../model/enums/note-type.enum";
import {APP_BASE_HREF} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import {AppModule} from "../../app.module";
import {NoteService} from "../services/note.service";
import {NewNoteService} from "../services/new-note-service";
import {MockNoteService} from "../model/mocks/mock-note-service";


describe('MenuComponent', () => {

  let fixture: ComponentFixture<MenuComponent>;
  let comp: MenuComponent;
  let newNoteSpy: NewNoteService;
  let mockNoteService: MockNoteService;

  beforeAll(async(() => {
    mockNoteService = new MockNoteService();
  }));

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
        comp.listOfNotes = mockNoteService.getMockNotes();


        newNoteSpy = jasmine.createSpyObj('NewNoteService', ['changeMessage']);
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
    let resultArray = mockNoteService.getMockNotes();
    for (let i = 0; i < 10; i++) {
      expect(resultArray[i] === comp.listOfNotes[i]);
    }
  }));
});
