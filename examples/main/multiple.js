import { loadMicroApp } from '../../es';

let app;

function mount() {
  app = loadMicroApp(
    { name: 'react15', entry: '//localhost:7102', container: '#react15' },
    { sandbox: { experimentalStyleIsolation: true } },
    );
    console.log('%c 🥧 app: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', app);
}

function unmount() {
  app.unmount();
}

document.querySelector('#mount').addEventListener('click', mount);
document.querySelector('#unmount').addEventListener('click', unmount);

loadMicroApp({ name: 'vue', entry: '//localhost:7101', container: '#vue' });
