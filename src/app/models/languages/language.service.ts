import { Injectable } from '@angular/core';
import {Language} from './language';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {GlobalesService} from '../../globales.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LanguageService {

  constructor(private http: HttpClient,
              private globales: GlobalesService) { }

  private languagesUrl = this.globales.prefixeHttp + 'api/languages';  // URL to web api

  /** GET languages from the server */
  getLanguages (): Observable<Language[]> {
    const res = this.http.get<Language[]>(this.languagesUrl);
    return res
      .pipe(
        catchError(this.handleError('getLanguages', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getLanguage(id: number): Observable<Language> {
    const url = `${this.languagesUrl}/${id}`;
    return this.http.get<Language>(url).pipe(
      catchError(this.handleError<Language>(`getLanguage id=${id}`))
    );
  }

  /** DELETE: delete the language from the server */
  deleteLanguage (language: Language | number): Observable<Language> {
    const id = typeof language === 'number' ? language : language.id;
    const url = `${this.languagesUrl}/${id}`;

    return this.http.delete<Language>(url, httpOptions).pipe(
      catchError(this.handleError<Language>('deleteLanguage'))
    );
  }

  /** POST: add a new language to the server */
  addLanguage (language: Language): Observable<Language> {
    return this.http.post<Language>(this.languagesUrl, language, httpOptions)
      .pipe(
      catchError(this.handleError<Language>('addLanguage'))
    );
  }

  /** PUT: update the language on the server */
  updateLanguage (language: Language): Observable<any> {
    const url = `${this.languagesUrl}/${language.id}`;
    return this.http.put(url, language, httpOptions).pipe(
      catchError(this.handleError<any>('updateLanguage'))
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
