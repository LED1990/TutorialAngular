import {Component, OnInit} from '@angular/core';
import {MessagesAndLogsService} from "../../services/messages-and-logs.service";
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor(private basicAuthService: AuthenticateService,
              private msg: MessagesAndLogsService) { }

  ngOnInit() {
  }

  basicAuth(): void{
    this.basicAuthService.basicAuth().subscribe(value => {
      this.msg.logAndAddMsessage([value], '[SecurityComponent] basic authentication button pressed');
    });
  }
}
