import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getErrorMensaje, getLoading } from './shared/store/shared.selectors';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ejemplo';
  mensajeError!: Observable<string>;
  showLoafing!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.showLoafing = this.store.select(getLoading);
    this.mensajeError = this.store.select(getErrorMensaje);
  }
}
