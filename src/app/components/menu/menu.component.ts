import { Component } from '@angular/core';
import {GlobalesService} from '../../globales.service';
import {Language} from '../../models/langues/language';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  iconUrl: String;

  constructor(public globales: GlobalesService, private router: Router) { }

  setCurrentLanguage(language: Language): void {
    this.globales.currentLanguage = language;
    this.iconUrl = `./assets/${this.globales.currentLanguage.icon}`;
    this.router.navigateByUrl('/');
  }
}
