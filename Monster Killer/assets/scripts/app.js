const ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 25;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = parseInt(prompt('Max Life for You and Monster', '100'));
let chosenMaxLife = enteredValue;
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPLayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife); // From vendor.js file

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };

    //Switch always useses === Operator Behind the Scenes
    switch (ev) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        default:
            break;
    }

    battleLog.push(logEntry);
}
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPLayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPLayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPLayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPLayerHealth
    );

    if (currentPLayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife; // Vendor Js file to Update UI
        currentPLayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You Would Be Dead But Bonus Life Saved You');
    }

    if (currentPLayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('IT IS A DRAW!!!');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'IT WAS A DRAW',
            currentMonsterHealth,
            currentPLayerHealth
        );
        reset();
    } else if (currentPLayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('Sorry u lost');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'MONSTER WON',
            currentMonsterHealth,
            currentPLayerHealth
        );
        reset();
    } else if (currentMonsterHealth <= 0 && currentPLayerHealth > 0) {
        alert('!!!!!!OME-DE-T0H GOSAI MAS!!!!!!!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPLayerHealth
        );
        reset();
    }
}

function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE; //Terneary Operation
    const logEvent =
        mode === MODE_ATTACK
            ? LOG_EVENT_PLAYER_ATTACK
            : LOG_EVENT_PLAYER_STRONG_ATTACK;

    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPLayerHealth);
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(damage) {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPLayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't Heal more than your Max Initial Health");
        healValue = chosenMaxLife - currentPLayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPLayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPLayerHealth
    );
    endRound();
}

function printLogHandler() {
    for (let i = 0; i < 3; i++) {
        console.log('-------------------- ');
    }
    //Can only be used with arrays ie: for of loop
    let i = 0;
    for (const logEntry of battleLog) {
        console.log(`#${i}`);
        //Can only be used with objects ie: for of loop
        for (const key in logEntry) {
            console.log(key + ' : ', logEntry[key]);
            //console.log(logEntry[key]);
        }
        i++;
    }
    //    console.log(battleLog);
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
