import './public-path';
import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { ZwRouteReuseStrategy } from './app/simple-route-reuse';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

if (environment.production) {
  enableProdMode();
}
let app: void | NgModuleRef<AppModule>;
async function render() {
  app = await platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error("err:" + err));
}
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(props: Object) {
  // console.log(123);

}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: Object) {
  // obtainCache(props);
  render();
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: Object) {

  // @ts-ignore
  app.destroy();
}



// platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule)
//   .catch(err => console.error(err));
let noCache = false;
function obtainCache(props) {
  props.onGlobalStateChange && props.onGlobalStateChange((state, prev) => {
    console.log("----------------------state change--------------------------");
    console.log(state);

    if (state) {
      switch (state.event) {
        case 0: //add
          if (!noCache) {

          }

          // }
          break;
        case 1: //delete

          break;
        case 2: //refresh

          break;
        case 3: //reset list
          // reSetList

          break;
        case 5: //是否开启缓存
          if (state.noCache) {
            //只清除一次
            if (!noCache) {

            }
          }
          noCache = state.noCache;
          // reSetList

          break;
        default:
          break;
      }
    }
  });
}