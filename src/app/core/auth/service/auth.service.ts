import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespondeData } from '../model/Auth.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key: string = environment.key_firebase;

  constructor(private http: HttpClient) {}

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

  register(email: string, password: string) {
    return this.http.post(
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
      default:
        return;
    }
  }
}
