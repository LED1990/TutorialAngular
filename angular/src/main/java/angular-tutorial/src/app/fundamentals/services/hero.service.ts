import {Injectable} from '@angular/core';
import {Hero} from "../../classes/fundamentals/hero";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {tap} from "rxjs/internal/operators/tap";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:9093/api/heroes';//todo: later change it (use proxy for 'auto-communication' and don't use full address)
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService,
              private httpClient: HttpClient) {
  }

  // observable required for async operation
  getHeroes(): Observable<Hero[]> {
    this.logging('HeroService fetched heroes list');
    // return of(HEROES); //before http communication with springboot app
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.logging('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    this.logging('Hero retrived. Hero id = ' + id);
    const params = new HttpParams()
      .set('heroID', String(id));
    const url = this.heroesUrl + '/hero';
    return this.httpClient.get<Hero>(url, {params}).pipe(
      tap( () => this.logging('fetched hero id=' + id)),
      catchError(this.handleError<Hero>('getHero id=' + id))
    );
  }

  updateHero(heroToSave: Hero): Observable<any>{
    this.logging('Saveing hero. Hero id = ' + heroToSave.id);
    const url = this.heroesUrl + '/hero';
    return this.httpClient.put(url, heroToSave, this.httpOptions).pipe(
      tap(() => this.logging('updating new hero id=' + heroToSave.id)),
      catchError(this.handleError<Hero>('updating new hero id=' + heroToSave.id))
    );
  }

  private logging(msg: string) {
    this.messageService.addMsg(msg);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //send the error to remote logging infrastructure
      console.error(error); // log to console instead
      //better job of transforming error for user consumption
      this.logging(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
