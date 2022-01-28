import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleListCrudService } from '../services/people.service';
import { People } from '../models/people/people.interface';

import { tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formGroup: FormGroup;
  searchText: any;
  people$: Observable<People[]>;
  constructor(
    private peopleListCrudService: PeopleListCrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.people$ = this.fetchAll();

    this.initValues();
  }
  initValues(): void {
    this.formGroup = new FormGroup({
      nombre: new FormControl(''),
      apellidoPaterno: new FormControl(''),
      apellidoMaterno: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
    });
    this.formGroup.reset();
  }

  fetchAll(): Observable<People[]> {
    return this.peopleListCrudService.fetchAll();
  }

  update(people: People): void {
    this.trimForm();

    let auxForm = this.formGroup.value;

    //validacion ? true : false

    const newPeople: People = {
      id: people.id,
      Nombre: !auxForm.nombre ? people.Nombre : auxForm.nombre,
      ApellidoPaterno: !auxForm.apellidoPaterno
        ? people.ApellidoPaterno
        : auxForm.apellidoPaterno,
      ApellidoMaterno: !auxForm.apellidoMaterno
        ? people.ApellidoMaterno
        : auxForm.apellidoMaterno,
      Direccion: !auxForm.direccion ? people.Direccion : auxForm.direccion,
      Telefono: !auxForm.telefono ? people.Telefono : auxForm.telefono,
    };
    this.people$ = this.peopleListCrudService
      .update(newPeople)
      .pipe(tap(() => (this.people$ = this.fetchAll())));
    this.formGroup.reset();
  }

  delete(id: number): void {
    this.people$ = this.peopleListCrudService
      .delete(id)
      .pipe(tap(() => (this.people$ = this.fetchAll())));
  }

  goToRegister(): void {
    this.router.navigate(['/', 'registration']);
  }

  trimForm(): void {
    Object.keys(this.formGroup.controls).forEach((key) => {
      if (this.formGroup.get(key)?.value != null)
        this.formGroup
          .get(key)
          ?.setValue(this.formGroup.get(key)?.value.trim());
    });
  }
}
