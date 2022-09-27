import {trapFocus} from './trap-focus.js';

const pageBody = document.body;
// Секция в которой находится нужный нам элемент для удобства поиска
const header = document.querySelector('#header');
// Кнопка открытия модального окна
const orderСallButton = document.querySelector('#header__button');
// Секция с модальным окном для обратной связи
const callbackModalSection = document.querySelector('#callback-modal-section');
// Модальное окно с формой для обратной связи
const callbackModal = document.querySelector('#callback-modal');
// Форма обратной связи
const callbackMmodalForm = document.querySelector('#callback-modal-form');

if (callbackModal) {
  // Кнопка закрытия модального окна
  const callbackModalBtnClose = document.querySelector('#callback-modal__btn-close');
  // Поле для ввода имени в модальном окне
  const userNameInputOnModal = document.querySelector('[data-input-username]');
  // Поле для ввода телефона в модальном окне
  const userPhoneInputOnModal = document.querySelector('[data-input-phone]');
  // Поле для ввода вопроса в модальном окне
  const questionTextareaOnModal = document.querySelector('[data-textarea-question]');

  // Проверяем есть ли поддержка хранилища
  let isStorageSupport = true;

  let userNameStorage = '';
  let userPhoneStorage = '';

  try {
    userNameStorage = localStorage.getItem('userNameInputOnModal');
    userPhoneStorage = localStorage.getItem('phoneInputOnModal');
  } catch (err) {
    isStorageSupport = false;
  }

  /* Функция проверяет, что нажали кнопку Escape */
  const isEscapeKey = (evt) => evt.key === 'Escape';

  // Функция открытия модального окна, добавление обработчиков по закрытию и автофокус в поле ввода
  const onModalCallbackOpen = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    pageBody.classList.add('scroll-lock');
    header.classList.add('hiding');
    callbackModalSection.classList.add('show');
    userNameInputOnModal.focus();

    if (userNameStorage) {
      userNameInputOnModal.value = userNameStorage;
      userPhoneInputOnModal.value = userPhoneStorage;
      questionTextareaOnModal.focus();
    } else {
      userNameInputOnModal.focus();
    }

    // Добавили обработчик на закрытие по нажатию на крестик
    callbackModalBtnClose.addEventListener('click', onModaCallbackClose);
    // Добавили обработчик на закрытие по нажатию на клавишу Escape
    document.addEventListener('keydown', onModalCallbackEsc);
    // Добавили обработчик на закрытие по клику вне модального окна
    document.addEventListener('click', onClickOverlay);
    // Добавили обработчик проверерки заполненности полей ввода для имени и телефона
    callbackMmodalForm.addEventListener('submit', checkFillInputField);
    // Добавили обработчик на ловушку фокуса
    callbackModal.addEventListener('keydown', trapFocus);
  };

  // Закрытие модального окна и удаление обработчиков
  function closeModalCallback() {
    pageBody.classList.remove('scroll-lock');
    header.classList.remove('hiding');
    callbackModalSection.classList.remove('show');

    // Удалили обработчик на закрытие по крестику
    callbackModalBtnClose.removeEventListener('click', onModaCallbackClose);
    // Удалили обработчик на закрытие по нажатию на клавишу Escape
    document.removeEventListener('keydown', onModalCallbackEsc);
    // Удалили обработчик на закрытие по клику вне модального окна
    document.removeEventListener('click', onClickOverlay);
    // Удалили обработчик проверерки заполненности полей ввода для имени и телефона
    callbackMmodalForm.removeEventListener('submit', checkFillInputField);
    // Удалили обработчик на ловушку фокуса
    callbackModal.removeEventListener('keydown', trapFocus);

    orderСallButton.focus();
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

  // Провереряем заполненны ли поля ввода для имени и телефона
  function checkFillInputField(evt) {
    if (!userNameInputOnModal || !userPhoneInputOnModal) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userNameInputOnModal', userNameInputOnModal.value);
        localStorage.setItem('phoneInputOnModal', userPhoneInputOnModal.value);
      }
    }
  }

  if (orderСallButton) {
    orderСallButton.addEventListener('click', onModalCallbackOpen);
  }
}
