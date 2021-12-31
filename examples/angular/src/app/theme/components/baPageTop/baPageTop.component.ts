import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

import { GlobalState } from '../../../global.state';
// import { UserInfo } from '../../../common/userInfo';
import { AppCommon } from '../../../common/app-common'
import { keys } from '../../../common/key';
import { BapagetopService } from './ba-page-top.service';
import { BasePage } from '../../../pages/base-page';

import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Language } from '../../../common/language';
// import * as addDays from 'date-fns/add_days';
// import * as getISOWeek from 'date-fns/get_iso_week';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common'
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzI18nService, zh_CN, en_US, vi_VN } from 'ng-zorro-antd/i18n';
@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BapagetopService]
})
export class BaPageTop {
  // public userInfo = {
  //   name: 'Michelgao',
  //   img: 'assets/imgs/no-photo.png'
  // }
  public pageName = 'ba-page-top';
  constructor(
    private cookie: CookieService,
    private _state: GlobalState,
    private confirmServ: NzModalService,
    private bapagetopService: BapagetopService,

    public router: Router,
    public activedRoute: ActivatedRoute,
    public _message: NzMessageService,
    private nzI18nService: NzI18nService
  ) {
    // this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
    //   this.isMenuCollapsed = isCollapsed;
    // });
  }
  //租户列表
  public tenantList: any = [];
  //语言列表
  public languageList: any = [
    { "id": 1, "name": "中文（简体）" },
    { "id": 2, "name": "英文" },
    { "id": 3, "name": "中文（繁体）" },
  ];
  //租户名
  date = null; // new Date()
  public switchTenantName = [];
  //选择的租户
  public selectTenant: any;
  @Input() userInfo: any;
  @Input() isCollapsed: any;
  @Output() logout: EventEmitter<boolean> = new EventEmitter();
  @Output() languageChanged: EventEmitter<any> = new EventEmitter();
  @Output() layoutMenu: EventEmitter<boolean> = new EventEmitter();
  public date1 = new Date(2012, 11, 21);
  public mode = 'month';
  // public tenantShow:any;
  public multilingual = [
    { value: 'pagetop.Chinese', key: 'zh-CN' },
    { value: 'pagetop.US', key: 'en-US' },
    { value: 'pagetop.vi', key: 'vi-VN' }
    // {value:'pagetop.ES',key:'en-ES'},
    // {value:'pagetop.hk',key:'zh-HK'},
  ]
  public language = this.multilingual[0];
  public lang = Language.getLanguage();
  ngOnInit() {
    // this.lang = Language.getLanguage();
    // this.multilingual.forEach((element) => {
    //   if (this.lang == element.key) {
    //     this.language = element;
    //   }
    // })
    // this._state.subscribe(keys.languageChanged, this.pageName, (lang, page) => {
    //   Language.luangage = lang;
    //   this.lang = lang;
    //   this.translate.setDefaultLang(lang);
    //   if (lang == 'zh-CN') {
    //     this.nzI18nService.setLocale(zh_CN);
    //   } else if (lang == 'en-US') {
    //     this.nzI18nService.setLocale(en_US);
    //   } else if (lang == 'vi-VN') {
    //     this.nzI18nService.setLocale(vi_VN);
    //   }
    //   // this.nzI18nService.setLocale(lang.replace(/\-/g,'_'));
    // });
    // let userInfo=UserInfo.loginInfo;
    // this.tenantShow=userInfo?(userInfo.selectedTenant.tenantId=='108')?true:false:false;
    //this.getdefaultTenant();
  }
  // 获取当前默认企业
  getdefaultTenant() {
    let userInfoLogin = AppCommon.userInfo;
    if (!userInfoLogin) return;
    let userUuid = userInfoLogin.userUuid;
    this.switchTenantName = userInfoLogin.userIdentitiesVMList;
    this.switchTenantName.forEach(element => {
      if (element.tenantUuid == userInfoLogin.tenantUuid) {
        this.selectTenant = element;
      }
    });
  }
  onChange(event) {

  }
  onLogout() {
    let that = this;
    this.confirmServ.confirm({
      nzTitle: '确定要退出吗？',
      nzOnOk() {
        that.logout.emit();
      },
      nzOnCancel() {
      }
    });
    /*this.logout.emit();*/

  }
  onLanguageChanged(language) {
    this.languageChanged.emit(language)
  }
  onlayoutMenu() {
    this.isCollapsed = !this.isCollapsed;
    this.layoutMenu.emit(this.isCollapsed);
    this._state.notifyDataChanged(keys.menuCollapsed, this.isCollapsed);
  }

  languageChange() {
    let language = this.language.key || 'zh-CN';
    this.languageChanged.emit(language)
  }
  ngOnDestroy() {
    this._state.unsubscribe(keys.languageChanged, this.pageName);
    this._state.unsubscribe(keys.refurbished, this.pageName);
  }

  //切换租户及登录
  changeTenant() {
    if (this.cookie.get('tenantUuid')) {
      this.cookie.set('tenantUuid', this.selectTenant.tenantUuid, 10, '/');
    }
  }

  //全局提示
  createMessage = (type, text) => {
    this._message.create(type, text);
  };

  // 大屏显示
  enterScreen() {
    this.router.navigate(['screen']);
    this.fullScreen();
  }
  fullScreen() {
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
  }
}

