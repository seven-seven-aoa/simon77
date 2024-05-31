import { delay } from "../core/TimeManager";
import { addSequenceStep, clearUserSequence, getSequenceStep } from "./Sequencer";
import { GameLevel, GameStatus, SequenceStep } from "./GameTypes";
import { sequenceTrigger } from "./ButtonManager";
import { getGameStatus, isGameStatus, isGameStatusAny, setGameStatus } from "./GameStatus";
import { playLoserMusic, playWinnerMusic } from "./MusicPlayer";
import { time } from "./TimeConstants";
import { scoreValue } from "./GameElements";

export { initLevels, runNextLevel };

interface LevelAdjust {
    maxLevels: number;
    skipLevels: number;
    initialSequenceLength: number;
    newNoteCountPerLevel: number;
}
function getLevelAdjust(defaultMax: number): LevelAdjust {
    const url = new URLSearchParams(window.location.search);
    let adjust: LevelAdjust = {
        maxLevels: defaultMax,
        skipLevels: 0,
        initialSequenceLength: 1,
        newNoteCountPerLevel: 1,
    };
    try {
        const json = url.get("la");
        console.info({ json });
        if (json) {
            adjust = JSON.parse(json);
        }
    } catch (levelAdjustError) {
        console.warn({ levelAdjustError });
    }
    adjust.maxLevels ??= defaultMax;
    adjust.skipLevels ??= 0;
    adjust.initialSequenceLength ??= 1;
    adjust.newNoteCountPerLevel ??= 1;
    console.info({ adjust });
    return adjust;
}

const _levels: GameLevel[] = [];
let _adjust: LevelAdjust;
let _currentLevel: GameLevel | undefined;
let _sequenceStep: number = -1;

function initLevels() {
    setGameStatus(GameStatus.GameLevelInit);
    const speeds: number[] = [600, 550, 500, 450, 400, 350, 300, 250, 200, 150];
    _adjust = getLevelAdjust(speeds.length);
    while (_adjust.maxLevels > speeds.length) {
        speeds.push(speeds[speeds.length - 1]);
    }

    let levelNum = 1;
    for (let i = 0; i < speeds.length; i++) {
        const speed = speeds[i];
        if (i < _adjust.skipLevels) {
            continue;
        }
        _levels.push({
            levelNumber: levelNum,
            glowSpeedMs: speed * 0.65,
            playNoteSpeedMs: speed,
        });
        levelNum++;
        if (_levels.length === _adjust.maxLevels) {
            break;
        }
    }
    console.info({ _levels });
}

async function runNextLevel() {
    if (isGameStatus(GameStatus.UserTurnFailure)) {
        setGameStatus(GameStatus.GameOverLoser);
        await playLoserMusic();
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
    _currentLevel = _levels.shift();
    if (!_currentLevel) {
        setGameStatus(GameStatus.GameOverWinner);
        await playWinnerMusic();
        setGameStatus(GameStatus.FreePlay);
        return;
    }

    console.info({ _currentLevel });
    addSequenceStep(_adjust.newNoteCountPerLevel, _adjust.initialSequenceLength);
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
