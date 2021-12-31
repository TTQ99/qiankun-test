import { session } from '../widget/script/sessionStorage';
import { local } from '../widget/script/localStorage';
export class AppCommon {
	// 用户
	private static _userInfo;
	// 获取用户信息
	static get userInfo() {
		if(!this._userInfo) {
			this._userInfo = session.get("_userInfo");
    }
		return this._userInfo;
	}
	// 设置用户信息
	static set userInfo(value) {
		this._userInfo = value;
		session.set("_userInfo", value);
  }

	// 当前登录用户关联的员工信息
	private static _employeeInfo;
	// 获取用户信息
	static get employeeInfo() {
		if(!this._employeeInfo) {
			this._employeeInfo = session.get("_employeeInfo");
		}
		return this._employeeInfo;
	}
	// 设置用户信息
	static set employeeInfo(value) {
		this._employeeInfo = value;
		session.set("_employeeInfo", value);
  }
}
