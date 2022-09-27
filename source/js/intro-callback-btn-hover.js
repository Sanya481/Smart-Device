const breakpoint = window.matchMedia('(min-width:1024px)');
// Ссылка для перехода к секции обратного вызова
const introCallbackBtn = document.querySelector('[data-intro-callback-btn]');

// Функция отлавливает положение курсора в ссылке
const checkMouseMove = () => {
  if (breakpoint.matches || introCallbackBtn) {
    introCallbackBtn.onmousemove = (evt) => {

      const x = evt.pageX - evt.target.offsetLeft;
      const y = evt.pageY - evt.target.offsetTop;

      evt.target.style.setProperty('--x', `${x}px`);
      evt.target.style.setProperty('--y', `${y}px`);
    };
  }
};

export {checkMouseMove};
