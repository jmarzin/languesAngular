import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {FormsTypes} from './forms-types';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FormsTypesService {

  constructor(private http: HttpClient) { }

  private formsTypesUrl = 'api/formstypes';  // URL to web api

  /** GET verbs-forms-types from the server */
  getFormsTypes (language_id: string): Observable<FormsTypes[]> {
    if (!language_id.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<FormsTypes[]>(`api/formstypes/?language_id=${language_id}`)
      .pipe(
        catchError(this.handleError('getFormsTypes', []))
      );
  }

  /** POST: add a new formsType to the server */
  addFormsType (formsType: FormsTypes): Observable<FormsTypes> {
    return this.http.post<FormsTypes>(this.formsTypesUrl, formsType, httpOptions)
      .pipe(
        catchError(this.handleError<FormsTypes>('addFormType'))
      );
  }

  /** PUT: update the formsType on the server */
  updateFormsType (formsType: FormsTypes): Observable<any> {
    return this.http.put(this.formsTypesUrl, formsType, httpOptions).pipe(
      catchError(this.handleError<any>('updateFormsType'))
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
