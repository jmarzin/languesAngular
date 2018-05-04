import { Injectable } from '@angular/core';
import {Theme} from './theme';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {GlobalesService} from '../../globales.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ThemeService {

  constructor(private http: HttpClient,
              private globales: GlobalesService) { }

  private themesUrl = this.globales.prefixeHttp + 'api/themes';  // URL to web api

  /** GET themes from the server */
  getThemes (language_id: string): Observable<Theme[]> {
    if (!language_id.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Theme[]>(`${this.themesUrl}/${language_id}`)
      .pipe(
        catchError(this.handleError('getThemes', []))
      );
  }

  /** GET theme by id. Will 404 if id not found */
  getTheme (id: number): Observable<Theme> {
    const url = `${this.themesUrl}/${id}`;
    return this.http.get<Theme>(url).pipe(
      catchError(this.handleError<Theme>(`getTheme id=${id}`))
    );
  }

  /** DELETE: delete the theme from the server */
  deleteTheme (theme: Theme | number): Observable<Theme> {
    const id = typeof theme === 'number' ? theme : theme.id;
    const url = `${this.themesUrl}/${id}`;

    return this.http.delete<Theme>(url, httpOptions).pipe(
      catchError(this.handleError<Theme>('deleteTheme'))
    );
  }

  /** POST: add a new theme to the server */
  addTheme (theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(this.themesUrl, theme, httpOptions)
      .pipe(
        catchError(this.handleError<Theme>('addTheme'))
      );
  }

  /** PUT: update the theme on the server */
  updateTheme (theme: Theme): Observable<any> {
    return this.http.put(this.themesUrl, theme, httpOptions).pipe(
      catchError(this.handleError<any>('updateTheme'))
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
