import { Injectable } from '@angular/core';
import {Word} from './word';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {GlobalesService} from '../../globales.service';
import {Theme} from '../themes/theme';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WordService {

  constructor(private http: HttpClient,
              private globales: GlobalesService) { }

  private wordsUrl = this.globales.prefixeHttp + 'api/words';  // URL to web api

  /** GET word by id. Will 404 if id not found */
  getWord (id: number): Observable<Word> {
    const url = `${this.wordsUrl}/${id}`;
    return this.http.get<Word>(url).pipe(
      catchError(this.handleError<Word>(`getWord id=${id}`))
    );
  }

  getWordsByTheme (theme_id: number): Observable<Word[]> {
    if (theme_id === 0) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Word[]>(`${this.wordsUrl}?theme_id=${theme_id}`)
      .pipe(
        catchError(this.handleError('getWordsByTheme', []))
      );
  }

  getCountWordsByTheme (theme_id: number): Observable<any> {
    if (theme_id === 0) {
      // if not search term, return empty hero array.
      return of(0);
    }
    return this.http.get<any>(`${this.wordsUrl}?theme_id=${theme_id}&count_only=true`)
      .pipe(
        catchError(this.handleError('getWordsByTheme', null))
      );
  }

  getThemesWithInFrenchInWord(in_french: string, language_id: string): Observable<Theme[]> {
    if (in_french.trim().length === 0) {
      return of([]);
    }
    return this.http.get<Theme[]>(`${this.wordsUrl}/?in_french=${in_french}&language_id=${language_id}`)
      .pipe(
        catchError(this.handleError('ThemesWithInFrenchInWord', []))
    );
  }

  /** POST: add a new word to the server */
  addWord (word: Word): Observable<Word> {
    return this.http.post<Word>(this.wordsUrl, word, httpOptions)
      .pipe(
        catchError(this.handleError<Word>('addWord'))
      );
  }

  /** PUT: update the word on the server */
  updateWord (word: Word): Observable<any> {
    return this.http.put(this.wordsUrl, word, httpOptions).pipe(
      catchError(this.handleError<any>('updateWord'))
    );
  }

  /** DELETE: delete the word from the server */
  deleteWord (word: Word | number): Observable<Word> {
    const id = typeof word === 'number' ? word : word.id;
    const url = `${this.wordsUrl}/${id}`;

    return this.http.delete<Word>(url, httpOptions).pipe(
      catchError(this.handleError<Word>('deleteWord'))
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

