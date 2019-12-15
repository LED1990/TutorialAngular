import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeroesComponent} from './fundamentals/heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeroDetailComponent} from './fundamentals/hero-detail/hero-detail.component';
import {MessagesComponent} from './fundamentals/messages/messages.component';
import {FundamentalsRoutingModule} from './fundamentals/routes/fundamentals-routing.module';
import {DashboardComponent} from './fundamentals/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {MenuComponent} from "./notatki/components/menu.component";
import {MaterialModule} from "./material/material.module";
import {IntroductionComponent} from './notatki/components/introduction/introduction.component';
import {NewNoteDialogComponent} from "./notatki/components/introduction/new-note-dialog/new-note-dialog.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoteRoutesModule} from "./notatki/routes/note-routes.module";

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MenuComponent,
    NewNoteDialogComponent,
    IntroductionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FundamentalsRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NoteRoutesModule,

//added here is available for everybody
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
