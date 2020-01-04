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
    params.push(this.msgArray);
    this.logger.debug(msg, params);
    this.msgArray.push(msg[0]);
    if (this.msgArray.length > 30) {
      this.msgArray.length = 0;
    }
  }

  getMessages(){
    this.logger.debug('current messages: ', this.msgArray);
  }
  //TODO NAGULAR HTTP AND SUBSRIBE ERROR HANDLING!!!!!!!!!!!!!!!!!!!!!
}
