import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IntroductionComponent} from "../components/introduction/introduction.component";
import {NoteComponent} from "../components/note/note.component";

const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'intro', component: IntroductionComponent},
  { path: 'note/:id', component: NoteComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class NoteRoutesModule { }
