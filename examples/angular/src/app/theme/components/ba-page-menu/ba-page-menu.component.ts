import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalState } from '../../../global.state';
import { session } from '../../../widget/script/sessionStorage';
import { keys } from '../../../common/key';
import { AppCommon } from '../../../common/app-common'
import { BaseService } from '../../../pages/base-service';
import { Location } from '@angular/common';
import { PAGES_MENU } from 'src/app/pages/pages.menu';
@Component({
  selector: 'page-menu',
  templateUrl: './ba-page-menu.component.html',
  styleUrls: ['./ba-page-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageMenuComponent implements OnInit, OnDestroy {
  @Input() menus: any = null;
  @Input() isCollapsed: any;
  @Input() menuNavList: any = [];
  public pageName = 'ba-page-menu';
  menu: any;
  constructor(
    public state: GlobalState,
    protected router: Router,
    protected activedRoute: ActivatedRoute,
    protected baseService: BaseService,

    private location: Location) {

  }
  public isMenuCollapsed = false;
  public selectedMenu: any;
  public subMenuWidth = '160px'; // 二级菜单宽度
  public toggleBtnRight = '-172px'; // 菜单伸缩按钮定位
  private isfirstLoaded = true;// 是否是第一次运行；
  private routerListeningTimeout: any;
  private currentPathArr: Array<any>;
  private baseUrl: any = 'pages';

  menuMap: {}
  public menuList: any = [];
  public menuNav = []

  ngOnInit() {
    this.state.subscribe(keys.refurbished, this.pageName, (res, page) => {
      this.MenuDataLoaded();
    });
    this.state.subscribe(keys.changeTenant, this.pageName, (res, page) => {
      this.MenuDataLoaded();
    });
    this.MenuDataLoaded();

  }

  /**
   * menu 数据初始化
   */
  MenuDataLoaded() {
    this.getRole()
    // let userInfo = AppCommon.userInfo;
    // if (userInfo && userInfo.id) {
    // }
  }

  getRole() {
    this.analysisMenuData(PAGES_MENU);
  }

  /**
 *
 * @param menudata 解析menu数据菜单
 */
  analysisMenuData(menudata) {
    let menulist = [];
    menulist = this.getTreeList(menudata);
    this.menus = menulist;
  }
  getRouterArr() {
    let currentPath = this.location.path();
    currentPath = currentPath.replace(`/${this.baseUrl}/`, '');
    this.currentPathArr = currentPath.split('/')
  }
  MenuInit() {
    this.menus.forEach(naviList => {
      naviList.children.forEach(item => {
        let config = JSON.parse(item.attributes.appConfig) || {};
        // console.log(naviList)
        let url = config.url;
        item['routerLink'] = '/' + this.baseUrl + '/' + url;
        item['config'] = config;
      })

      if (naviList.name.indexOf(this.currentPathArr[0]) >= 0) {
        /**
        * 定位菜单到当前路由
        */
        this.displayMenu(naviList);
      }
    })
  }
  innerTouchRouter() {
    this.menus.forEach(naviList => {
      if (naviList.name.indexOf(this.currentPathArr[0]) >= 0) {
        /**
        * 定位菜单到当前路由
        */
        this.displayMenu(naviList, true);
      }
    })
  }
  displayMenu(menu, inner = false) {
    //触发一级菜单
    if (!inner) this.selectMenu(menu)
    let naviList = [];//声明一个二级数组容器
    let naviCodeObj = {};//存储二级code 对象
    menu.naviList && menu.naviList.forEach((navi) => {
      if (navi.globalization.split('.')[2] === this.currentPathArr[1]) {
        //显示二级菜单
        navi['opened'] = true;
        let haveGot = false
        navi.children.forEach(item => {
          if (item.config.name === this.currentPathArr[this.currentPathArr.length - 1]) {
            //显示三级菜单
            item['selected'] = true;
            haveGot = true
          } else {
            item['selected'] = false;
          }
        })
        if (!haveGot) {
          /**
           * 如果路由最后一位与菜单无法匹配
           */
          navi.children.forEach(item => {
            this.currentPathArr.forEach((path, index) => {
              if (index > 1) {
                if (item.config.name === path) {
                  item['selected'] = true;
                }
              }
            })

          })
        }
      } else {
        navi.children.forEach(item => {
          item['selected'] = false;
        })
      }
    })
  }
  selectMenu(menu) {
    this.selectedMenu = menu;
    /**
     * 添加虚拟二级
     */
    let naviList = [];//声明一个二级数组容器
    let naviCodeObj = {};//存储二级code 对象
    menu.children && menu.children.forEach((item) => {
      item.config.globalization = item.config.url.split('/').join(".") + '.index';
      let navicode = item.config.type;//获取二级code
      if (!naviCodeObj[navicode]) {
        let naviGlobalization = 'menu.' + item.config.url.replace(item.config.name + '/', '').split('/')[0] + '.' + item.config.url.replace(item.config.name + '/', '').split('/')[1] + '.index';
        naviCodeObj[navicode] = {
          'globalization': naviGlobalization,//二级菜单国际化
          'children': [
            //三级菜单容器
          ]
        }
      }
      item.config.globalization = 'menu.' + item.config.url.split('/').join('.').replace('menu.', '') + '.index'

      naviCodeObj[navicode]['children'].push(item);
    })
    Object.keys(naviCodeObj).forEach(item => {
      naviList.push(naviCodeObj[item]);
    })
    this.selectedMenu['naviList'] = naviList;
    this.isMenuCollapsed = false;
    this.state.notifyDataChanged(keys.menuCollapsed, this.isMenuCollapsed);
    this.subMenuWidth = this.isMenuCollapsed ? '0' : '160px';
    this.toggleBtnRight = this.isMenuCollapsed ? '-12px' : '-172px';
  }

  menuCollapseClick() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.state.notifyDataChanged(keys.menuCollapsed, this.isMenuCollapsed);
    this.subMenuWidth = this.isMenuCollapsed ? '0' : '160px';
    this.toggleBtnRight = this.isMenuCollapsed ? '-12px' : '-172px';
  }

  submenuChange(event, submenu) {
    submenu.opened = !submenu.opened;
  }

  routerLinkEvent(event, routerLink) {
    this.router.navigate([routerLink]);
  }

  getTreeList(menu) {
    let list = [];
    let num = -1;
    for (let i = 0, len = menu.length; i < len; i++) {
      if (menu[i].level == 1) {
        list.push(menu[i]);
        menu.splice(i, 1);
        i--;
        len--;
      }
    }

    function getData(data) {//data  一级菜单
      if (menu.length == 0) {
        return;
      }
      for (let j = 0, jlen = data.length; j < jlen; j++) {//data  一级菜单
        let arr = [];
        for (let i = 0, len = menu.length; i < len; i++) {//menu 二级菜单
          if (menu[i].parentMenuCode == data[j].id) {
            arr.push(menu[i]);
            menu.splice(i, 1);
            i--;
            len--;
          }
        }
        data[j].children = arr;
        if (data[j].children.length > 0) {
          getData(data[j].children)
        }
      }
    }
    getData(list);
    return list;
  }

  public selected(e): void {
    let iListNodes = document.getElementsByTagName('i');
    for (let i = 0; i < iListNodes.length; i++) {
      if (iListNodes[i].classList.contains('actived')) {
        iListNodes[i].classList.remove('actived');
      }
    }
    let ev = e || window.event;
    let target = ev.target || ev.srcElement;
    let iNode = target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild;
    //iNode.classList.add('actived');
  }
  public selectedItem(e): void {
    let iListNodes = document.getElementsByTagName('i');
    for (let i = 0; i < iListNodes.length; i++) {
      if (iListNodes[i].classList.contains('actived')) {
        iListNodes[i].classList.remove('actived');
      }
    }
    let ev = e || window.event;
    let target = ev.target || ev.srcElement;
    let iNode = target.parentNode.parentNode.parentNode;
    iNode.classList.add('actived');
  }
  openChange($event, index) {
    this.menuList[index] = $event;
  }
  ngOnDestroy() {
    this.state.unsubscribe(keys.refurbished, this.pageName);
    this.state.unsubscribe(keys.changeTenant, this.pageName);
  }
}
