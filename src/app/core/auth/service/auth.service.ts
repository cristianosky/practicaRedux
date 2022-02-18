import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { RespondeData } from '../model/Auth.model';
import { User } from '../model/user.model';
import { authLogout } from '../state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key: string = environment.key_firebase;
  timeoutInterval: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<RespondeData> {
    return this.http.post<RespondeData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.key}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: RespondeData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  register(email: string, password: string): Observable<RespondeData> {
    return this.http.post<RespondeData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.key}`,
      { email, password, returnSecureToken: true }
    );
  }

  getErrorMensaje(mensaje: string) {
    switch (mensaje) {
      case 'EMAIL_NOT_FOUND':
        return 'Correo no registrado';
        break;

      case 'INVALID_PASSWORD':
        return 'Contraseña incorrecta';
        break;

      case 'USER_DISABLED':
        return 'Usuario desactivado';
        break;

      case 'EMAIL_EXISTS':
        return 'El correo ya existe';
        break;

      default:
        return;
    }
  }

  setLocalStorage(user: User) {
    localStorage.setItem('userDta', JSON.stringify(user));
    this.iniciarTimeOutInterval(user);
  }

  getUserLocalStorage() {
    const userDataString = localStorage.getItem('userDta');
    if (userDataString) {
      const UserData = JSON.parse(userDataString);
      const expirationDte = new Date(UserData.expirationDate);
      const user = new User(
        UserData.email,
        UserData.token,
        UserData.localId,
        expirationDte
      );
      this.iniciarTimeOutInterval(user);
      return user;
    }
    return null;
  }

  iniciarTimeOutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(authLogout());
    }, timeInterval);
  }

  logout() {
    localStorage.removeItem('userDta');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
