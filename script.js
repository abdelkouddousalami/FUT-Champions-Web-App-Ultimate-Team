
const addPlayerForm = document.getElementById('addPlayerForm');
const formationSelector = document.getElementById('Formation');
const playersContainer = document.querySelector('.backg');
const replacementDiv = document.querySelector('.replacement');
let currentFormation = '4-3-3';

const formationPositions = {
    '4-3-3': {
        'ST': { gridRow: 1, gridColumn: 3 },
        'LW': { gridRow: 2, gridColumn: 1 },
        'RW': { gridRow: 2, gridColumn: 5 },
        'CM1': { gridRow: 3, gridColumn: 4 },
        'CM2': { gridRow: 3, gridColumn: 2 },
        'CDM': { gridRow: 4, gridColumn: 3 },
        'LB': { gridRow: 5, gridColumn: 1 },
        'RB': { gridRow: 5, gridColumn: 5 },
        'CB1': { gridRow: 5, gridColumn: 4 },
        'CB2': { gridRow: 5, gridColumn: 2 },
        'GK': { gridRow: 6, gridColumn: 3 }
    },
    '4-4-2': {
        'ST': { gridRow: 1, gridColumn: 4 },
        'LW': { gridRow: 1, gridColumn: 2 },
        'RW': { gridRow: 2, gridColumn: 1 },
        'CM1': { gridRow: 2, gridColumn: 5 },
        'CM2': { gridRow: 3, gridColumn: 2 },
        'CDM': { gridRow: 3, gridColumn: 4 },
        'LB': { gridRow: 5, gridColumn: 1 },
        'RB': { gridRow: 5, gridColumn: 5 },
        'CB1': { gridRow: 5, gridColumn: 4 },
        'CB2': { gridRow: 5, gridColumn: 2 },
        'GK': { gridRow: 6, gridColumn: 3 }
    }
};
const playerPositionInput = document.getElementById('playerPosition');
const statsContainer = document.createElement('div');
statsContainer.id = 'statsContainer';
const form = document.getElementById('addPlayerForm');
form.insertBefore(statsContainer, document.querySelector('#btn'));
function updateStatsFields(position) {
    statsContainer.innerHTML = '';

    if (position.toUpperCase() === 'GK') {
        statsContainer.innerHTML = `
            
            <form id="addPlayerForm">
                <input type="number" id="Pace" placeholder="Diving" required>
                <input type="number" id="Shooting" placeholder="Handling" required>
                <input type="number" id="Passing" placeholder="Kicking" required>
                <input type="number" id="Dribbling" placeholder="Reflexes" required>
                <input type="number" id="Defending" placeholder="Speed" required>
                <input type="number" id="Physical" placeholder="Positioning" required>
            </form>
            `;
    } else {
        statsContainer.innerHTML = `
            <form id="addPlayerForm">
                <input type="number" id="Pace" placeholder="Pace" required>
                <input type="number" id="Shooting" placeholder="Shooting" required>
                <input type="number" id="Passing" placeholder="Passing" required>
                <input type="number" id="Dribbling" placeholder="Dribbling" required>
                <input type="number" id="Defending" placeholder="Defending" required>
                <input type="number" id="Physical" placeholder="Physical" required>
            </form>
            `;
    }
}
playerPositionInput.addEventListener('input', (e) => {
    const position = e.target.value.trim();
    updateStatsFields(position);
});
updateStatsFields('CM1');

function showEditForm(playerDiv) {
    const statsContainer = playerDiv.parentNode.querySelector('.player.back');
    const parent = playerDiv.closest(".maincont").querySelector(".player");
    console.log(parent);

    const position = parent.querySelector("p.player-position").textContent;
    console.log(position);

    statsContainer.innerHTML = '';

    const form = document.createElement('form');
    form.id = 'editPlayerForm';

    const stats = ['Rating','Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physical'];

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.textContent = 'Save';
    const inps = `
                <input type="number" id="Rating" placeholder="Rating" required>
                <input type="number" id="Pace" placeholder="Pace" required>
                <input type="number" id="Shooting" placeholder="Shooting" required>
                <input type="number" id="Passing" placeholder="Passing" required>
                <input type="number" id="Dribbling" placeholder="Dribbling" required>
                <input type="number" id="Defending" placeholder="Defending" required>
                <input type="number" id="Physical" placeholder="Physical" required>
    `;
    form.innerHTML = inps;
    form.appendChild(saveButton);

    document.querySelector(".editPlayerForm").appendChild(form);

    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        const updatedStats = {};
        stats.forEach(stat => {
            updatedStats[stat] = form.querySelector(`#${stat}`).value;
            let x = document.querySelector('.editPlayerForm')
            x.style.display = 'none';
        });

        playerDiv.parentNode.querySelector('.player.back').innerHTML = `
            <button class="remove-icon">❌</button>
            <p class="rat">${updatedStats.Rating}</p>
            <p class="pace">PAC: ${updatedStats.Pace}</p>
            <p class="shot">SHO: ${updatedStats.Shooting}</p>
            <p class="pass">PAS: ${updatedStats.Passing}</p>
            <p class="dribl">DRI: ${updatedStats.Dribbling}</p>
            <p class="defen">DEF: ${updatedStats.Defending}</p>
            <p class="phys">PHY: ${updatedStats.Physical}</p>
        `;
    });
}
const formation = [];
const replacements = [];

