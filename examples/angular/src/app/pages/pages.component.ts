/*
 * @Author: your name
 * @Date: 2020-12-07 10:20:46
 * @LastEditTime: 2021-04-20 16:19:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \eam-bi-front\src\app\pages\pages.component.ts
 */
import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivationEnd } from '@angular/router';
import { BasePage } from './base-page';
import { GlobalState } from '../global.state';
import { BaseService } from './base-service';
import { CookieService } from 'ngx-cookie-service';
import { PageMenuComponent } from '../theme/components/ba-page-menu/ba-page-menu.component';
interface NzResizeEvent {
  width?: number;
  height?: number;
  col?: number;
  mouseEvent?: MouseEvent;
}
@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.html',
  styleUrls: ['./pages.scss'],
  encapsulation: ViewEncapsulation.None
})

export class Pages extends BasePage implements AfterViewInit {
  public _activationEnd: any;
  public menuNavList: any[];
  constructor(
    private el: ElementRef,
    private baseService: BaseService,//var baseService=new BaseService()
    router: Router,
    activatedRoute: ActivatedRoute,
    state: GlobalState,
    // private nzI18nService: NzI18nService,
    private cookieService: CookieService
  ) {
    super(router, activatedRoute, state);
    router.events.subscribe((event: NavigationEnd) => {
      // 判断路由的事件类型（也就是路由的生命周期）
      if (event instanceof ActivationEnd) { // 当导航成功结束时执行
        this._activationEnd = event;
      }
    });
  }
  @ViewChild('getItems') trigger: ElementRef;
  @ViewChild('pageMenu') pageMenuComponent: PageMenuComponent
  public pageName = 'ngx-pages';
  public menus;
  public userInfo;
  public marginLeft = '210px';
  public isCollapsed = false;
  public isVisible = false;
  public searchValue = '';
  public isShowConfigThead = false;

  @ViewChild('PageMainContent') private box: ElementRef;

  onInit() {//组件加载时初始化变量或者网络请求时代码写在这里面

  }


  ngAfterViewInit() {
    // 保存PageMainContent的宽度：pages-main的padding、margin各为20
    // CommonPageWidth.pageContentClientWidth = this.box.nativeElement.clientWidth - 80;
  }

}
