import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MatCardModule, MatSelectModule, MatTableModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GlobalesService } from './globales.service';
import { LanguageService } from './models/languages/language.service';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LanguagesComponent } from './components/languages/languages.component';
import { AdminComponent } from './components/admin/admin.component';
import { LanguageDetailComponent } from './components/language-detail/language-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material';
import { ThemeService } from './models/themes/theme.service';
import { ThemesComponent } from './components/themes/themes.component';
import { WordService } from './models/words/word.service';
import { ThemeDetailComponent } from './components/theme-detail/theme-detail.component';
import { NumberControlService } from './models/themes/number-control.service';
import { ThemeWordsComponent } from './components/theme-words/theme-words.component';
import { WordDetailComponent } from './components/word-detail/word-detail.component';
import { WordEditComponent } from './components/word-edit/word-edit.component';
import { WordFormService } from './components/word-edit/word-form.service';
import { InFrenchControlService } from './models/words/in-french-control.service';
import { WordsNewComponent } from './components/words-new/words-new.component';
import { FormsTypesService } from './models/forms-types/forms-types.service';
import { FormsTypesComponent } from './components/forms-types/forms-types.component';
import { FormsTypesEditComponent } from './components/forms-types-edit/forms-types-edit.component';
import { VerbsFormService } from './models/verbs-forms/verbs-form.service';
import { FormsTypesFormService } from './components/forms-types-edit/forms-types-form.service';
import { VerbsComponent } from './components/verbs/verbs.component';
import { VerbService } from './models/verbs/verb.service';
import { VerbDetailComponent } from './components/verb-detail/verb-detail.component';
import { VerbDetailEditComponent } from './components/verb-detail-edit/verb-detail-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LanguagesComponent,
    AdminComponent,
    LanguageDetailComponent,
    ThemesComponent,
    ThemeDetailComponent,
    ThemeWordsComponent,
    WordDetailComponent,
    WordEditComponent,
    WordsNewComponent,
    FormsTypesComponent,
    FormsTypesEditComponent,
    VerbsComponent,
    VerbDetailComponent,
    VerbDetailEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
    HttpClientModule
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [GlobalesService, LanguageService, InMemoryDataService, ThemeService, WordService, NumberControlService,
              WordFormService, InFrenchControlService, FormsTypesService, VerbsFormService, FormsTypesFormService, VerbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
