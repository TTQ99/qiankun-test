import { URLSearchParams, Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { session } from '../widget/script/sessionStorage';
import { Injectable } from '@angular/core';
import { AppCommon } from '../common/app-common';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import '../widget/script/base64.js';
// 
import { Language } from '../common/language';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppToken } from '../common/app-token';
import { CookieService } from 'ngx-cookie-service';
declare var Base64: any;
function getCookie(key: any) {//获取cookie方法
  /*获取cookie参数*/
  var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
  var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
  var tips;  //声明变量tips
  for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
    var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
    if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
      tips = arr[1];   //将cookie的值赋给变量tips
      break;   //终止for循环遍历
    }
  }
  return tips;
}
@Injectable({
  providedIn: 'root'
}
)

export class BaseService {
  public path = '';
  public persionId = [];
  public cookie: any = {};
  constructor(
    protected http: Http,
    public httpClient: HttpClient,
    public router: Router,
    public activedRoute: ActivatedRoute,
    public location: Location,
    public message: NzMessageService,
    // public 
  ) {
    this.path = environment.getServer();
    this.cookie = getCookie('access_token');
  }
  jsonCall(data: any, url: string, type = 'post', withToken = true): any {
    // 使用httpClient模块开始
    const lang = Language.getLanguage();
    let headers = new HttpHeaders({ 'Accept-Language': lang });
    if (withToken && !this.cookie) {
      headers = new HttpHeaders({
        'Accept-Language': lang,
        'appId': '1',
      });
    }
    if (this.cookie) {
      headers = new HttpHeaders({
        'Accept-Language': lang,
        'Authorization': `Bearer ${this.cookie}`,
        'companyId': AppCommon.userInfo ? (AppCommon.userInfo.activeCompany || '') : ''
        //'userId': AppCommon.userInfo.id
      });
    }
    let options = { observe: 'response', headers: headers };

    // 使用httpClient模块结束
    return new Promise((resolve, reject) => {
      if (type == 'get' || type == 'delete') {
        let obj;
        obj = Object.assign(options, { params: this.getParams(data) });
        this.httpClient[type](url, obj)
          .subscribe(res => {
            try {
              // this.processCallback(resolve, reject, res.json());
              this.processCallback(resolve, reject, data, res);
            } catch (error) {
              this.processCallback(resolve, reject, data, { ret: -100, msg: '返回数据为空', data: '' });
            }

          }, err => {
            this.processCallback(resolve, reject, data, err);
          });
      } else {
        this.httpClient[type](url, data, options)
          .subscribe(res => {
            try {
              // this.processCallback(resolve, reject, res.josn());
              this.processCallback(resolve, reject, data, res);
            } catch (error) {
              this.processCallback(resolve, reject, data, { headers: { status_code: -100 }, body: error });
            }
          }, err => {
            this.processCallback(resolve, reject, data, err);
          });
      }
    });
  }
  getParams(data: any, isJsonp = false): HttpParams {
    let params = new HttpParams();
    for (const key in data) {
      let val = data[key];
      if (typeof val == 'function') { continue; }
      params = params.set(key, val);
    }
    if (isJsonp) {
      params = params.set('callback', 'JSONP_CALLBACK');
    }
    return params;
  }
  processCallback(resolve: Function, reject: Function, params: any, data?: any) {
    if (data.headers.get('authorization')) {
      let obj = {
        access_token: data.headers.get('authorization'),
      }
      AppToken.token = obj || {};
    }
    if (data['status'] == '200' || data['status'] == '201') {
      if (data.headers.get('status_code') && data.headers.get('status_code') == '200') {// 成功
        let res;
        if (data.body && data.body.data) {
          if (params.page === undefined) {
            res = data.body.data;
          } else {
            res = {
              data: data.body.data,
              total: data.headers.get('x-total-count') || 0
            };
          }
        } else {
          if (params.page === undefined) {
            res = data.body;
          } else {
            res = {
              data: data.body,
              total: data.headers.get('x-total-count') || 0
            };
          }
        }
        resolve(res);
      } else {
        if (data.headers.get('status_msg')) {
          const base64 = new Base64();
          const msg = base64.decode(data.headers.get('status_msg'));
          reject({ 'ret': data.headers.get('status_code'), 'msg': msg } || { ret: '-2000' });
        }
        else {
          let res;
          if (params) {
            this.persionId = params
          }
          if (data.body && data.body.data) {
            if (params.page === undefined) {
              res = data.body.data;
            } else {
              res = {
                data: data.body.data,
                total: data.headers.get('x-total-count') || 0
              };
            }
          } else {
            if (params.page === undefined) {
              res = data.body;
            } else {
              res = {
                data: data.body,
                total: data.headers.get('x-total-count') || 0
              };
            }
          }
          resolve(res);
        }
      }
    } else if (data['status'] == '401') {
      AppCommon.userInfo = null;
      AppToken.token = null;
      AppCommon.employeeInfo = null;
      this.router.navigate(['login/logins']);
    } else if (data['status'] == '400') {
      if (data.headers.get('status_msg')) {
        const base64 = new Base64();
        const msg = base64.decode(data.headers.get('status_msg'));
        reject({ 'ret': data.headers.get('status_code'), 'msg': msg } || { ret: '-2000' });
      } else {
        reject({ 'ret': 'h400', 'msg': data.error.message || '请求失败' } || { ret: '-2000' });
      }

    } else if (data['status'] == '403') {
      if (data.headers.get('status_code')) {
      }
    } else if (data['status'] == '404') {
      reject({ 'ret': 404, 'msg': '页面溜走了，请刷新页面' });
    } else if (data['status'] >= 600) {
      if (data.headers.get('status_code') && data.headers.get('status_code') == '401') {
        AppCommon.userInfo = null;
        AppToken.token = null;
        AppCommon.employeeInfo = null;
        this.router.navigate(['login/logins']);
      } else {
        const base64 = new Base64();
        const msg = base64.decode(data.headers.get('status_msg'));
        reject({ 'ret': data.headers.get('status_code'), 'msg': msg } || { ret: '-3000' });
      }
    } else {// 请求出错
      if (data['token_type'] == 'bearer' || (data.error && data.error.path == '/auth/login')) {

      } else {
        if (data['status'] == '500') {
        }
      }
      reject({ 'ret': data['status'], 'msg': data.error || '请求失败' } || { ret: '-2000' });
    }
  }
}
