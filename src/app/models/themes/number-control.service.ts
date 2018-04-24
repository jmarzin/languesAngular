import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import {ThemeService} from './theme.service';
import {GlobalesService} from '../../globales.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NumberControlService {

  constructor(private themeService: ThemeService, private globales: GlobalesService) { }

  checkNumberUnic(number: number): Observable<boolean> {
    return this.themeService.getThemes(this.globales.currentLanguage.language_id)
      .map(themes => themes.filter(x => x.number === number).length === 0);
  }

}
