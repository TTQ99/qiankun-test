import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BaseService } from '../../base-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class HealthAssessmentService extends BaseService {
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
  customCopy() {
    return this.jsonCall({}, this.path + `https://cnodejs.org/api/v1/topics`, 'get');
  }

}