function addPlayer({ position: playerPosition, name: playerName, image: playerImage, flag: flagImage, teamLogo, stats }) {
    const player = {
        position: playerPosition,
        name: playerName,
        image: playerImage,
        flag: flagImage,
        teamLogo,
        stats
    };
    const positionInFormation = formation.find(p => p.position === playerPosition);

    if (!positionInFormation && formation.length < 11) {
        formation.push(player);
        return true;
    } else if (replacements.length < 6) {
        replacements.push(player);
        return false;
    } else {
        alert('Both formation and replacements are full. Cannot add more players.');
        return;
    }
}
function updateLists({ stats }) {
    const all = document.querySelector(".replacement");
    replacements.forEach(player => {
        const playerContainers = document.createElement('div');
        playerContainers.classList.add('maincont');

        const playerCard = document.createElement('div');
        playerCard.classList.add('player');

        const playerPosition = document.createElement('p');
        playerPosition.classList.add('player-position');
        playerPosition.textContent = player.position;

        const playerImage = document.createElement('img');
        playerImage.classList.add('player-image');
        playerImage.src = player.image || 'images/placeholder-player.png';
        playerImage.alt = player.name || player.position;

        const playerName = document.createElement('p');
        playerName.classList.add('player-name');
        playerName.textContent = player.name || 'Unknown Player';

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');

        const flagImage = document.createElement('img');
        flagImage.classList.add('flag');
        flagImage.src = player.flag || 'images/default-flag.png';
        flagImage.alt = 'Flag';

        const teamLogoImg = document.createElement('img');
        teamLogoImg.classList.add('logo');
        teamLogoImg.src = player.teamLogo || 'images/default-logo.png';
        teamLogoImg.alt = 'Team Logo';

        detailsDiv.appendChild(flagImage);
        detailsDiv.appendChild(teamLogoImg);

        playerCard.appendChild(playerPosition);
        playerCard.appendChild(playerImage);
        playerCard.appendChild(playerName);
        playerCard.appendChild(detailsDiv);
        playerContainers.appendChild(playerCard);

        const statsDiv = document.createElement('div');
        statsDiv.classList.add('player', 'back');
        statsDiv.innerHTML = `
            <button class="remove-icon">❌</button>
            <p class="rat">${stats.rating}</p>
            <p class="pace">PAC: ${stats.pace}</p>
            <p class="shot">SHO: ${stats.shooting}</p>
            <p class="pass">PAS: ${stats.passing}</p>
            <p class="dribl">DRI: ${stats.dribbling}</p>
            <p class="defen">DEF: ${stats.defending}</p>
            <p class="phys">PHY: ${stats.physical}</p>
        `;
        playerContainers.appendChild(statsDiv);
        all.appendChild(playerContainers);
    });

}

function updateFormation(formation) {
    currentFormation = formation;
    const positions = formationPositions[formation];

    document.querySelectorAll('.maincont').forEach(playerContainer => {
        const position = playerContainer.classList[1];
        if (positions[position]) {
            playerContainer.style.gridRow = positions[position].gridRow;
            playerContainer.style.gridColumn = positions[position].gridColumn;
        } else {
            playerContainer.style.gridRow = '';
            playerContainer.style.gridColumn = '';
        }
    });
}

formationSelector.addEventListener('change', (event) => {
    const selectedFormation = event.target.value;
    if (selectedFormation !== currentFormation) {
        updateFormation(selectedFormation);
    }
});

updateFormation(currentFormation);

