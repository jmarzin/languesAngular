import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LanguagesComponent} from './components/languages/languages.component';
import {AdminComponent} from './components/admin/admin.component';
import {LanguageDetailComponent} from './components/language-detail/language-detail.component';
import {ThemesComponent} from './components/themes/themes.component';
import {ThemeDetailComponent} from './components/theme-detail/theme-detail.component';
import {ThemeWordsComponent} from './components/theme-words/theme-words.component';
import {WordDetailComponent} from './components/word-detail/word-detail.component';
import {WordEditComponent} from './components/word-edit/word-edit.component';
import {WordsNewComponent} from './components/words-new/words-new.component';

const routes: Routes = [
  { path: 'languages', component: LanguagesComponent },
  { path: 'languages/new', component: LanguageDetailComponent },
  { path: 'languages/:id', component: LanguageDetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'themes', component: ThemesComponent },
  { path: 'themes/new', component: ThemeDetailComponent },
  { path: 'themes/:id/edit', component: ThemeDetailComponent},
  { path: 'themes/:id/words', component: ThemeWordsComponent},
  { path: 'words/:id', component: WordDetailComponent},
  { path: 'words/:id/edit', component: WordEditComponent},
  { path: 'themes/:id/words/new', component: WordsNewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }