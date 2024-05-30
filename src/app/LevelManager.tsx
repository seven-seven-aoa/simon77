import { delay } from "../core/TimeManager";
import { addSequenceStep, clearUserSequence, getSequenceStep } from "./Sequencer";
import { GameLevel, GameStatus, SequenceStep } from "./GameTypes";
import { sequenceTrigger } from "./ButtonManager";
import { getGameStatus, isGameStatus, isGameStatusAny, setGameStatus } from "./GameStatus";
import { playGameOverMusic } from "./MusicPlayer";
import { time } from "./TimeConstants";
import { scoreValue } from "./GameElements";

export { initLevels, runNextLevel };

let _levelLimit: number | null = null;
function getLevelLimit(): number {
    if (_levelLimit !== null) {
        return isNaN(_levelLimit) ? 0 : _levelLimit;
    }
    const url = new URLSearchParams(window.location.search);
    _levelLimit = Number(url.get("l"));
    return getLevelLimit();
}

const _levels: GameLevel[] = [];
let _currentLevel: GameLevel | undefined;
let _sequenceStep: number = -1;

function initLevels() {
    setGameStatus(GameStatus.GameLevelInit);
    const speeds: number[] = [150, 200, 250, 300, 350, 400, 450, 500, 550, 600].reverse();
    const levelLimit: number = getLevelLimit();

    const levelArray: GameLevel[] = [];
    for (let i = 0; i < speeds.length; i++) {
        const speed = speeds[i];
        levelArray.push({
            levelNumber: i + 1,
            glowSpeedMs: speed * 0.65,
            playNoteSpeedMs: speed,
        });
        if (levelArray.length === levelLimit) {
            break;
        }
    }
    _levels.push(...levelArray.reverse());
    console.info({ _levels });
}

async function runNextLevel() {
    if (isGameStatus(GameStatus.UserTurnFailure)) {
        setGameStatus(GameStatus.GameOverLoser);
        await playGameOverMusic();
        setGameStatus(GameStatus.FreePlay);
        return;
    }

    if (isGameStatus(GameStatus.FreePlay)) {
        return;
    }
    
    if (!isGameStatusAny(GameStatus.Running, GameStatus.UserTurnSuccess)) {
        throw new Error("Invalid game status: " + getGameStatus());
    }
    
    if (isGameStatus(GameStatus.UserTurnSuccess)) {
        scoreValue().innerHTML = _currentLevel!.levelNumber.toString();
    }
    
    await delay(time.newLevelDelay);
    _currentLevel = _levels.pop();
    if (!_currentLevel) {
        setGameStatus(GameStatus.GameOverWinner);
        await playGameOverMusic();
        setGameStatus(GameStatus.FreePlay);
        return;
    }

    addSequenceStep(1);
    await sequencePlayback();
    _sequenceStep = -1;

    clearUserSequence();
    setGameStatus(GameStatus.UserTurnNext);
}

async function sequencePlayback() {
    const step: SequenceStep = getSequenceStep(++_sequenceStep);
    if (!step) {
        return;
    }
    sequenceTrigger(step.button, _currentLevel!.glowSpeedMs);
    await delay(_currentLevel!.playNoteSpeedMs);
    await sequencePlayback();
}
