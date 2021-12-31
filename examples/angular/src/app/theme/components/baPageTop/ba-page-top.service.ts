import { Injectable } from '@angular/core';
import { BaseService } from '../../../pages/base-service';
import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable()
export class BapagetopService extends BaseService {
  constructor(
    http: Http,
    httpClient: HttpClient,
    router: Router,
    activedRoute: ActivatedRoute,
    location: Location,
    message: NzMessageService,

  ) {
    super(http, httpClient, router, activedRoute, location, message);
  }
}
