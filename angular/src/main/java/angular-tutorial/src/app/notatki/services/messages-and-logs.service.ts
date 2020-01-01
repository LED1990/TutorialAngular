import {Injectable} from '@angular/core';
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class MessagesAndLogsService {

  msgArray: string[] = [];

  constructor(private logger: NGXLogger){
  }

  /**
   * msg[0] - message
   * @param params
   * @param msg
   */
  logAndAddMsessage(params: any[], ...msg: string[]) {
    this.logger.debug(msg, params);
    this.msgArray.push(msg[0]);
    this.logger.debug('current messages: ', this.msgArray);
    if (this.msgArray.length > 30) {
      this.msgArray.length = 0;
    }
  }
  //TODO NAGULAR HTTP AND SUBSRIBE ERROR HANDLING!!!!!!!!!!!!!!!!!!!!!
}
