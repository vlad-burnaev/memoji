function func(a, b) {
  return 0.5 - Math.random();
}

let emoji = [
  "🐶",
  "🐱",
  "🐰",
  "🦁",
  "🐵",
  "🦄",
  "🐶",
  "🐱",
  "🐰",
  "🦁",
  "🐵",
  "🦄",
];

function createCards(cards) {
  emoji = emoji.sort(func);
  let card = document.createElement("div");
  let front = document.createElement("div");
  let back = document.createElement("div");
  card.classList.add("card");
  front.classList.add("front");
  back.classList.add("back");
  card.appendChild(front);
  card.appendChild(back);
  for (let i = 0; i < 12; i++) {
    let cardEl = card.cloneNode(true);
    cardEl.firstChild.textContent = emoji[i];
    cards.appendChild(cardEl);
  }
}

function mainFunc() {
  let cards = document.createElement("div");
  cards.classList.add("cards");
  document.querySelector(".cards-wrapper").appendChild(cards);

  createCards(cards);
  // ----- timer -----
  let sec = 60;
  let timerEl = document.createElement("div");
  timerEl.classList.add("timer");
  timerEl.textContent = "01:00";
  document.querySelector(".cards-wrapper").appendChild(timerEl);

  let sameCount = 0;
  let clickedCards = new Array();
  cards.addEventListener("click", (e) => {
    // ---- запуск таймера ----
    if (!cards.classList.contains("play")) {
      cards.classList.add("play");
      let timerID = setInterval(() => {
        sec--;
        timerEl.textContent = `00:${sec < 10 ? "0" : ""}${sec}`;
        if (sec === 0) {
          clearInterval(timerID);
          document.querySelector(".modal-window").classList.add("show");
          let lose = ["L", "o", "s", "e"];
          for (let i = 0; i < lose.length; i++) {
            let resText = document.createElement("span");
            resText.textContent = lose[i];
            document.querySelector(".result-text").appendChild(resText);
          }
          document.querySelector(".result-button").textContent = "Try again";
        }
        if (sameCount === 12) clearInterval(timerID);
      }, 1000);
    }
    let cardEl = e.target.offsetParent;
    if (
      !cardEl.classList.contains("flipped") &&
      cardEl.classList.contains("card")
    ) {
      clickedCards.push(cardEl);
      cardEl.classList.add("flipped");
      switch (clickedCards.length) {
        case 2:
          if (
            clickedCards[0].firstChild.textContent ===
            clickedCards[1].firstChild.textContent
          ) {
            clickedCards[0].firstChild.classList.add("same");
            clickedCards[1].firstChild.classList.add("same");
            sameCount += 2;
          } else {
            clickedCards[0].firstChild.classList.add("diff");
            clickedCards[1].firstChild.classList.add("diff");
          }
          break;
        case 3:
          if (clickedCards[0].firstChild.classList.contains("diff")) {
            clickedCards[0].firstChild.classList.remove("diff");
            clickedCards[1].firstChild.classList.remove("diff");
            clickedCards[0].classList.remove("flipped");
            clickedCards[1].classList.remove("flipped");
          }
          clickedCards.splice(0, 2);
          break;
      }
      if (sameCount === 12) {
        let win = ["W", "i", "n"];
        for (let i = 0; i < win.length; i++) {
          let resText = document.createElement("span");
          resText.textContent = win[i];
          document.querySelector(".result-text").appendChild(resText);
        }
        document.querySelector(".modal-window").classList.add("show");
        document.querySelector(".result-button").textContent = "Play again";
      }
    }
  });
}
mainFunc();

document.querySelector(".result-button").addEventListener("click", (e) => {
  document.querySelector(".modal-window").classList.remove("show");
  document.querySelector(".cards-wrapper").innerHTML = "";
  document.querySelector(".result-text").innerHTML = "";
  mainFunc();
});
