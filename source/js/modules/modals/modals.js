import {ScrollLock} from '../../utils/scroll-lock';
import {FocusLock} from '../../utils/focus-lock';

export class callbacks {
  constructor(settings = {}) {
    this._scrollLock = new ScrollLock();
    this._focusLock = new FocusLock();

    this._callbackOpenElements = document.querySelectorAll('[data-open-callback]');
    this._openedcallbackElement = null;
    this._callbackName = null;
    this._enableScrolling = true;
    this._settingKey = 'default';

    this._settings = settings;
    this._preventDefault = this._settings[this._settingKey].preventDefault;
    this._stopPlay = this._settings[this._settingKey].stopPlay;
    this._lockFocus = this._settings[this._settingKey].lockFocus;
    this._startFocus = this._settings[this._settingKey].startFocus;
    this._focusBack = this._settings[this._settingKey].focusBack;
    this._eventTimeout = this._settings[this._settingKey].eventTimeout;
    this._openCallback = this._settings[this._settingKey].openCallback;
    this._closeCallback = this._settings[this._settingKey].closeCallback;

    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._callbackClickHandler = this._callbackClickHandler.bind(this);

    this._init();
  }

  _init() {
    if (this._callbackOpenElements.length) {
      document.addEventListener('click', this._documentClickHandler);
    }
  }

  _setSettings(settingKey = this._settingKey) {
    if (!this._settings[settingKey]) {
      return;
    }

    this._preventDefault =
      typeof this._settings[settingKey].preventDefault === 'boolean'
        ? this._settings[settingKey].preventDefault
        : this._settings[this._settingKey].preventDefault;
    this._stopPlay =
      typeof this._settings[settingKey].stopPlay === 'boolean'
        ? this._settings[settingKey].stopPlay
        : this._settings[this._settingKey].stopPlay;
    this._lockFocus =
      typeof this._settings[settingKey].lockFocus === 'boolean'
        ? this._settings[settingKey].lockFocus
        : this._settings[this._settingKey].lockFocus;
    this._startFocus =
      typeof this._settings[settingKey].startFocus === 'boolean'
        ? this._settings[settingKey].startFocus
        : this._settings[this._settingKey].startFocus;
    this._focusBack =
      typeof this._settings[settingKey].lockFocus === 'boolean'
        ? this._settings[settingKey].focusBack
        : this._settings[this._settingKey].focusBack;
    this._eventTimeout =
      typeof this._settings[settingKey].eventTimeout === 'number'
        ? this._settings[settingKey].eventTimeout
        : this._settings[this._settingKey].eventTimeout;
    this._openCallback = this._settings[settingKey].openCallback || this._settings[this._settingKey].openCallback;
    this._closeCallback = this._settings[settingKey].closeCallback || this._settings[this._settingKey].closeCallback;
  }

  _documentClickHandler(evt) {
    const target = evt.target;

    if (!target.closest('[data-open-callback]')) {
      return;
    }

    evt.preventDefault();

    this._callbackName = target.closest('[data-open-callback]').dataset.opencallback;

    if (!this._callbackName) {
      return;
    }

    this.open();
  }

  _documentKeydownHandler(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      evt.preventDefault();
      this.close(document.querySelector('.callback.is-active').dataset.callback);
    }
  }

  _callbackClickHandler(evt) {
    const target = evt.target;

    if (!target.closest('[data-close-callback]')) {
      return;
    }

    this.close(target.closest('[data-callback]').dataset.callback);
  }

  _addListeners(callback) {
    callback.addEventListener('click', this._callbackClickHandler);
    document.addEventListener('keydown', this._documentKeydownHandler);
  }

  _removeListeners(callback) {
    callback.removeEventListener('click', this._callbackClickHandler);
    document.removeEventListener('keydown', this._documentKeydownHandler);
  }

  _stopInteractive(callback) {
    if (this._stopPlay) {
      callback.querySelectorAll('video, audio').forEach((el) => el.pause());
      callback.querySelectorAll('[data-iframe]').forEach((el) => {
        el.querySelector('iframe').contentWindow.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', '*');
      });
    }
  }

  _autoPlay(callback) {
    callback.querySelectorAll('[data-iframe]').forEach((el) => {
      const autoPlay = el.closest('[data-auto-play]');
      if (autoPlay) {
        el.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    });
  }

  open(callbackName = this._callbackName) {
    const callback = document.querySelector(`[data-callback="${callbackName}"]`);

    if (!callback || callback.classList.contains('is-active')) {
      return;
    }

    document.removeEventListener('click', this._documentClickHandler);

    this._openedcallbackElement = document.querySelector('.callback.is-active');

    if (this._openedcallbackElement) {
      this._enableScrolling = false;
      this.close(this._openedcallbackElement.dataset.callback);
    }

    this._setSettings(callbackName);
    callback.classList.add('is-active');

    if (!this._openedcallbackElement) {
      this._scrollLock.disableScrolling();
    }

    if (this._openCallback) {
      this._openCallback();
    }

    if (this._lockFocus) {
      this._focusLock.lock('.callback.is-active', this._startFocus);
    }

    setTimeout(() => {
      this._addListeners(callback);
      this._autoPlay(callback);
      document.addEventListener('click', this._documentClickHandler);
    }, this._eventTimeout);
  }

  close(callbackName = this._callbackName) {
    const callback = document.querySelector(`[data-callback="${callbackName}"]`);
    document.removeEventListener('click', this._documentClickHandler);

    if (!callback || !callback.classList.contains('is-active')) {
      return;
    }

    if (this._lockFocus) {
      this._focusLock.unlock(this._focusBack);
    }

    callback.classList.remove('is-active');
    this._removeListeners(callback);
    this._stopInteractive(callback);

    if (this._closeCallback) {
      this._closeCallback();
    }

    if (this._enableScrolling) {
      setTimeout(() => {
        this._scrollLock.enableScrolling();
      }, this._eventTimeout);
    }

    setTimeout(() => {
      document.addEventListener('click', this._documentClickHandler);
    }, this._eventTimeout);

    this._setSettings('default');
    this._enableScrolling = true;
  }
}
