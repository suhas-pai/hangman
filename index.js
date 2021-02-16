const images = [
  "images/0.jpg",
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg",
  "images/9.jpg",
  "images/10.jpg",
];

const words = [
  "hangman",
  "science",
  "website",
  "computer",
  "internet",
  "development",
  "programming",
];

const isAlphabetic = (key) => {
  const ch = key.toString();
  if (ch.length != 1) {
    return false;
  }

  return (ch[0] >= "A" && ch[0] <= "Z") || (ch[0] >= "a" && ch[0] <= "z");
};

let dashesElem = null;
let imageElem = null;
let gameOverElem = null;
let restartButton = null;

let imageIndex = 0;
let gameWordIndex = 0;
let gameWord = null;

let dashSpan = document.createElement("span");
dashSpan.innerHTML = "-";

const isGameOver = () => {
  return imageIndex >= images.length - 1 || gameWordIndex >= gameWord.length;
};

const setGameOverWithStatus = (gameStatus) => {
  gameOverElem.innerHTML = `Congratulations, You ${gameStatus}. Game Over`;

  dashesElem.className = "game-over";
  dashesElem.innerHTML = "";
  dashesElem.appendChild(gameOverElem);

  restartButton.style.display = "block";
};

const keydownCallback = (event) => {
  if (event.defaultPrevented) {
    return;
  }

  if (isGameOver()) {
    if (event.key.toString() == "Enter") {
      restartButton.click();
    }
  } else if (event.key === gameWord[gameWordIndex]) {
    let node = dashesElem.childNodes[gameWordIndex];

    node.innerHTML = gameWord[gameWordIndex];
    node.className = "word-letter";

    gameWordIndex++;
    if (isGameOver()) {
      setGameOverWithStatus("Won");
    }
  } else if (isAlphabetic(event.key)) {
    imageIndex++;
    imageElem.src = images[imageIndex];

    if (isGameOver()) {
      setGameOverWithStatus("Lost");
    }
  }

  event.preventDefault();
};

const runGame = () => {
  gameWord = words[Math.floor(Math.random() * words.length)];
  console.log(`GameWord: ${gameWord}`);

  dashesElem.className = "word-dashes";
  imageElem.src = images[0];

  for (let i = 0; i !== gameWord.length; i++) {
    dashesElem.appendChild(dashSpan.cloneNode(true));
  }
};

document.addEventListener("DOMContentLoaded", () => {
  dashesElem = document.getElementById("word-dashes");
  imageElem = document.getElementById("hangman-img");
  gameOverElem = document.createElement("span");
  restartButton = document.getElementById("restartButton");

  restartButton.onclick = () => {
    gameWord = null;

    imageIndex = 0;
    gameWordIndex = 0;
    dashesElem.innerHTML = "";

    restartButton.style.display = "none";
    runGame();
  };

  window.addEventListener("keydown", keydownCallback);
  runGame();
});
