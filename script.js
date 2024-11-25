document.getElementById('addPlayerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const playerName = document.getElementById('playerName').value.trim();
    const playerPosition = document.getElementById('playerPosition').value.trim().toUpperCase();
    const playerImage = document.getElementById('playerImage').value.trim();
    const flagImage = document.getElementById('flagImage').value.trim();
    const teamLogo = document.getElementById('teamLogo').value.trim();

    const positionDiv = document.querySelector(`.backg .${playerPosition}`);
    if (!positionDiv) {
        alert("Invalid position entered. Please try again.");
        return;
    }

    const playerCard = document.createElement('div');
    playerCard.classList.add('player-card');

    playerCard.innerHTML = `
        <p class="player-position">${playerPosition}</p>
        <img class="player-image" src="${playerImage}" alt="${playerName}">
        <p class="player-name">${playerName}</p>
        <div class="details">
            <img class="flag" src="${flagImage}" alt="Flag">
            <img class="logo" src="${teamLogo}" alt="Team Logo">
        </div>
    `;

    positionDiv.innerHTML = "";
    positionDiv.appendChild(playerCard);

    this.reset();
});
