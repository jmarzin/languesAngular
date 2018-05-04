import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordService} from './word.service';
import {GlobalesService} from '../../globales.service';
import {Theme} from '../themes/theme';

@Injectable()
export class InFrenchControlService {

  constructor(private wordService: WordService) { }

  checkInFrenchUnic(in_french: string, language_id: string): Observable<Theme[]> {
    return this.wordService.getThemesWithInFrenchInWord(in_french, language_id);
  }
}
