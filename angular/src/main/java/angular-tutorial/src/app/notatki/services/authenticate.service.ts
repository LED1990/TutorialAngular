import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessagesAndLogsService} from "./messages-and-logs.service";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private url = 'http://localhost:9093/api/security';

  constructor(private httpClient: HttpClient,
              private msg: MessagesAndLogsService) {
  }

  /**
   * hardcoded login and password - test only
   */
  basicAuth(): Observable<any>{
    this.msg.logAndAddMsessage([], '[AuthenticateService] attempt basic auth');
    let basicUrl = this.url + '/basic';
    const headers = new HttpHeaders({
      //todo later change it to form data
      Authorization: 'Basic ' + btoa('user' + ':' + 'user')
    });
    return this.httpClient.get(basicUrl, {headers}).pipe(
      map(value => {
        this.msg.logAndAddMsessage([value], '[AuthenticateService] basic auth response');
        //todo here use values from login form
        let authVal = 'Basic ' + btoa('user' + ':' + 'user');
        sessionStorage.setItem('authVal', authVal);
        return value;
      }),
      catchError(err => {
        this.msg.logAndAddMsessage([err], '[AuthenticateService] basic auth failed');
        sessionStorage.removeItem('authVal');
        return throwError(err);
      })
    );
  }
}
