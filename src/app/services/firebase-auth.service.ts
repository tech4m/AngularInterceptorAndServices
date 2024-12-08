import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  currentUser: any;
  constructor(private afAuth: FirebaseAuthService) {}

  login(email: string, password: string) {}
  register(email: string, password: string) {}
  logout() {}
  checkAuthStatus() {}
}
