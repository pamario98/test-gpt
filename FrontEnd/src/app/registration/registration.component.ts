import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { PeopleListCrudService } from '../services/people.service';
import { People } from '../models/people/people.interface';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  formGroup: FormGroup;
  people$: Observable<People[]>;

  constructor(
    private peopleListCrudService: PeopleListCrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    this.formGroup = new FormGroup({
      Nombre: new FormControl('', Validators.required),
      ApellidoPaterno: new FormControl('', Validators.required),
      ApellidoMaterno: new FormControl('', Validators.required),
      Direccion: new FormControl('', Validators.required),
      Telefono: new FormControl('', Validators.required),
    });
    this.formGroup.reset();
  }

  async post(): Promise<void> {
    this.trimForm();
    if (this.formGroup.valid) {
      try {
        await lastValueFrom(
          this.peopleListCrudService.post(this.formGroup.value as People)
        );
        alert('Registro Exitoso');
        this.formGroup.reset();
      } catch (error) {
        alert(error);
      }
    } else {
      alert('datos faltantes');
    }
  }

  trimForm(): void {
    Object.keys(this.formGroup.controls).forEach((key) => {
      if (this.formGroup.get(key)?.value != null)
        this.formGroup
          .get(key)
          ?.setValue(this.formGroup.get(key)?.value.trim());
    });
  }

  goToHome(): void {
    this.router.navigate(['/', 'home']);
  }
}
