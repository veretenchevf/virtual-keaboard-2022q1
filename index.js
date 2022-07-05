const HEADER = document.createElement('h1');
HEADER.innerHTML = 'DESIGNED FOR Windows';
const TXT_AREA = document.createElement('textarea');
TXT_AREA.classList.add('textarea');
TXT_AREA.autofocus = true;

const KB_WRAPPER = document.createElement('div');
KB_WRAPPER.classList.add('KB_WRAPPER');

const ENG_LAB = document.createElement('label');
ENG_LAB.classList.add('eng_lab');
ENG_LAB.innerText = 'EN / RU';

const ENG = document.createElement('input');
ENG.classList.add('eng');
ENG.type = 'checkbox';
ENG_LAB.appendChild(ENG);
ENG.defaultChecked = true;

const BODY = document.querySelector('body');
BODY.appendChild(HEADER);
BODY.appendChild(TXT_AREA);
BODY.appendChild(ENG_LAB);
BODY.appendChild(KB_WRAPPER);

let eng = ENG.checked;

const KEYS = [['`', 'Backquote', 'ё', '~'], ['1', 'Digit1', '!', '!', 'num'], ['2', 'Digit2', '"', '@', 'num'], ['3', 'Digit3', '№', '#', 'num'], ['4', 'Digit4', ';', '$', 'num'], ['5', 'Digit5', '%', '%', 'num'], ['6', 'Digit6', ':', '^', 'num'], ['7', 'Digit7', '?', '&', 'num'], ['8', 'Digit8', '*', '*', 'num'], ['9', 'Digit9', '(', '(', 'num'], ['0', 'Digit0', ')', ')', 'num'], ['-', 'Minus', '_', '_', 'num'], ['=', 'Equal', '+', '+', 'num'], ['Backspace', 'Backspace', 'Backspace', '', 'fnbackspace'], ['Tab', 'Tab', 'Tab', '', 'fntab'], ['q', 'KeyQ', 'й'], ['w', 'KeyW', 'ц'], ['e', 'KeyE', 'у'], ['r', 'KeyR', 'к'], ['t', 'KeyT', 'е'], ['y', 'KeyY', 'н'], ['u', 'KeyU', 'г'], ['i', 'KeyI', 'ш'], ['o', 'KeyO', 'щ'], ['p', 'KeyP', 'з'], ['[', 'BracketLeft', 'х', '{'], [']', 'BracketRight', 'ъ', '}'], ['\\', 'Backslash', '', '/'], ['Delete', 'Delete', 'Delete', '', 'fndelete'], ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'fncapslock'], ['a', 'KeyA', 'ф'], ['s', 'KeyS', 'ы'], ['d', 'KeyD', 'в'], ['f', 'KeyF', 'а'], ['g', 'KeyG', 'п'], ['h', 'KeyH', 'р'], ['j', 'KeyJ', 'о'], ['k', 'KeyK', 'л'], ['l', 'KeyL', 'д'], [';', 'Semicolon', 'ж'], ["'", 'Quote', 'э'], ['Enter', 'Enter', 'Enter', 'Enter', 'fnenter'], ['Shift', 'ShiftLeft', 'Shift', 'Shift', 'fnshift'], ['z', 'KeyZ', 'я'], ['x', 'KeyX', 'ч'], ['c', 'KeyC', 'с'], ['v', 'KeyV', 'м'], ['b', 'KeyB', 'и'], ['b', 'KeyB', 'и'], ['n', 'KeyN', 'т'], ['m', 'KeyM', 'ь'], [',', 'Comma', 'б'], ['.', 'Period', 'ю'], ['/', 'Slash', '/', '/'], ['Up', 'ArrowUp', 'Up', 'ArrowUp', 'fnarrow'], ['Shift', 'ShiftRight', 'Shift', 'Shift', 'fnshift'], ['Ctrl', 'ControlLeft', 'Ctrl', 'Ctrl', 'fnctrl'], ['Win', 'MetaLeft', 'Win', 'Win', 'fnwin'], ['Alt', 'AltLeft', 'Alt', 'Alt', 'fnalt'], [' ', 'Space', ' ', ' ', 'fnspace'], ['Alt', 'AltRight', 'Alt', 'Alt', 'fnalt'], ['Ctrl', 'ControlRight', 'Ctrl', 'Ctrl', 'fnctrl'], ['Left', 'ArrowLeft', 'Left', 'Left', 'fnarrow'], ['Down', 'ArrowDown', 'Down', 'Down', 'fnarrow'], ['Rght', 'ArrowRight', 'Rght', 'Right', 'fnarrow']];

const Key = class Key {
  constructor(key, code, rus, symbol, attr) {
    this.key = key;
    this.code = code;
    this.rus = rus;
    this.symbol = symbol;
    this.attr = attr;
  }
};

const LETTERS = [];
function createArr() {
  KEYS.forEach((item) => {
    LETTERS.push(new Key(...item));
  });
}

createArr();

