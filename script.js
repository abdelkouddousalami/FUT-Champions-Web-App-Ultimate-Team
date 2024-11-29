document.addEventListener('DOMContentLoaded', () => {
    
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
    

    const formation = [];
    const replacements = [];

    function addPlayer({ position: playerPosition, name: playerName, image: playerImage, flag: flagImage, teamLogo }) {
        const player = { position: playerPosition, name: playerName, image: playerImage, flag: flagImage, teamLogo };
        const positionInFormation = formation.find(p => p.position === playerPosition);

        if (!positionInFormation && formation.length < 11) {
            formation.push(player);
            return true;

        } else if (replacements.length < 6) {
            replacements.push(player);
            console.log("ramplacment : ", replacements);
            return false;

        } else {
            alert('Both formation and replacements are full. Cannot add more players.');
            return;
        }



    }
    function enableDragAndDrop() {
        const draggables = document.querySelectorAll('.player');
        const droppables = document.querySelectorAll('.maincont'); 
    
        draggables.forEach(draggable => {
            draggable.setAttribute('draggable', true);
    
            draggable.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('dragged-id', draggable.closest('.maincont').dataset.position);
                draggable.classList.add('dragging');
            });
    
            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });
    
        droppables.forEach(droppable => {
            droppable.addEventListener('dragover', (e) => {
                e.preventDefault();
                droppable.classList.add('drag-over');
            });
    
            droppable.addEventListener('dragleave', () => {
                droppable.classList.remove('drag-over');
            });
    
            droppable.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedPosition = e.dataTransfer.getData('dragged-id');
                const targetPosition = droppable.dataset.position;
    
                if (draggedPosition && targetPosition) {
                    swapPlayers(draggedPosition, targetPosition);
                }
    
                droppable.classList.remove('drag-over');
            });
        });
    }
    
    function swapPlayers(position1, position2) {
        const position1Container = document.querySelector(`.maincont[data-position="${position1}"]`);
        const position2Container = document.querySelector(`.maincont[data-position="${position2}"]`);
    
        if (position1Container && position2Container) {
            const player1 = position1Container.querySelector('.player');
            const player2 = position2Container.querySelector('.player');
    
           
            position1Container.innerHTML = '';
            position2Container.innerHTML = '';
    
            if (player1) position2Container.appendChild(player1);
            if (player2) position1Container.appendChild(player2);
    
           
            const player1Index = formation.findIndex(player => player.position === position1);
            const player2Index = formation.findIndex(player => player.position === position2);
    
            if (player1Index !== -1 && player2Index !== -1) {
                [formation[player1Index], formation[player2Index]] = [formation[player2Index], formation[player1Index]];
            }
    
            console.log("Updated Formation:", formation);
        }
    }
    
    


    function updateLists({ stats }) {
        const all = document.querySelector(".replacement");
        console.log(all);
        replacements.forEach(player => {
            const playerContainers = document.createElement('div');
            playerContainers.classList.add('maincont');
            playerContainers.setAttribute('data-position', player.position);
            const playerCard = document.createElement('div');
            playerCard.classList.add('player');

            const playerPosition = document.createElement('p');
            playerPosition.classList.add('player-position');
            playerPosition.textContent = player.position;

            const playerImage = document.createElement('img');
            playerImage.classList.add('player-image');
            console.log(player);
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
            <p>PAC: ${stats.pace}</p>
            <p>SHO: ${stats.shooting}</p>
            <p>PAS: ${stats.passing}</p>
            <p>DRI: ${stats.dribbling}</p>
            <p>DEF: ${stats.defending}</p>
            <p>PHY: ${stats.physical}</p>
        `;
            playerContainers.appendChild(statsDiv);
            all.appendChild(playerContainers);
        });

        enableDragAndDrop();
        console.log("Formation:", formation);
        console.log("Replacements:", replacements);
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

        if (!(playerPosition in formationPositions[currentFormation])) {
            alert('Invalid position for the current formation.');
            return;
        }

        if (addPlayer({
            position: playerPosition,
            name: playerName,
            image: playerImage,
            flag: flagImage,
            teamLogo
        }) === true) {
            const playerCard = createPlayerCard({
                position: playerPosition,
                name: playerName,
                image: playerImage,
                flag: flagImage,
                teamLogo,
                stats: { pace, shooting, passing, dribbling, defending, physical }
            });

            console.log(playerCard);





            const existingContainer = document.querySelector(`.maincont.${playerPosition}`);

            if (existingContainer) {
                console.log(1);

                existingContainer.replaceWith(playerCard);
            } else {
                playersContainer.appendChild(playerCard);
            }
        } else {
            updateLists({ stats: { pace, shooting, passing, dribbling, defending, physical } });
        }


        addPlayerForm.reset();
        enableDragAndDrop();
    });
});

