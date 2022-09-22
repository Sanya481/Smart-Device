// Секция в которой находится нужный нам элемент для удобства поиска
const about = document.querySelector('#about');
// Кнопка - больше информации
const aboutButton = about.querySelector('#about__button');
// Элемент с дополнительной информацией
const aboutMoreInfo = about.querySelector('#about__more-info');

aboutButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  aboutMoreInfo.classList.toggle('more');
});
