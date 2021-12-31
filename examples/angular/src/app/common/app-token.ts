import { session } from '../widget/script/sessionStorage';
import { local } from '../widget/script/localStorage';
export class AppToken {
	// 用户
	private static _token;
	// 获取用户信息
	static get token() {
		if(!this._token) {
			this._token = session.get("_token");
		}
		return this._token;
	}
	// 设置用户信息
	static set token(value) {
		this._token = value;
		session.set("_token", value);
	}
}