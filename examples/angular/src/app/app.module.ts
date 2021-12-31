import { BrowserModule } from '@angular/platform-browser'; //每个在浏览器中运行的应用的根模块都需要引入BrowserModule
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';//自己创建的组件
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN, ar_EG } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { routing } from './app.routing';
import { AppState } from './app.service';
import { GlobalState } from './global.state';
import { CookieService } from 'ngx-cookie-service';
import { RouteReuseStrategy, RouterModule } from '@angular/router';//要使用路由功能，并且你要用到 RouterLink,.forRoot() 和 .forChild() 时
import { HttpModule } from '@angular/http';//http模块，当需要进行http远程请求时引入
import { PagesModule } from './pages/pages.module';
import { AccountBookFill, EditFill, AlertOutline, MinusSquareOutline, MinusSquareFill, MinusSquareTwoTone } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
const icons: IconDefinition[] = [MinusSquareTwoTone, MinusSquareFill, MinusSquareOutline, AlertOutline, EditFill];
import { DragulaModule } from 'ng2-dragula';
import { ZwRouteReuseStrategy } from './simple-route-reuse';
import { APP_BASE_HREF } from '@angular/common';

registerLocaleData(en);
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    PagesModule,
    routing,
    NzIconModule.forRoot(icons),
    DragulaModule.forRoot()
  ],
  providers: [
    AppState,
    GlobalState,
    CookieService,
    // { provide: NZ_ICONS, useValue: icons },
    // { provide: NZ_I18N, useValue: zh_CN },
    { provide: RouteReuseStrategy, useClass: ZwRouteReuseStrategy },
    // @ts-ignore
    { provide: APP_BASE_HREF, useValue: window.__POWERED_BY_QIANKUN__ ? '' : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
