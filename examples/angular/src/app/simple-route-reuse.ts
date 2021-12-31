// import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

// export class SimpleReuseStrategy implements RouteReuseStrategy {

//   _cacheRouters: { [key: string]: any } = {};

//   shouldDetach(route: ActivatedRouteSnapshot): boolean {
//     // 默认对所有路由复用 可通过给路由配置项增加data: { keep: true }来进行选择性使用
//    // {path: 'search', component: SearchComponent, data: {keep: true}},
//     if (!route.data.keep) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
//     // 按path作为key存储路由快照&组件当前实例对象
//     // path等同RouterModule.forRoot中的配置
//     this._cacheRouters[route.routeConfig.path] = {
//       snapshot: route,
//       handle: handle
//     };
//   }

//   shouldAttach(route: ActivatedRouteSnapshot): boolean {
//     // 在缓存中有的都认为允许还原路由
//     return !!route.routeConfig && !!this._cacheRouters[route.routeConfig.path];
//   }

//   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
//     // 从缓存中获取快照，若无则返回null
//     if (!route.routeConfig || route.routeConfig.loadChildren || !this._cacheRouters[route.routeConfig.path]) return null;
//     return this._cacheRouters[route.routeConfig.path].handle;

//   }

//   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//     // 同一路由时复用路由
//     return future.routeConfig === curr.routeConfig;
//   }

// }



import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy
} from '@angular/router';
import { Injectable } from '@angular/core';

interface IRouteConfigData {
  reuse: boolean;
}

interface ICachedRoute {
  handle: DetachedRouteHandle;
  data: IRouteConfigData;
}
@Injectable({
  providedIn: 'root'
})
export class ZwRouteReuseStrategy implements RouteReuseStrategy {
  public static routeCache = new Map<string, ICachedRoute>();
  private static waitDelete: string; // 当前页未进行存储时需要删除
  private static currentDelete: string; // 当前页存储过时需要删除

  // routeCache=
  /** 进入路由触发，判断是否是同一路由 */
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    const IsReturn =
      future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) == JSON.stringify(curr.params);
    return IsReturn;
  }

  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断，这里判断是否有data数据判断是否复用 */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (this.getRouteData(route)) {
      return true;
    }
    return false;
  }

  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // const url = this.getFullRouteUrl(route);

    const url = this.getRouteUrl(route);
    const data = this.getRouteData(route);

    if (
      ZwRouteReuseStrategy.waitDelete &&
      ZwRouteReuseStrategy.waitDelete === url
    ) {
      // 如果待删除是当前路由，且未存储过则不存储快照
      ZwRouteReuseStrategy.waitDelete = null;
      return null;
    } else {
      // 如果待删除是当前路由，且存储过则不存储快照
      if (
        ZwRouteReuseStrategy.currentDelete &&
        ZwRouteReuseStrategy.currentDelete === url
      ) {
        ZwRouteReuseStrategy.currentDelete = null;
        return null;
      } else {
        if (handle) {
          ZwRouteReuseStrategy.routeCache.set(url, { handle, data });
          this.addRedirectsRecursively(route);
        }
      }
    }
  }

  /** 若 path 在缓存中有的都认为允许还原路由 */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // const url = this.getFullRouteUrl(route);
    const url = this.getRouteUrl(route);
    const handle = ZwRouteReuseStrategy.routeCache.has(url)
      ? ZwRouteReuseStrategy.routeCache.get(url).handle
      : null;
    const data = this.getRouteData(route);
    const IsReturn =
      data && ZwRouteReuseStrategy.routeCache.has(url) && handle != null;
    return IsReturn;
  }

  /** 从缓存中获取快照，若无则返回nul */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const url = this.getRouteUrl(route);
    const data = this.getRouteData(route);
    const IsReturn =
      data && ZwRouteReuseStrategy.routeCache.has(url)
        ? ZwRouteReuseStrategy.routeCache.get(url).handle
        : null;

    return IsReturn;
  }

  private addRedirectsRecursively(route: ActivatedRouteSnapshot): void {
    const config = route.routeConfig;
    if (config) {
      if (!config.loadChildren) {
        const routeFirstChild = route.firstChild;
        const routeFirstChildUrl = routeFirstChild
          ? this.getRouteUrlPaths(routeFirstChild).join('/')
          : '';
        const childConfigs = config.children;
        if (childConfigs) {
          const childConfigWithRedirect = childConfigs.find(
            c => c.path === '' && !!c.redirectTo
          );
          if (childConfigWithRedirect) {
            childConfigWithRedirect.redirectTo = routeFirstChildUrl;
          }
        }
      }
      route.children.forEach(childRoute =>
        this.addRedirectsRecursively(childRoute)
      );
    }
  }
  private getRouteUrl(route: ActivatedRouteSnapshot) {
    return (
      route['_routerState'].url.replace(/\//g, '_') +
      '_' +
      (route.routeConfig.loadChildren ||
        route.routeConfig.component
          .toString()
          .split('(')[0]
          .split(' ')[1])
    );
  }

  // private getFullRouteUrl(route: ActivatedRouteSnapshot): string {
  //   return this.getFullRouteUrlPaths(route)
  //     .filter(Boolean)
  //     .join('/')
  //     .replace('/', '_');
  // }

  // private getFullRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
  //   const paths = this.getRouteUrlPaths(route);
  //   return route.parent
  //     ? [...this.getFullRouteUrlPaths(route.parent), ...paths]
  //     : paths;
  // }

  private getRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
    return route.url.map(urlSegment => urlSegment.path);
  }

  private getRouteData(route: ActivatedRouteSnapshot): IRouteConfigData {
    return (
      route.routeConfig &&
      (route.routeConfig.data as IRouteConfigData) &&
      route.routeConfig.data.reuse
    );
  }

  /** 用于删除路由快照*/
  deleteRouteSnapshot(url: string): void {
    if (url[0] === '/') {
      url = url.substring(1);
    }
    url = url.replace('/', '_');
    if (ZwRouteReuseStrategy.routeCache.has(url)) {
      ZwRouteReuseStrategy.routeCache.delete(url);
      ZwRouteReuseStrategy.currentDelete = url;
    } else {
      ZwRouteReuseStrategy.waitDelete = url;
    }
  }
  public clear() {
    ZwRouteReuseStrategy.routeCache.clear();
  }
  public clearExcept(list) {
    if (!list || !ZwRouteReuseStrategy.routeCache) return;
    try {
      let waitDelete = [];
      ZwRouteReuseStrategy.routeCache.forEach((value: ICachedRoute, key) => {
        let handle: any = value.handle;
        let url = handle.route.value._routerState.snapshot.url;
        if (list.indexOf(url) < 0) {
          waitDelete.push(key);
        }
      });
      waitDelete.forEach(item => {
        ZwRouteReuseStrategy.routeCache.delete(item);
      });
    } catch (error) {
    }
  }
}



