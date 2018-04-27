import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {Verb} from './verb';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VerbService {

  constructor(private http: HttpClient) { }

  private verbsUrl = 'api/verbs';  // URL to web api

  /** GET verbs from the server */
  getVerbs (language_id: string): Observable<Verb[]> {
    if (!language_id.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Verb[]>(`api/verbs/?language_id=${language_id}`)
      .pipe(
        catchError(this.handleError('getVerbs', []))
      );
  }

  /** GET verb by id. Will 404 if id not found */
  getVerb (id: number): Observable<Verb> {
    const url = `${this.verbsUrl}/${id}`;
    return this.http.get<Verb>(url).pipe(
      catchError(this.handleError<Verb>(`getVerb id=${id}`))
    );
  }

  /** DELETE: delete the verb from the server */
  deleteVerb (verb: Verb | number): Observable<Verb> {
    const id = typeof verb === 'number' ? verb : verb.id;
    const url = `${this.verbsUrl}/${id}`;

    return this.http.delete<Verb>(url, httpOptions).pipe(
      catchError(this.handleError<Verb>('deleteVerb'))
    );
  }

  /** POST: add a new verb to the server */
  addVerb (verb: Verb): Observable<Verb> {
    return this.http.post<Verb>(this.verbsUrl, verb, httpOptions)
      .pipe(
        catchError(this.handleError<Verb>('addVerb'))
      );
  }

  /** PUT: update the verb on the server */
  updateVerb (verb: Verb): Observable<any> {
    return this.http.put(this.verbsUrl, verb, httpOptions).pipe(
      catchError(this.handleError<any>('updateVerb'))
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
