import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {MessagesAndLogsService} from "../services/messages-and-logs.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Interceptors intercept all request
 * it would be possible to add auth header to every request here
 * for test auth header are added inside services
 */
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private msg: MessagesAndLogsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('basic') !== -1){
      //basic auth example
      return next.handle(req).pipe(
        map(value => {
          this.msg.logAndAddMsessage([value], '[AuthInterceptorService] basic auth response');
          return value;
        }),
       catchError(err => {
         //here it would be possible to redirect unauthenticated user to required page if status code is 401
         if (err.status === 401){
           this.msg.logAndAddMsessage([err],'[AuthInterceptorService] basic auth failed');
         }
         return throwError(err);
       })
      );
    }

    //just let other requests
    return next.handle(req);
  }


}
