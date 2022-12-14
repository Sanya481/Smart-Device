// https://hidde.blog/using-javascript-to-trap-focus-in-an-element/

// Модальное окно с формой для обратной связи
const callbackModal = document.querySelector('#callback-modal');

const focusableEls = callbackModal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="tel"]:not([disabled]), input[type="text"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
const firstFocusableEl = focusableEls[0];
const lastFocusableEl = focusableEls[focusableEls.length - 1];
const KEYCODE_TAB = 9;

const trapFocus = (evt) => {
  const isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

  if (!isTabPressed) {
    return;
  }

  if (evt.shiftKey) /* shift + tab */ {
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus();
      evt.preventDefault();
    }
  } else /* tab */ {
    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      evt.preventDefault();
    }
  }
};

export {trapFocus};