/**
 * reuse-strategy.ts
 * by corbfon 1/6/17
 */

// import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';

// /** Interface for object which can store both:
//  * An ActivatedRouteSnapshot, which is useful for determining whether or not you should attach a route (see this.shouldAttach)
//  * A DetachedRouteHandle, which is offered up by this.retrieve, in the case that you do want to attach the stored route
//  */
// interface RouteStorageObject {
//   snapshot: ActivatedRouteSnapshot;
//   handle: DetachedRouteHandle;
// }

// export class ZwRouteReuseStrategy implements RouteReuseStrategy {

//   /**
//    * Object which will store RouteStorageObjects indexed by keys
//    * The keys will all be a path (as in route.routeConfig.path)
//    * This allows us to see if we've got a route stored for the requested path
//    */
//   storedRoutes: { [key: string]: RouteStorageObject } = {};

//   /**
//    * Decides when the route should be stored
//    * If the route should be stored, I believe the boolean is indicating to a controller whether or not to fire this.store
//    * _When_ it is called though does not particularly matter, just know that this determines whether or not we store the route
//    * An idea of what to do here: check the route.routeConfig.path to see if it is a path you would like to store
//    * @param route This is, at least as I understand it, the route that the user is currently on, and we would like to know if we want to store it
//    * @returns boolean indicating that we want to (true) or do not want to (false) store that route
//    */
//   shouldDetach(route: ActivatedRouteSnapshot): boolean {
//     let detach: boolean = true;
//     console.log("detaching", route, "return: ", detach);
//     return detach;
//   }

//   /**
//    * Constructs object of type `RouteStorageObject` to store, and then stores it for later attachment
//    * @param route This is stored for later comparison to requested routes, see `this.shouldAttach`
//    * @param handle Later to be retrieved by this.retrieve, and offered up to whatever controller is using this class
//    */
//   store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
//     let storedRoute: RouteStorageObject = {
//       snapshot: route,
//       handle: handle
//     };

