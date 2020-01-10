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
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {MenuComponent} from "./notatki/components/menu.component";
import {MaterialModule} from "./material/material.module";
import {IntroductionComponent} from './notatki/components/introduction/introduction.component';
import {NewNoteDialogComponent} from "./notatki/components/introduction/new-note-dialog/new-note-dialog.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoteRoutesModule} from "./notatki/routes/note-routes.module";
import { NoteComponent } from './notatki/components/note/note.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { SecurityComponent } from './notatki/components/security/security.component';
import {AuthInterceptorService} from "./notatki/interceptors/auth-interceptor.service";
import {CookieService} from "ngx-cookie-service";

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
    NoteComponent,
    SecurityComponent,
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
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs', //this may be endpoint to server with logs - elasticsearch?
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    }),
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    })

//added here is available for everybody
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
