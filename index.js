const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.hole');
const scoreTable = document.getElementById('score');
const button = document.getElementById('button');
const game = document.getElementById('game');
let score = 0;
let isTimeOver = false;
let currMole;

const chouseMole = (moles) => {
  const index = Math.floor(Math.random() * moles.length);
  const mole = moles[index];
  if (mole === currMole) {
    return chouseMole(moles);
  }
  currMole = mole;
  return mole;
};

const showMole = () => {
  const DISPLAY_TIME = 700;
  const mole = chouseMole(moles);
  mole.classList.add('up');
  setTimeout(() => {
    mole.classList.remove('up');
    if (!isTimeOver) showMole();
  }, DISPLAY_TIME);
};

const startGame = () => {
  score = 0;
  scoreTable.innerText = score;
  button.disabled = true;
  isTimeOver = false;
  showMole();
  setTimeout(() => {
    button.disabled = false;
    isTimeOver = true;
  }, 20000);
  game.focus();
};

function kick(e) {
  if (!e.isTrusted) return;
  score += 1;
  scoreTable.innerText = score;
  this.classList.remove('up');
}

window.onload = () => {
  moles.forEach((mole) => mole.addEventListener('click', kick));
  button.addEventListener('click', () => {
    startGame();
  });
};