//     console.log("store:", storedRoute, "into: ", this.storedRoutes);
//     // routes are stored by path - the key is the path name, and the handle is stored under it so that you can only ever have one object stored for a single path
//     this.storedRoutes[route.routeConfig.path] = storedRoute;
//   }

//   /**
//    * Determines whether or not there is a stored route and, if there is, whether or not it should be rendered in place of requested route
//    * @param route The route the user requested
//    * @returns boolean indicating whether or not to render the stored route
//    */
//   shouldAttach(route: ActivatedRouteSnapshot): boolean {

//     // this will be true if the route has been stored before
//     let canAttach: boolean = !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path];

//     // this decides whether the route already stored should be rendered in place of the requested route, and is the return value
//     // at this point we already know that the paths match because the storedResults key is the route.routeConfig.path
//     // so, if the route.params and route.queryParams also match, then we should reuse the component
//     if (canAttach) {
//       let willAttach: boolean = true;
//       console.log("param comparison:");
//       console.log(this.compareObjects(route.params, this.storedRoutes[route.routeConfig.path].snapshot.params));
//       console.log("query param comparison");
//       console.log(this.compareObjects(route.queryParams, this.storedRoutes[route.routeConfig.path].snapshot.queryParams));

//       let paramsMatch: boolean = this.compareObjects(route.params, this.storedRoutes[route.routeConfig.path].snapshot.params);
//       let queryParamsMatch: boolean = this.compareObjects(route.queryParams, this.storedRoutes[route.routeConfig.path].snapshot.queryParams);

//       console.log("deciding to attach...", route, "does it match?", this.storedRoutes[route.routeConfig.path].snapshot, "return: ", paramsMatch && queryParamsMatch);
//       return paramsMatch && queryParamsMatch;
//     } else {
//       return false;
//     }
//   }

//   /**
//    * Finds the locally stored instance of the requested route, if it exists, and returns it
//    * @param route New route the user has requested
//    * @returns DetachedRouteHandle object which can be used to render the component
//    */
//   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

//     // return null if the path does not have a routerConfig OR if there is no stored route for that routerConfig
//     if (!route.routeConfig || !this.storedRoutes[route.routeConfig.path]) return null;
//     console.log("retrieving", "return: ", this.storedRoutes[route.routeConfig.path]);

//     /** returns handle when the route.routeConfig.path is already stored */
//     return this.storedRoutes[route.routeConfig.path].handle;
//   }

//   /**
//    * Determines whether or not the current route should be reused
//    * @param future The route the user is going to, as triggered by the router
//    * @param curr The route the user is currently on
//    * @returns boolean basically indicating true if the user intends to leave the current route
//    */
//   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//     console.log("deciding to reuse", "future", future.routeConfig, "current", curr.routeConfig, "return: ", future.routeConfig === curr.routeConfig);
//     return future.routeConfig === curr.routeConfig &&
//       JSON.stringify(future.params) == JSON.stringify(curr.params);
//   }

//   /**
//    * This nasty bugger finds out whether the objects are _traditionally_ equal to each other, like you might assume someone else would have put this function in vanilla JS already
//    * One thing to note is that it uses coercive comparison (==) on properties which both objects have, not strict comparison (===)
//    * @param base The base object which you would like to compare another object to
//    * @param compare The object to compare to base
//    * @returns boolean indicating whether or not the objects have all the same properties and those properties are ==
//    */
//   private compareObjects(base: any, compare: any): boolean {

//     // loop through all properties in base object
//     for (let baseProperty in base) {

//       // determine if comparrison object has that property, if not: return false
//       if (compare.hasOwnProperty(baseProperty)) {
//         switch (typeof base[baseProperty]) {
//           // if one is object and other is not: return false
//           // if they are both objects, recursively call this comparison function
//           case 'object':
//             if (typeof compare[baseProperty] !== 'object' || !this.compareObjects(base[baseProperty], compare[baseProperty])) { return false; } break;
//           // if one is function and other is not: return false
//           // if both are functions, compare function.toString() results
//           case 'function':
//             if (typeof compare[baseProperty] !== 'function' || base[baseProperty].toString() !== compare[baseProperty].toString()) { return false; } break;
//           // otherwise, see if they are equal using coercive comparison
//           default:
//             if (base[baseProperty] != compare[baseProperty]) { return false; }
//         }
//       } else {
//         return false;
//       }
//     }

//     // returns true only after false HAS NOT BEEN returned through all loops
//     return true;
//   }

//   public returnData(){
//     return this.storedRoutes
//   }
// }