import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesAndLogsService {

  msgArray: string[] = [];

  constructor() {
  }

  logAndAddMsessage(msg: string) {
    console.debug(msg);
    this.msgArray.push(msg);
    if (this.msgArray.length > 30) {
      this.msgArray.length = 0;
    }
  }
}
