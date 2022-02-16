import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForms!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.iniform();
  }

  iniform() {
    this.authForms = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ingresar() {
    console.log(this.authForms.value);
  }
}
