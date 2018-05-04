import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {VerbsForm} from './verbs-form';
import {GlobalesService} from '../../globales.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VerbsFormService {

  constructor(private http: HttpClient,
              private globales: GlobalesService) { }

  private verbsFormsUrl = this.globales.prefixeHttp + 'api/verbsforms';  // URL to web api

  getVerbsFormsByFormType (form_type_id: number): Observable<any> {
    if (form_type_id === 0) {
      // if not search term, return empty hero array.
      return of({});
    }
    return this.http.get<any>(
      `${this.verbsFormsUrl}?form_type_id=${form_type_id}`)
      .pipe(
        catchError(this.handleError('getVerbsFormsByFormType', {}))
      );
  }

  getVerbsFormsByVerb (verb_id: number): Observable<VerbsForm[]> {
    if (verb_id === 0) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<VerbsForm[]>(`${this.verbsFormsUrl}?verb_id=${verb_id}`)
      .pipe(
        catchError(this.handleError('getVerbsFormsByVerb', []))
      );
  }

  /** DELETE: delete the verb-form from the server */
  deleteVerbsForm (verbsForm: VerbsForm | number): Observable<VerbsForm> {
    const id = typeof verbsForm === 'number' ? verbsForm : verbsForm.id;
    const url = `${this.verbsFormsUrl}/${id}`;

    return this.http.delete<VerbsForm>(url, httpOptions).pipe(
      catchError(this.handleError<VerbsForm>('deleteVerbsForm'))
    );
  }

  /** POST: add a new verb-form to the server */
  addVerbsForm (verbsForm: VerbsForm): Observable<VerbsForm> {
    return this.http.post<VerbsForm>(this.verbsFormsUrl, verbsForm, httpOptions)
      .pipe(
        catchError(this.handleError<VerbsForm>('addVerbsForm'))
      );
  }

  /** PUT: update the verb-form on the server */
  updateVerbsForm (verbsForm: VerbsForm): Observable<any> {
    return this.http.put(this.verbsFormsUrl, verbsForm, httpOptions).pipe(
      catchError(this.handleError<any>('updateVerbsForm'))
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
