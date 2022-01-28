import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

import { People } from '../models/people/people.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeopleListCrudService {
  private url = `${environment.SERVER_URL}/people`;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}

  fetchAll(): Observable<People[]> {
    return this.http.get<People[]>(this.url, { responseType: 'json' }).pipe(
      tap((_) => console.log('fetched people')),
      catchError(this.errorHandlerService.handleError<People[]>('fetchAll', []))
    );
  }

  post(people: People): Observable<any> {
    console.log(people);
    return this.http
      .post<People>(this.url, people, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>('post')));
  }

  update(people: People): Observable<any> {
    return this.http
      .put<People>(this.url, people, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>('update')));
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete<People>(`${this.url}/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>('delete')));
  }
}
