import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {FormControl, Validators} from '@angular/forms';
import {GlobalesService} from '../../globales.service';

function mdpValidator(control: FormControl): {[key: string]: any} {
  const entree = control.value;
  if (Md5.hashStr(entree) !== '38b5188c3032225c37392ef863057344') {
    return {erreurMdp: {}};
  }
  return null;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  mdp = new FormControl('', [Validators.required, mdpValidator]);

  onSubmit() {
      this.globales.administrateur = this.mdp.valid;
  }

  constructor(public globales: GlobalesService) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.mdp.hasError('required') ? 'Vous devez entrer un mot de passe' :
      this.mdp.hasError('erreurMdp') ? 'Word de passe erroné' : '';
  }
}
