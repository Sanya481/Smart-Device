// Секция в которой находится нужный нам элемент для удобства поиска
const about = document.querySelector('#about');
// Кнопка - больше информации
const aboutButton = about.querySelector('#about__button');
// Блок с информацией
const aboutInfo = about.querySelector('#about__info');
// Элемент с дополнительной информацией
const aboutMoreInfo = about.querySelector('#about__more-info');

// Проверка работоспособности элементов при отключенном JavaScript
const checkWorkJs = () => {
  if (aboutInfo.classList.contains('no-js')) {
    aboutInfo.classList.remove('no-js');
  }
};

checkWorkJs();

/* Функция открытия дополнительной информации */
const onOpenNavList = (evt) => {
  evt.preventDefault();

  aboutMoreInfo.classList.toggle('more-info');

  if (aboutMoreInfo.classList.contains('more-info')) {
    aboutButton.textContent = 'Свернуть';
    aboutMoreInfo.style.maxHeight = aboutMoreInfo.scrollHeight + 'px';
  } else {
    aboutButton.textContent = 'Подробнее';
    aboutMoreInfo.style.maxHeight = '0';
  }
};

// Проверяем, есть ли элемент на странице
if (aboutButton) {
  aboutButton.addEventListener('click', onOpenNavList);
}

