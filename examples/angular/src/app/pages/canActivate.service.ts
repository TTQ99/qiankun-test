/*
 * @Author: your name
 * @Date: 2020-12-07 10:20:46
 * @LastEditTime: 2021-04-20 14:49:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \eam-bi-front\src\app\pages\canActivate.service.ts
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable()
export class CanActivateService implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private message: NzMessageService,
    private messageService: NzMessageService
  ) { }
  async canActivate() {
    return true;
  }
}
