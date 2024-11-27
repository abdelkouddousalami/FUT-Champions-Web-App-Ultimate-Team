document.addEventListener('DOMContentLoaded', () => {
    const addPlayerForm = document.getElementById('addPlayerForm');
    const formationSelector = document.getElementById('Formation');
    const playersContainer = document.querySelector('.backg');
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
            <p>PAC: ${stats.pace}</p>
            <p>SHO: ${stats.shooting}</p>
            <p>PAS: ${stats.passing}</p>
            <p>DRI: ${stats.dribbling}</p>
            <p>DEF: ${stats.defending}</p>
            <p>PHY: ${stats.physical}</p>
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

        // Validate position against the current formation
        if (!(playerPosition in formationPositions[currentFormation])) {
            alert('Invalid position for the current formation.');
            return;
        }

        const playerCard = createPlayerCard({
            position: playerPosition,
            name: playerName,
            image: playerImage,
            flag: flagImage,
            teamLogo,
            stats: { pace, shooting, passing, dribbling, defending, physical }
        });

        
        const existingContainer = document.querySelector(`.maincont.${playerPosition}`);
        if (existingContainer) {
            existingContainer.replaceWith(playerCard);
        } else {
            playersContainer.appendChild(playerCard);
        }

        addPlayerForm.reset();
    });
});

    