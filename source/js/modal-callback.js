const breakpoint = window.matchMedia('(min-width:1024px)');

const breakpointChecker = () => {
  if (breakpoint.matches) {

    const pageBody = document.body;
    // Секция в которой находится нужный нам элемент для удобства поиска
    const header = pageBody.querySelector('#header');
    // Кнопка открытия модального окна
    const orderСallButton = header.querySelector('#header__button');
    // Модальное окно с формой для обратной связи
    const callbackModal = pageBody.querySelector('#callback-modal');
    // Кнопка закрытия модального окна
    const callbackModalBtnClose = callbackModal.querySelector('#callback-modal__btn-close');
    // Поле для ввода имени в модальном окне или просто первое поле ввода данных
    const firstInputOnModal = callbackModal.querySelector('input');


    /* Функция проверяет, что нажали кнопку Escape */
    const isEscapeKey = (evt) => evt.key === 'Escape';

    // Функция открытия модального окна, добавление обработчиков по закрытию и автофокус в поле ввода
    const onModalCallbackOpen = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      pageBody.classList.add('scroll-lock');
      pageBody.classList.add('shadow');
      header.classList.add('hiding');
      callbackModal.classList.add('show');
      firstInputOnModal.focus();

      // Добавили обработчик на закрытие по нажатию на крестик
      callbackModalBtnClose.addEventListener('click', onModaCallbackClose);
      // Добавили обработчик на закрытие по нажатию на клавишу Escape
      document.addEventListener('keydown', onModalCallbackEsc);
      // Добавили обработчик на закрытие по клику вне модального окна
      document.addEventListener('click', onClickOverlay);
    };

    // Закрытие модального окна и удаление обработчиков
    function closeModalCallback() {
      pageBody.classList.remove('scroll-lock');
      pageBody.classList.remove('shadow');
      header.classList.remove('hiding');
      callbackModal.classList.remove('show');

      // Удалили обработчик на закрытие по крестику
      callbackModalBtnClose.removeEventListener('click', onModaCallbackClose);
      // Удалили обработчик на закрытие по нажатию на клавишу Escape
      document.removeEventListener('key', onModalCallbackEsc);
      // Удалили обработчик на закрытие по клику вне модального окна
      document.removeEventListener('click', onClickOverlay);
    }

    /* Функция закрытия модального окна при клике вне области */
    function onClickOverlay(evt) {
      const elementsСlickArea = !evt.composedPath().includes(callbackModal);
      if (elementsСlickArea) {
        // скрываем элемент т.к. клик был за его пределами
        closeModalCallback();
      }
    }

    /* Функция закрытия модального окна по нажатию на крестик */
    function onModaCallbackClose() {
      closeModalCallback();
    }

    /* Функция закрытия модального окна по нажатию на Escape */
    function onModalCallbackEsc(evt) {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        closeModalCallback();
      }
    }

    orderСallButton.addEventListener('click', onModalCallbackOpen);
  }
};

breakpointChecker();
