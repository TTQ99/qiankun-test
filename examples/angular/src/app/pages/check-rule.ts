import { OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CheckRule {
  constructor(public translate: TranslateService) {
  }
  ngOnInit() { }
  /**
   * 校验显示类字符
   * 去除首尾空格，不超过30个字符，包含中英文字符、数字、特殊字符
   * @param {any} str
   * @returns
   * @memberof CheckRule
   */
  displayCheck(str) {
    var bool;
    if (str != '') {
      if (str.length > 30) {
        bool = false;
      } else {
        bool = true;
      }
    } else {
      bool = false;
    }
    return bool;
  }
  /**
   * 校验描述类字符
   * 去除首尾空格，不超过100个字符，包含中英文字符、数字、特殊字符
   * @param {any} str
   * @memberof CheckRule
   */
  describeCheck(str, num) {
    var bool;
    if (str.length > num) {
      bool = false;
    } else {
      bool = true;
    }
    return bool;
  }
  /**
   *
   *
   * @param {any} str
   * @param {any} num
   * @param {any} type  代表类型
   * @returns
   * @memberof CheckRule
   */
  limitNum(str, num, type) {
    var bool;
    str = this.removeSpace(str);
    if (str != '') {
      if (str.length.length > num) {
        bool = false;
      } else {
        bool = true;
      }
    } else {
      bool = false;
    }
    return bool;
  }
  /**
   * 变量类型检验
   *
   * @memberof CheckRule
   */
  variableCheck(str, name = '') {
    var checkResult = {
      checkMsg: '',
      checkState: false
    }
    if (str == '') {
      checkResult.checkMsg = `请输入${name}`;
      checkResult.checkState = true;
    } else {
      if (str.length > 64) {
        checkResult.checkState = true;
        checkResult.checkMsg = '最大支持64个字符';
      } else if (!(/^[\w\_|$]+$/g.test(str))) {
        checkResult.checkMsg = "名称仅支持字母、数字、下划线、美元符";
        checkResult.checkState = true;
      } else if (!(/^[a-zA-Z\_|$]{1,64}/g.test(str))) {
        checkResult.checkMsg = '不能以数字开头';
        checkResult.checkState = true;
      } else {
        checkResult.checkState = false;
      }
    }
    // if (!(/^[a-zA-Z\_|$]{1,64}/g.test(str))) {
    //     checkResult.checkMsg = '不能以数字开头';
    //     checkResult.checkState = true;
    //   }else if (!(/^[\w\_|$]+$/g.test(str))) {
    //   }else if(str.length>64){
    //     checkResult.checkState = true;
    //     checkResult.checkMsg = '最大支持64个字符'
    //   }else{
    //     checkResult.checkState = false;
    //   }
    return checkResult;
  }
  removeSpace(str) {
    if (!str) str = ''
    var reg = /^\s+|\s+$/g;
    str = str.replace(reg, "");
    return str;
  }
}
