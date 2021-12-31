import { keys } from './key';
import { CookieService } from 'ngx-cookie-service';
var cookieService = new CookieService(document, null);
/**
* 获取多语言的类
**/
export class UserInfo {
    private static _userLoginInfo;
    /**
    * 获取登录用户信息
    **/
    static get loginInfo() {
        if (cookieService.get(keys.userSession)) {
            this._userLoginInfo = JSON.parse(cookieService.get(keys.userSession));
        } else {
            this._userLoginInfo = null;
        }
        return this._userLoginInfo;
    }
    /**
    * 页面缓存登录信息
    **/
    static set loginInfo(value) {
        this._userLoginInfo = value;
        if (!this._userLoginInfo) {
            cookieService.set(keys.userSession, JSON.stringify(value), -1, '/');
        } else {
            cookieService.set(keys.userSession, JSON.stringify(value), 1, '/');
        }
    }
}
