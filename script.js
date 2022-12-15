const $start = document.querySelector(`#start`);
const $game = document.querySelector(`#game`);
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $gameTime = document.querySelector('#game-time');
let score = 0;
let isGameStarted = false;

const color = ['#93894c', '#545352', 'red', 'pink', 'yellow', '#1c0e3f'];

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener(`input`, setGameTime);

function show($arg){
    $arg.classList.remove(`hide`)
}

function hide($arg){
    $arg.classList.add(`hide`)
}

function startGame(){
    score = 0;
    setGameTime();
    $gameTime.setAttribute(`disabled`, `true`);
    show($timeHeader)
    hide($resultHeader)
    isGameStarted = true;
    $game.style.backgroundColor = 'white';
    hide($start);
    const interval = setInterval(() => {
        let time = parseFloat($time.textContent)

        if (time <= 0){
            clearInterval(interval);
            endGame();
        }else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    },100) ;
    renderBox();
}

function setGameScore(){
    $result.textContent = score.toString();
}

function setGameTime(){
    const time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
}

function endGame(){
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute(`disabled`);
   show($start);
    $game.innerHTML = '';
    $game.style.backgroundColor = `#ccc`;
    hide($timeHeader);
    show($resultHeader);
}

function handleBoxClick(event){
    if(isGameStarted){
        if(event.target.dataset.box){
            score++;
            renderBox();
        }
    }
}

function renderBox(){
    $game.innerHTML = '';
    const box = document.createElement('div');
    const boxSize = getRandom(30, 100);
    const gameSize = $game.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = `${boxSize}px`;
    box.style.position = `absolute`;
    box.style.backgroundColor = randomColor(color);
    box.style.top = getRandom(0, maxTop) + `px`;
    box.style.left = getRandom(0, maxLeft) + `px`;
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', `true`);

    $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(arr){
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}