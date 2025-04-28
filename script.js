const choices = document.querySelectorAll('.choice');
const resultEl = document.querySelector('.result');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerImg = document.getElementById('player-choice');
const computerImg = document.getElementById('computer-choice');
const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand');

let playerScore = 0;
let computerScore = 0;

const handImages = {
    rock: 'images/rock.png',
    paper: 'images/paper.png',
    scissors: 'images/scissors.png',
    default: 'images/default.png'
};

function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
    // Сбрасываем изображения перед анимацией
    playerImg.src = handImages.default;
    computerImg.src = handImages.default;
    
    // Запускаем анимацию
    playerHand.classList.add('shake');
    computerHand.classList.add('shake');
    
    // Устанавливаем таймер для завершения анимации
    setTimeout(() => {
        // Устанавливаем финальные изображения
        playerImg.src = handImages[playerChoice];
        computerImg.src = handImages[computerChoice];
        
        // Убираем классы анимации
        playerHand.classList.remove('shake');
        computerHand.classList.remove('shake');
        
        // Определяем результат
        if (playerChoice === computerChoice) {
            resultEl.textContent = 'Ничья!';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            playerScore++;
            playerScoreEl.textContent = playerScore;
            resultEl.textContent = 'Вы выиграли этот раунд!';
        } else {
            computerScore++;
            computerScoreEl.textContent = computerScore;
            resultEl.textContent = 'Компьютер выиграл этот раунд!';
        }
    }, 600);
}

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (playerHand.classList.contains('shake')) return;
        
        const playerChoice = choice.dataset.choice;
        const computerChoice = computerPlay();
        
        resultEl.textContent = 'Идёт подсчёт...';
        playRound(playerChoice, computerChoice);
    });
});