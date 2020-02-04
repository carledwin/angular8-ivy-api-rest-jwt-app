import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

        let token = window.localStorage.getItem('token');

        if(token) {
            httpRequest = httpRequest.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }

        return httpHandler.handle(httpRequest);
    }
}