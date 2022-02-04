import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../store/app.state';
import {
  decrementar,
  incrementar,
  IncrementarPersonalizado,
  reset,
  TextoPersonalizado,
} from './state/contador.actions';
import { getCambiarNombre, getContador } from './state/contador.selectors';
import { ContadorState } from './state/contador.state';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss'],
})
export class ContadorComponent implements OnInit {
  contador$!: Observable<number>;
  contador!: number;
  valor!: number;
  NombreCanal$!: Observable<string>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.NombreCanal$ = this.store.select(getCambiarNombre);
    this.contador$ = this.store.select(getContador);
  }

  incremntar() {
    this.store.dispatch(incrementar());
  }

  decrementar() {
    this.store.dispatch(decrementar());
  }

  reset() {
    this.store.dispatch(reset());
  }

  agregarvalor() {
    this.store.dispatch(IncrementarPersonalizado({ value: +this.valor }));
  }

  cambiarNameCanal() {
    this.store.dispatch(TextoPersonalizado());
  }
}
