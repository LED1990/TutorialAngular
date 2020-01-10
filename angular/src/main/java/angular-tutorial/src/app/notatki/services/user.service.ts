import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../model/user";

/**
 * hold info about logged user
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  private user = new BehaviorSubject<User>(undefined);
  currentUser = this.user.asObservable();

  setUser(user: User) {
    this.user.next(user);
  }
}
