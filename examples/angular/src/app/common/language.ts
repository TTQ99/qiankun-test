import { local } from '../widget/script/localStorage';
import {keys} from './key';
/**
* 获取多语言的类
**/
export class Language{
	private static _language;
	/**
	* 获取默认语言
	**/
	static getLanguage(defaultLang = 'zh-CN'){
		if(!this._language){
			let language = local.get(keys.languageChanged);
			if(language){
				this._language = language;
			}else{
				if(defaultLang != 'zh-CN' && defaultLang != 'en-US'){
					defaultLang = 'zh-CN';
				}
				this._language = defaultLang;
			}
    //   this._language = 'cn-ZH';
			return this._language;
		}else{
      		// this._language = 'cn-ZH';
			return this._language;
		}
	}
	/**
	* 设置语言
	**/
	static set luangage(val){
		local.set(keys.languageChanged, val);
		this._language = val;
	}
}
