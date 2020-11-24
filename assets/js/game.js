const dino = document.querySelector(".dino");
const game = document.querySelector(".game");
let position = 0;
let isDinoJumping = false;

const createCactus = () => {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add("cactus");
  cactus.style.left = `${cactusPosition}px`;
  game.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      game.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = "<h1 class='game-over'>Fim de jogo</h1>";
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 20);

  setTimeout(createCactus, randomTime);
};

const dinoJump = () => {
  isDinoJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isDinoJumping = false;
        } else {
          position -= 23;
          dino.style.bottom = `${position}px`;
        }
      }, 20);
    } else {
      position += 23;
      dino.style.bottom = `${position}px`;
    }
  }, 20);
};

const handleKeyUp = (e) => {
  if (e.keyCode === 32) {
    if (!isDinoJumping) {
      dinoJump();
    }
  }
};

document.addEventListener("keydown", handleKeyUp);

createCactus();
