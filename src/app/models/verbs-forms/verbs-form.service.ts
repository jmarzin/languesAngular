import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {VerbsForm} from './verbs-form';

@Injectable()
export class VerbsFormService {

  constructor(private http: HttpClient) { }

  private verbsFormsUrl = 'api/verbsforms';  // URL to web api

  getVerbsFormsByFormType (form_type_id: number): Observable<VerbsForm[]> {
    if (form_type_id === 0) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<VerbsForm[]>(`api/verbsforms/?form_type_id=${form_type_id}`)
      .pipe(
        catchError(this.handleError('getWordsByTheme', []))
      );
  }

  getVerbsFormsByVerb (verb_id: number): Observable<VerbsForm[]> {
    if (verb_id === 0) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<VerbsForm[]>(`api/verbsforms/?verb_id=${verb_id}`)
      .pipe(
        catchError(this.handleError('getVerbsFormsByVerb', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
