// Блок с аккордионами
const accordionContainer = document.querySelector('[data-accordion-container]');
// Все аккордионы
const accordions = document.querySelectorAll('[data-accordion-block]');

// Проверка работоспособности элементов при отключенном JavaScript
const checkWorkJs = () => {
  if (accordionContainer.classList.contains('no-js')) {
    accordionContainer.classList.remove('no-js');
  }
};

if (accordionContainer) {
  checkWorkJs();
}

// Функция закрытия других аккордеонов при открытии одного
function closeAllAccordions() {
  accordions.forEach((accordion) => {
    accordion.classList.remove('is-open');
    accordion.querySelector('[data-accordion-title]').classList.remove('is-open');
    accordion.querySelector('[data-accordion-items]').style.maxHeight = '0px';
  });
}

/* Функция открытия аккордиона при клике */
const onOpenNavList = (evt) => {
  if (evt.target.matches('H3')) {

    const accordionBlock = evt.target.closest('[data-accordion-block]');
    const accordionItems = accordionBlock.querySelector('[data-accordion-items]');
    const accordionTitle = accordionBlock.querySelector('[data-accordion-title]');

    accordionBlock.classList.toggle('is-open');
    accordionTitle.classList.toggle('is-open');


    if (accordionBlock.classList.contains('is-open')) {
      closeAllAccordions();

      accordionBlock.classList.add('is-open');
      accordionTitle.classList.add('is-open');
      accordionItems.style.maxHeight = accordionItems.scrollHeight + 'px';
    } else {
      accordionItems.style.maxHeight = '0px';
    }
  }
};

// Вешаем слушатель на весь блок с аккордионами и отлавливваем клик через делегирование
if (accordionContainer) {
  accordionContainer.addEventListener('click', onOpenNavList);
}
