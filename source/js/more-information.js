// Секция в которой находится нужный нам элемент для удобства поиска
const about = document.querySelector('#about');
// Кнопка - больше информации
const aboutButton = about.querySelector('#about__button');
// Элемент с дополнительной информацией
const moreInfo = about.querySelector('#more-info');

aboutButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (moreInfo.style.display === 'none') {
    moreInfo.style.display = 'block';
    aboutButton.textContent = 'Свернуть';
  } else {
    moreInfo.style.display = 'none';
    aboutButton.textContent = 'Подробнее';
  }
});
