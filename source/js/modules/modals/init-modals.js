import {callbacks} from './callbacks';

let callbacks;

// Здесь реализован пример открытия модалки через колбэк закрытия
// const opencallbackInCloseCallback = (name, context = this) => {
//   context._enableScrolling = false;
//   context._setSettings('default');
//   callbacks.open(name);
// };

// closeCallback() {
//   opencallbackInCloseCallback('callback-5');
// },

const settings = {
  'default': {
    preventDefault: true,
    stopPlay: true,
    lockFocus: true,
    startFocus: true,
    focusBack: true,
    eventTimeout: 400,
    openCallback: false,
    closeCallback: false,
  },
};

const initcallbacks = () => {
  const callbackElements = document.querySelectorAll('.callback');
  callbackElements.forEach((el) => {
    setTimeout(() => {
      el.classList.remove('callback--preload');
    }, 100);
  });
  callbacks = new callbacks(settings);
  // Используйте в разработке экспортируемую переменную callbacks, window сделан для бэкэнда
  window.callbacks = callbacks;
};

export {callbacks, initcallbacks};
