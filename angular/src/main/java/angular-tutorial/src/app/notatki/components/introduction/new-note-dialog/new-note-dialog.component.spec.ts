import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoteDialogComponent } from './new-note-dialog.component';
import {MaterialModule} from "../../../../material/material.module";
import {AppModule} from "../../../../app.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

describe('NewNoteDialogComponent', () => {
  let fixture: ComponentFixture<NewNoteDialogComponent>;
  let comp: NewNoteDialogComponent;
  // let mockNoteService: MockNoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [
        MaterialModule,
        AppModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NewNoteDialogComponent);
      comp = fixture.componentInstance;
    })
  }));

  it('should create component', async(() => {
    expect(comp).toBeTruthy();
  }));

  it('should close dialog with cancel', async(() => {

  }));

});
