import { Injectable } from '@angular/core';
import {Hero} from "../../classes/fundamentals/hero";
import {HEROES} from "../../classes/mocks/mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  // observable required for async operation
  getHeroes(): Observable<Hero[]>{
    this.messageService.addMsg('HeroService fetched heroes list');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.addMsg('Hero retrived. Hero id = ' + id);
    return of(HEROES.find(hero => hero.id === id));
  }
}