function createPlayerCard({ position, name, image, flag, teamLogo, stats }) {
    const existingCard = document.querySelector(`.${position}`);
    if (existingCard) {
        existingCard.remove();
    }


    const playerContainer = document.createElement('div');
    playerContainer.classList.add('maincont', position);

    const playerCard = document.createElement('div');
    playerCard.classList.add('player', position);

    const playerPosition = document.createElement('p');
    playerPosition.classList.add('player-position');
    playerPosition.textContent = position;
    const rating = document.createElement('p');
    rating.classList.add('rtn');
    rating.textContent = rating;

    const playerImage = document.createElement('img');
    playerImage.classList.add('player-image');
    playerImage.src = image || 'images/placeholder-player.png';
    playerImage.alt = name || position;

    const playerName = document.createElement('p');
    playerName.classList.add('player-name');
    playerName.textContent = name || 'Unknown Player';

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const flagImage = document.createElement('img');
    flagImage.classList.add('flag');
    flagImage.src = flag || 'images/default-flag.png';
    flagImage.alt = 'Flag';

    const teamLogoImg = document.createElement('img');
    teamLogoImg.classList.add('logo');
    teamLogoImg.src = teamLogo || 'images/default-logo.png';
    teamLogoImg.alt = 'Team Logo';

    detailsDiv.appendChild(flagImage);
    detailsDiv.appendChild(teamLogoImg);

    playerCard.appendChild(playerPosition);
    playerCard.appendChild(playerImage);
    playerCard.appendChild(playerName);
    playerCard.appendChild(detailsDiv);

    const statsDiv = document.createElement('div');
    statsDiv.classList.add('player', position, 'back');
    statsDiv.innerHTML = `
            <button class="remove-icon">❌</button>
            <button class="edit-icon">✏️</button>
            <p id = "1">${stats.rating}</p>
            <p id = "2" >PAC: ${stats.pace}</p>
            <p id = "3">SHO: ${stats.shooting}</p>
            <p id = "4">PAS: ${stats.passing}</p>
            <p id = "5">DRI: ${stats.dribbling}</p>
            <p id = "6">DEF: ${stats.defending}</p>
            <p id = "7">PHY: ${stats.physical}</p>
        `;

    playerContainer.appendChild(playerCard);
    playerContainer.appendChild(statsDiv);

    return playerContainer;

}

playersContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-icon')) {

        const maincont = event.target.closest('.maincont');
        if (maincont) {
            maincont.innerHTML = `
                <div class="maincont ">
                 <div class="player ">
                <div class="details"></div>
                </div>
            <div class="player  back">
                <button class="remove-icon">❌</button>
            </div>
        </div>
                `;
        }
    }
});

addPlayerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const playerName = document.getElementById('playerName').value;
    const playerPosition = document.getElementById('playerPosition').value.trim().toUpperCase();
    const playerImage = document.getElementById('playerImage').value;
    const flagImage = document.getElementById('flagImage').value;
    const teamLogo = document.getElementById('teamLogo').value;
    const rating = document.getElementById('Rating').value;
    const pace = document.getElementById('Pace').value;
    const shooting = document.getElementById('Shooting').value;
    const passing = document.getElementById('Passing').value;
    const dribbling = document.getElementById('Dribbling').value;
    const defending = document.getElementById('Defending').value;
    const physical = document.getElementById('Physical').value;


    if (!playerName || !playerPosition || !playerImage || !flagImage || !teamLogo) {
        alert("All fields must be filled out.");
        return;
    }

    if (!(playerPosition in formationPositions[currentFormation])) {
        alert('Invalid position for the current formation.');
        return;
    }

    if (addPlayer({
        position: playerPosition,
        name: playerName,
        rating: rating,
        image: playerImage,
        flag: flagImage,
        teamLogo
    }) === true) {
        const playerCard = createPlayerCard({
            position: playerPosition,
            name: playerName,
            rating: rating,
            image: playerImage,
            flag: flagImage,
            teamLogo,
            stats: { rating, pace, shooting, passing, dribbling, defending, physical }
        });

        const existingContainer = document.querySelector(`.maincont.${playerPosition}`);

        if (existingContainer) {
            existingContainer.replaceWith(playerCard);
        } else {
            playersContainer.appendChild(playerCard);
        }
    } else {
        updateLists({ stats: { pace, shooting, passing, dribbling, defending, physical } });
    }
    addPlayerForm.reset();
    const editButtons = document.querySelectorAll('.edit-icon');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const playerDiv = e.target.closest('.player');
            showEditForm(playerDiv);
            let x = document.querySelector('.editPlayerForm')
            x.style.display = 'block';
        });
    });

});