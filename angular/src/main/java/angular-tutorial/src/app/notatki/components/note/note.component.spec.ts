import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NoteComponent} from './note.component';
import {convertToParamMap} from "@angular/router";
import {of} from "rxjs/internal/observable/of";
import {MaterialModule} from "../../../material/material.module";
import {AppModule} from "../../../app.module";
import {MockNoteService} from "../../model/mocks/mock-note-service";


export class ActivatedRouteMock {
  public paramMap = of(convertToParamMap({
    id: 'abc123',
    anotherId: 'd31e8b48-7309-4c83-9884-4142efdf7271',
  }));
}

describe('NoteComponent', () => {
  let fixture: ComponentFixture<NoteComponent>;
  let comp: NoteComponent;
  let mockNoteService: MockNoteService;

  beforeAll(async () => {
    mockNoteService = new MockNoteService();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AppModule
      ],
      providers: [
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NoteComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

});
