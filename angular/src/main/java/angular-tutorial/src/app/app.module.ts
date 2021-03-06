import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './fundamentals/heroes/heroes.component';
import {FormsModule} from "@angular/forms";
import { HeroDetailComponent } from './fundamentals/hero-detail/hero-detail.component';
import { MessagesComponent } from './fundamentals/messages/messages.component';
import { FundamentalsRoutingModule } from './fundamentals/routes/fundamentals-routing.module';
import { DashboardComponent } from './fundamentals/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FundamentalsRoutingModule,
    HttpClientModule//added here is available for everybody
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
