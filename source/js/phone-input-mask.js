// Ссылка на видео, откуда взял код - https://youtu.be/Lxj_v5z0xRE
// Ссылка на гитхаб https://github.com/alexey-goloburdin/phoneinput

// Находим все поля ввода номера телефона
const phoneInputs = Array.from(document.querySelectorAll('input[data-tel-input]'));

/* /\D/g - глобальное регулярное выражение. Ищет все символы, которые не являются числами и удаляет их */
const regExp = /\D/g;

/**
 * @description Функция обрезает все символы кроме чисел
 * @param {text} input - символы вводимые пользователем в поле ввода
 * @return {number}
 */
const getInputNumbersValue = function (input) {
  return input.value.replace(regExp, '');
};

// Функция запрета вставки не числовых значений в поле ввода
const onPhonePaste = function (e) {
  const input = e.target;
  const inputNumbersValue = getInputNumbersValue(input);
  const pasted = e.clipboardData || window.Clipboard;
  if (pasted) {
    const pastedText = pasted.getData('Text');
    if (regExp.test(pastedText)) {
      input.value = inputNumbersValue;
      return;
    }
  }
};

// Функция созданя маски ввода номера телефона
const onPhoneInput = (e) => {
  const input = e.target;
  // Положение курсора
  const selectionStart = input.selectionStart;
  let inputNumbersValue = getInputNumbersValue(input);
  let formattedInputValue = '';

  // Если после обрезки символов цифр не осталось - оставляем пустую строку
  if (!inputNumbersValue) {
    input.value = '';
    return;
  }
  /* Проверяем положение курсора. Если в середине строки пользователь удаляет и  хочет поменять значение, то даем возможность редактирования без перекидывания курсора в конец строки */
  if (input.value.length !== selectionStart) {
    if (e.data && regExp.test(e.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
    // Российский номер телефона
    if (inputNumbersValue[0] === '9') {
      inputNumbersValue = '7' + inputNumbersValue;
    }
    const firstSymbols = (inputNumbersValue[0] === '8') ? '8' : '+7';
    formattedInputValue = input.value = firstSymbols + ' ';
    if (inputNumbersValue.length > 1) {
      formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
    }
  } else {
    // Иностранный номер телефона
    formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
  }
  input.value = formattedInputValue;
};

// Функция исправляет баг при удалении символов
const onPhoneKeyDown = function (e) {
  const inputValue = e.target.value.replace(regExp, '');
  if (e.key === 'Backspace' && inputValue.length === 1) {
    e.target.value = '';
  }
};

// Перебираем все поля ввода телефона и добавляем обработчик события
phoneInputs.forEach((input) => {
  input.addEventListener('input', onPhoneInput);
  input.addEventListener('keydown', onPhoneKeyDown, false);
  input.addEventListener('paste', onPhonePaste, false);
});