function btnAnimation(btn) {
  function disact() {
    if (btn.classList.contains('active')) btn.classList.remove('active');
    TXT_AREA.focus();
    TXT_AREA.selectionStart = TXT_AREA.value.length;
    TXT_AREA.selectionEnd = TXT_AREA.value.length;
  }
  btn.classList.add('active');
  setTimeout(disact, 200);
}

function Register(e) {
  if (e.getModifierState('CapsLock') && e.getModifierState('Shift')) return false;
  if (e.getModifierState('CapsLock') || e.getModifierState('Shift')) return true;
}

function createBUTTON(letter) {
  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.setAttribute('id', `${letter.code}`);
  if (letter.attr === 'num') {
    const rusNum = `${letter.key}<SUB>${letter.rus}</SUB>`;
    const engNum = `<SUP>${letter.symbol}</SUP>${letter.key}`;
    btn.innerHTML = eng === false ? rusNum : engNum;
    btn.addEventListener('click', (e) => {
      if (eng === false) {
        TXT_AREA.value += Register(e) ? `${letter.rus}` : `${letter.key}`;
      } else {
        TXT_AREA.value += Register(e) ? `${letter.symbol}` : `${letter.key}`;
      }
    });
  } else {
    btn.innerHTML = eng === false ? letter.rus.toUpperCase() : letter.key.toUpperCase();
  }
  if (letter.attr) {
    btn.setAttribute('id', `${letter.code}`);
    btn.classList.add(`${letter.attr}`);
    if (btn.id === 'Space') {
      btn.addEventListener('click', () => {
        TXT_AREA.value += ' ';
      });
    }
    if (btn.id === 'Backspace') {
      btn.addEventListener('click', () => {
        const txtStart = TXT_AREA.selectionStart;
        const txtEnd = TXT_AREA.selectionEnd;
        const txtLength = TXT_AREA.value.length;
        const txt1block = TXT_AREA.value.substring(0, txtStart);
        const txt2block = TXT_AREA.value.substring(txtEnd, txtLength);
        if (txtStart === txtEnd) {
          TXT_AREA.value = TXT_AREA.value.substring(0, txtStart - 1)
          + TXT_AREA.value.substring(txtEnd, txtLength);
          TXT_AREA.focus();
          TXT_AREA.selectionStart = txtStart - 1;
          TXT_AREA.selectionEnd = txtStart - 1;
        } else {
          TXT_AREA.value = txt1block + txt2block;
          TXT_AREA.focus();
          TXT_AREA.selectionStart = txtStart;
          TXT_AREA.selectionEnd = txtStart;
        }
      });
    }
  } else {
    btn.addEventListener('click', (e) => {
      TXT_AREA.value += Register(e) ? `${e.target.innerHTML}` : `${e.target.innerHTML.toLowerCase()}`;
    });
  }
  if (letter.attr !== 'fncapslock' && letter.attr !== 'fnshift') {
    btn.addEventListener('click', () => btnAnimation(btn));
  }
  if (letter.attr === 'fnarrow') {
    btn.addEventListener('click', () => {
      switch (btn.id) {
        case 'ArrowUp':
          TXT_AREA.value += '▲';
          break;
        case 'ArrowDown':
          TXT_AREA.value += '▼';
          break;
        case 'ArrowLeft':
          TXT_AREA.value += '◄';
          break;
        case 'ArrowRight':
          TXT_AREA.value += '►';
          break;
        default: TXT_AREA.value += '';
      }
    });
  }
  if (letter.attr === 'fntab') {
    btn.addEventListener('click', () => {
      TXT_AREA.value += '   ';
    });
  }
  KB_WRAPPER.appendChild(btn);
}

function createKB() {
  LETTERS.forEach((letter) => {
    eng = localStorage.getItem('lang') === 'true';
    createBUTTON(letter, eng);
  });
}
createKB();

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.shiftKey) {
    KB_WRAPPER.innerHTML = '';
    ENG.checked = ENG.checked ? ENG.checked = false : ENG.checked = true;
    eng = ENG.checked;
    localStorage.setItem('lang', eng);
    createKB(eng);
  }
});

ENG.addEventListener('click', () => {
  KB_WRAPPER.innerHTML = '';
  eng = ENG.checked;
  localStorage.setItem('lang', eng);
  createKB(eng);
});

document.addEventListener('keydown', (e) => {
  if (e.code !== 'CapsLock' && e.code !== 'ShiftRight' && e.code !== 'ShiftLeft') {
    btnAnimation(document.querySelector(`#${e.code}`));
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'CapsLock' && e.getModifierState('CapsLock')) {
    document.querySelector('#CapsLock').classList.add('active');
  } else if (e.code === 'CapsLock' && !(e.getModifierState('CapsLock'))) {
    document.querySelector('#CapsLock').classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
    document.querySelector(`#${e.code}`).classList.add('active');
  }
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
    document.querySelector(`#${e.code}`).classList.remove('active');
  }
});
