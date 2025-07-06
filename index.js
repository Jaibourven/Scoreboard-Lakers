// Initialize counters
let homeScore = 0;
let guestScore = 0;
let homeFouls = 0;
let guestFouls = 0;
let quarter = 1;
let history = [];

// Function to update which team is in the lead
function updateLeaderHighlight() {
  const homeBoard = document.getElementById("home-board");
  const guestBoard = document.getElementById("guest-board");

  if (homeScore > guestScore) {
    homeBoard.classList.add("leader");
    guestBoard.classList.remove("leader");
  } else if (guestScore > homeScore) {
    guestBoard.classList.add("leader");
    homeBoard.classList.remove("leader");
  } else {
    // If the scores are tied, remove the highlight from both
    homeBoard.classList.remove("leader");
    guestBoard.classList.remove("leader");
  }
}

// Update home score and then check for leader highlighting
function updateHome(points) {
  homeScore += points;
  document.getElementById("home-score").textContent = homeScore;
  history.push({ type: "score", team: "home", value: points });
  updateLeaderHighlight();
}

//Undo button
function undo() {
  const lastAction = history.pop();
  if (!lastAction) return;

  switch (lastAction.type) {
    case "score":
      if (lastAction.team === "home") {
        homeScore -= lastAction.value;
        document.getElementById("home-score").textContent = homeScore;
      } else {
        document.getElementById("guest-score").textContent = guestScore;
      }
      updateLeaderHighlight();
      break;

    case "foul":
      if (lastAction.team === "home") {
        homeFouls -= lastAction.value;
        document.getElementById("home-fouls").textContent = homeFouls;
      } else {
        guestFouls -= lastAction.value;
        document.getElementById("guest-fouls").textContent = guestFouls;
      }
      break;
  }
}

// Update guest score and then check for leader highlighting
function updateGuest(points) {
  guestScore += points;
  document.getElementById("guest-score").textContent = guestScore;
  history.push({ type: "score", team: "home", value: points });
  updateLeaderHighlight();
}

// Update home fouls counter
function updateHomeFouls(points) {
  homeFouls += points;

  document.getElementById("home-fouls").textContent = homeFouls;
  history.push({ type: "score", team: "home", value: points });
}

// Update guest fouls counter
function updateGuestFouls(points) {
  guestFouls += points;
  document.getElementById("guest-fouls").textContent = guestFouls;
  history.push({ type: "score", team: "home", value: points });
}

// Increment the quarter (max quarter is 4)
function nextQuarter() {
  if (quarter < 4) {
    quarter++;
  } else {
    quarter = 4;
    alert("This is the final quarter!");
  }
  document.getElementById("quarter").textContent = quarter;
}

// Reset all counters to start a new game
function newGame() {
  homeScore = 0;
  guestScore = 0;
  homeFouls = 0;
  guestFouls = 0;
  quarter = 1;

  document.getElementById("home-score").textContent = homeScore;
  document.getElementById("guest-score").textContent = guestScore;
  document.getElementById("home-fouls").textContent = homeFouls;
  document.getElementById("guest-fouls").textContent = guestFouls;
  document.getElementById("quarter").textContent = quarter;

  updateLeaderHighlight();
}
