import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInput,
  MatInputModule, MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NewNoteDialogComponent} from "../notatki/components/introduction/new-note-dialog/new-note-dialog.component";


@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatInput,
    MatListModule,
  ],
  providers: [
    MatDialogModule,
  ],
  entryComponents: [NewNoteDialogComponent]
})
export class MaterialModule { }
