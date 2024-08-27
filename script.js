const afcTeams = ["Bills", "Dolphins", "Patriots", "Jets", "Ravens", "Bengals", "Browns", "Steelers", 
                  "Texans", "Colts", "Jaguars", "Titans", "Broncos", "Chiefs", "Raiders", "Chargers"];
const nfcTeams = ["Cowboys", "Giants", "Eagles", "Commanders", "Bears", "Lions", "Packers", "Vikings",
                  "Falcons", "Panthers", "Saints", "Buccaneers", "Cardinals", "Rams", "49ers", "Seahawks"];

const players = ["Kinnon", "KJ", "Koby", "Kenzee", "Breena", "Richie", "Sean", "Hudson"];
let currentPlayerIndex = 0;
let currentRound = 1;
let isReversed = false;

function createPlayerDiv(player) {
    return `
        <div class="player">
            <div><strong>${player}</strong></div>
            <div>
                <div class="conference-label">AFC Teams</div>
                <div class="empty-box" id="${player}-afc1"></div>
                <div class="empty-box" id="${player}-afc2"></div>
            </div>
            <div>
                <div class="conference-label">NFC Teams</div>
                <div class="empty-box" id="${player}-nfc1"></div>
                <div class="empty-box" id="${player}-nfc2"></div>
            </div>
        </div>
    `;
}

function createDraftOptions() {
    const allTeams = shuffle([...afcTeams, ...nfcTeams]);
    const options = allTeams.map(team => `<button class="team-option">${team}</button>`).join('');
    return `<div class="draft-options">${options}</div>`;
}

function startDraft() {
    document.getElementById('draftContainer').innerHTML = createDraftOptions();
    document.querySelectorAll('.team-option').forEach(button => {
        button.addEventListener('click', handleTeamSelection);
    });
}

function handleTeamSelection(event) {
    const selectedTeam = event.target.textContent;
    const player = players[currentPlayerIndex];
    const conference = afcTeams.includes(selectedTeam) ? 'afc' : 'nfc';

    for (let i = 1; i <= 2; i++) {
        const box = document.getElementById(`${player}-${conference}${i}`);
        if (box && box.textContent === '') {
            box.textContent = selectedTeam;
            event.target.disabled = true;
            break;
        }
    }

    moveToNextPlayer();
}

function moveToNextPlayer() {
    if (isReversed) {
        currentPlayerIndex--;
        if (currentPlayerIndex < 0) {
            currentPlayerIndex = 0;
            isReversed = false;
            currentRound++;
        }
    } else {
        currentPlayerIndex++;
        if (currentPlayerIndex >= players.length) {
            currentPlayerIndex = players.length - 1;
            isReversed = true;
            currentRound++;
        }
    }

    if (currentRound > 2) {
        document.getElementById('draftContainer').innerHTML = '<h2>Draft Complete!</h2>';
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

document.getElementById('playerContainer').innerHTML = players.map(createPlayerDiv).join('');
document.getElementById('randomButton').addEventListener('click', startDraft);
