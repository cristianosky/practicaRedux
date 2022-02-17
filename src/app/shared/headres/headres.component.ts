import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/core/auth/state/auth.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-headres',
  templateUrl: './headres.component.html',
  styleUrls: ['./headres.component.scss'],
})
export class HeadresComponent implements OnInit {
  isAuth!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuth = this.store.select(isAuthenticated);
  }
}
