const pageBody = document.body;
// Для удобства поиска находим секцию header
const header = pageBody.querySelector('#header');
// Логотип сайта в планшетной/мобильной версии
const headerLogo = header.querySelector('#header__logo');
// Кнопка для открытия/закрытия меню
const burger = header.querySelector('#burger');
// Элемент - 'Бургер/Крестик'
const burgerMenu = burger.querySelector('#burger__menu');
// Навигация по сайту
const headerNav = header.querySelector('#header__nav');
// Навигация по сайту
const introBlock = pageBody.querySelector('#intro__block');

if (window.matchMedia('(max-width: 767px)').matches) {

  // Проверка работоспособности элементов при отключенном JavaScript
  const checkWorkJs = () => {
    if (header.classList.contains('no-js')) {
      header.classList.remove('no-js');
    }
  };

  checkWorkJs();

  /* Закрытие меню при клике вне области меню */
  const clickOverlay = (evt) => {
    const elementsСlickArea = !evt.composedPath().includes(headerNav);
    if (elementsСlickArea) {
      // скрываем элемент т.к. клик был за его пределами
      pageBody.classList.remove('scroll-lock');
      headerLogo.classList.remove('is-open');
      headerNav.classList.remove('is-open');
      burgerMenu.classList.remove('is-open');
      burger.classList.remove('is-open');
      introBlock.classList.remove('text-opacity');
      pageBody.classList.remove('shadow');
      document.removeEventListener('click', clickOverlay);
    }
  };

  /* Открытие меню при клике на бургер */
  burger.addEventListener('click', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    pageBody.classList.toggle('scroll-lock');
    headerLogo.classList.toggle('is-open');
    headerNav.classList.toggle('is-open');
    burgerMenu.classList.toggle('is-open');
    burger.classList.toggle('is-open');
    introBlock.classList.toggle('text-opacity');
    pageBody.classList.toggle('shadow');
    document.addEventListener('click', clickOverlay);
  });

  /* При нажатии на ссылку навигации сайта - закрываем мобильное меню и удаляем проставленные классы, чтобы меню ни мешало просмотру страницы */
  headerNav.addEventListener('click', (evt) => {
    if (evt.target.matches('a')) {
      pageBody.classList.remove('scroll-lock');
      headerLogo.classList.remove('is-open');
      headerNav.classList.remove('is-open');
      burgerMenu.classList.remove('is-open');
      burger.classList.remove('is-open');
      introBlock.classList.toggle('text-opacity');
      pageBody.classList.toggle('shadow');
      document.removeEventListener('click', clickOverlay);
    }
  });
}
