import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly authData$ = new Subject<any>();

  // URL der Feldfühler Login Seite
  private readonly loginUrl = 'https://the-things-app.web.app';

  constructor() {
    // EventHandler registrieren um die Antwort vom PopUp zu bekommen
    window.addEventListener('message', (event) => {

      // nur auf Event vom PopUp reagieren
      if (event.origin !== this.loginUrl) {
        return;
      }

      this.authData$.next(event.data);
    });
  }

  login() {
    // Die URL dieser App, an diese sendet das PopUp dann die Antwort
    const encodedRedirectUrl = encodeURIComponent(window.origin);

    // Öffnet neues PopUp und lädt die Feldfühler Login Seite
    open(
      `${this.loginUrl}?redirectUrl=${encodedRedirectUrl}`,
      'Feldfühler - Login',
      'width=985,height=735'
    );
  }
}
