/**
* 页面的公共方法，所有的页面component都继承自该类
**/
import { Router, ActivatedRoute } from '@angular/router';

import { OnInit, OnDestroy, Component, ViewChild, ContentChild, ElementRef, Injectable } from '@angular/core';
import { GlobalState } from '../global.state';
import { keys } from '../common/key';
import { urls } from '../common/urls';
import { Language } from '../common/language';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { AppToken } from '../common/app-token';
// 存储page页面的宽度
export class CommonPageWidth {
  private static _pageContentClientWidth = 0;

  static set pageContentClientWidth(val: number) {
    this._pageContentClientWidth = val;
  }
  static get pageContentClientWidth() {
    return this._pageContentClientWidth;
  }
}

// 存储Component
export class ComponentInfo {
  // 保存当前this指向的Component
  private static currentComponent = null;
  static set NowUseComponent(val: any) {
    this.currentComponent = val;
  }
  static get NowUseComponent() {
    return this.currentComponent;
  }
  // 保存当前Component操作的Table的index（就是操作的第几个表格，默认只有一个）
  private static actionTableIndex = 0;
  static set currentTableIndex(val: number) {
    this.actionTableIndex = val;
  }
  static get currentTableIndex() {
    return this.actionTableIndex;
  }
}
@Injectable()
export class BasePage implements OnInit, OnDestroy {
  constructor(
    // 
    protected router: Router,
    protected activedRoute: ActivatedRoute,
    protected state: GlobalState,
  ) { }
  /**
  * 继承的具体业务页面，需要重写该属性
  **/
  public pageName = '';
  public urls = urls;
  public sNewTenant: string;
  public localLanguage = Language.getLanguage();

  /**
   * 校验提示框
   */
  public isShowWarning: any = false;  // 校验弹框显示隐藏标识符
  public nzMessage: any;  // 弹框提示信息

  public scrollX: Array<string>; // 表格横向宽度
  public tableAllCols: Array<any>; // 表头数据
  public pageSizeOptions = [10, 20, 50, 100, 200]

  ngOnInit() {
    this.onInit();
  }
  /**
  * 如果子页面需要用ngOnInit方法，需要重写该方法
  **/
  onInit() { }

  ngOnDestroy() {
    this.state.unsubscribe(keys.languageChanged, this.pageName);
    this.state.unsubscribe(keys.refurbished, this.pageName);
    this.onDestroy();
  }
  /**
  * 如果子页面需要用ngOnDestroy方法，需要重写该方法
  **/
  onDestroy() { }
}
