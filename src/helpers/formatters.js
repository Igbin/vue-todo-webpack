const toLetters = (e) => {
  const char = String.fromCharCode(e.keyCode);

  if(/^[A-Za-z]+$/.test(char)) {
    return true;
  } else {
    e.preventDefault();
  }
};

const toNumber = (e) => {
  const keysAllowed =
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', ',', '+', '-', '(', ')'];

  const keyPressed = e.key;

  if (!keysAllowed.includes(keyPressed)) {
    e.preventDefault();
  }
};

export { toLetters, toNumber };
