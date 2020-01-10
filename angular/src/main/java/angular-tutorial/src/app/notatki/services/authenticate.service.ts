import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessagesAndLogsService} from "./messages-and-logs.service";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {User} from "../model/user";

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
  basicAuth(user: User): Observable<any> {
    this.msg.logAndAddMsessage([], '[AuthenticateService] attempt basic auth');
    let basicUrl = this.url + '/basic';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(user.login + ':' + user.password)
    });
    return this.httpClient.get(basicUrl, {headers}).pipe(
      map(value => {
        this.msg.logAndAddMsessage([value], '[AuthenticateService] basic auth response');
        let authVal = 'Basic ' + btoa(user.login + ':' + user.password);
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

  sendRequest(userNumber: number): Observable<any> {
    this.msg.logAndAddMsessage([], '[AuthenticateService] attempt get resource: /api/security/user' + userNumber);
    let basicUrl = this.url + '/user' + userNumber;
    const headers = new HttpHeaders();

    return this.httpClient.get(basicUrl, {headers}).pipe(
      map(value => {
        this.msg.logAndAddMsessage([value], '[AuthenticateService] Users ' + userNumber + ' resource');
        return value['msg'];
      }),
      catchError(err => {
        this.msg.logAndAddMsessage([err], '[AuthenticateService] attempt to get resource FAILED');
        return throwError(err.error.message);
      })
    );
  }

  logout(): Observable<any> {
    let basicUrl = this.url + '/logout';
    const headers = new HttpHeaders();
    return this.httpClient.post(basicUrl, null, {headers}).pipe(
      map(value => {
        this.msg.logAndAddMsessage([value], '[AuthenticateService] user logged out');
        return value
      }),
      catchError(err => {
        this.msg.logAndAddMsessage([err], '[AuthenticateService] logout failed');
        return err;
      })
    );
  }
}
