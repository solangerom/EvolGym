import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CommonsService } from './commons.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private commonservice: CommonsService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        authorization: `Bearer ${this.commonservice.getToken()}`,
      },
    });

    return next.handle(req);
  }
}
