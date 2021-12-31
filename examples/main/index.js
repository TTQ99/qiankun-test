import 'zone.js'; // for angular subapp
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState,loadMicroApp  } from '../../es';
import './index.less';

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
// import render from './render/ReactRender';
import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });
console.log(window,123);
const loader = loading => render({ loading });

/**
 * Step2 注册子应用
 */
 const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
registerMicroApps(
  [
    {
      name: 'vue',
      entry: '//localhost:7101',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue',
    },
    {
      name: 'angular',
      entry: '//localhost:4200',
      container: '#subapp-viewport',
      loader,
      activeRule: '/scim-bigdata-app',
    }
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('%c 🍻 app: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', app);
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/vue');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
