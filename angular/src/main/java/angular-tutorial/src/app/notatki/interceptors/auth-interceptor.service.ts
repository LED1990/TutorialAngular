import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {MessagesAndLogsService} from "../services/messages-and-logs.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
/**
 * Interceptors intercept all request
 * it would be possible to add auth header to every request here
 * for test auth header are added inside services
 */
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private msg: MessagesAndLogsService, private cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (sessionStorage.getItem('authVal') === null) {
      this.msg.logAndAddMsessage([], '[AuthInterceptorService] user not authenticated');
      req = req.clone({
        withCredentials: true,
      });
    } else {
      this.msg.logAndAddMsessage([], '[AuthInterceptorService] user authenticated adding csrf token');
      let csrfToken = this.cookieService.get('XSRF-TOKEN');
      req = req.clone({
        withCredentials: true,
        headers: new HttpHeaders({
          'X-XSRF-TOKEN': csrfToken
        })
      });
    }

    return next.handle(req).pipe(
      map(value => {
        this.msg.logAndAddMsessage([value], '[AuthInterceptorService] response');
        return value;
      }),
      catchError(err => {
        //here it would be possible to redirect unauthenticated user to required page if status code is 401
        if (err.status === 401) {
          this.msg.logAndAddMsessage([err], '[AuthInterceptorService] failed');
        }
        return throwError(err);
      })
    );
  }


}
