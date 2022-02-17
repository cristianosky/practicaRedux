import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  setLoadingSpinner,
  SET_LOADING_ACTION,
} from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/store/app.state';
import { loginStrar, registeStart } from './state/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForms!: FormGroup;
  SignForms!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.iniform();
  }

  iniform() {
    this.authForms = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.SignForms = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ingresar() {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    const { email, password } = this.authForms.value;
    this.store.dispatch(loginStrar({ email, password }));
  }

  registrar() {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    const { email, password } = this.SignForms.value;

    this.store.dispatch(registeStart({ email, password }));
  }
}
