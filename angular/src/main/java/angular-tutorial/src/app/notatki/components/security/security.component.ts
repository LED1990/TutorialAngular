import {Component, OnInit} from '@angular/core';
import {MessagesAndLogsService} from "../../services/messages-and-logs.service";
import {AuthenticateService} from "../../services/authenticate.service";
import {User} from "../../model/user";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  status: string;
  actions: string[] = [];
  currentLogin: string;

  constructor(private basicAuthService: AuthenticateService,
              private msg: MessagesAndLogsService,
              private cookieService: CookieService,
              private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(value => {
      if (value !== undefined) {
        this.msg.logAndAddMsessage([value], '[SecurityComponent] user already logged');
        if (value.status == 1) {
          this.status = 'LOGGED IN as ' + value.login;
          this.currentLogin = value.login;
          this.logLocalAction(value.login + ' already authenticated');
        }
      }
    })
  }

  loginForm = this.fb.group({
    login: [''],
    password: ['']
  });

  basicAuth(): void {
    const userData = new User(this.loginForm.value);
    this.basicAuthService.basicAuth(userData).subscribe(value => {
      this.msg.logAndAddMsessage([value], '[SecurityComponent] basic authentication button pressed');
      userData.password = undefined;
      userData.status = 1;
      this.userService.setUser(userData);
      this.status = 'LOGGED IN as ' + userData.login;
      this.logLocalAction(userData.login + ' authentication success')
    }, () => {
      this.logLocalAction(userData.login + ' failed to atuhenticate ')
    });
  }

  logOut(): void {
    this.basicAuthService.logout().subscribe(value => {
      this.msg.logAndAddMsessage([value], '[SecurityComponent] logout button pressed');
      sessionStorage.removeItem('authVal');
      this.userService.setUser(undefined);
      this.status = 'LOGGED OUT';
      this.logLocalAction(this.currentLogin + ' logged out');
    });
  }

  actionUser(userNumber: number) {
    this.basicAuthService.sendRequest(userNumber).subscribe(
      value => {
        this.msg.logAndAddMsessage([value], '[SecurityComponent] success');
        this.logLocalAction(this.currentLogin + ' resource value: ' + value);
      }, () => {
        this.logLocalAction(this.currentLogin + ' failed to get resource ');
      }
    );
  }

  private logLocalAction(msg: string) {
    if (this.actions.length >= 10) {
      this.actions.length = 0;
    }
    this.actions.push(msg);
  }
}
