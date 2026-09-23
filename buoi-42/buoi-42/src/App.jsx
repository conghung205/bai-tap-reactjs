import { useCallback, memo } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StartScreen } from "./components/StartScreen";
import { MoneyLadder } from "./components/MoneyLadder";
import { Lifelines } from "./components/Lifelines";
import { GameModals } from "./components/GameModals";
import { useAudio } from "./hooks/useAudio";
import { useGameLogic } from "./hooks/useGameLogic";

const HeaderMemo = memo(Header);
const FooterMemo = memo(Footer);
const LABELS = ["A", "B", "C", "D"];

function App() {
    const { playSound, initAudio } = useAudio();
    const gameLogic = useGameLogic(playSound);

    const handleStart = useCallback(() => {
        initAudio();
        gameLogic.startGame();
    }, [initAudio, gameLogic]);

    const currentQData = gameLogic.activeQuestions[gameLogic.currentLevel];

    const getOptionClasses = useCallback((index) => {
        let baseClass = "option-btn p-4 rounded-xl text-left flex items-center gap-3 transition-all duration-200 border border-transparent";

        if (gameLogic.hiddenOptions.includes(index)) {
            return `${baseClass} invisible`;
        }

        if (gameLogic.selectedOptionIndex === index) {
            if (gameLogic.answerStatus === "correct") {
                return `${baseClass} bg-green-500 text-white correct`;
            } else if (gameLogic.answerStatus === "wrong") {
                return `${baseClass} bg-red-500 text-white wrong`;
            }
            return `${baseClass} bg-amber-500/90 text-slate-900 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)] selected`;
        }

        if (gameLogic.showCorrectAnswerIndex === index) {
            return `${baseClass} bg-green-500 text-white correct`;
        }

        return `${baseClass} bg-slate-800/80 hover:bg-slate-700/80 hover:border-indigo-400 text-slate-200`;
    }, [gameLogic.hiddenOptions, gameLogic.selectedOptionIndex, gameLogic.answerStatus, gameLogic.showCorrectAnswerIndex]);

    return (
        <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-slate-950 text-slate-200 font-sans">
            <HeaderMemo openWalkAwayModal={gameLogic.openWalkAwayModal} />

            <main className="flex-grow flex items-center justify-center p-2 sm:p-4 md:p-6 relative">
                {gameLogic.gameState === "start" && (
                    <StartScreen onStart={handleStart} />
                )}

                {gameLogic.gameState === "playing" && currentQData && (
                    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                        <div className="lg:col-span-3 space-y-6">
                            <Lifelines usedLifelines={gameLogic.usedLifelines} handleUseLifeline={gameLogic.handleUseLifeline} />

                            {/* Main Question Box */}
                            <div className="relative bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-indigo-500/60 rounded-2xl p-6 sm:p-8 min-h-[160px] sm:min-h-[200px] flex items-center justify-center text-center shadow-2xl">
                                <div className="absolute -top-3 left-6 bg-indigo-600 text-slate-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                                    Câu hỏi số <span className="text-yellow-300">{gameLogic.currentLevel + 1}</span>
                                </div>
                                <div className="absolute -top-3 right-6 bg-slate-900 border border-slate-800 text-slate-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2">
                                    <i className={`fa-regular fa-clock ${gameLogic.timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}></i>
                                    <span className={gameLogic.timeLeft <= 10 ? 'text-red-500 font-black' : ''}>{gameLogic.timeLeft}s</span>
                                </div>
                                <p className="text-base sm:text-xl md:text-2xl font-bold text-slate-100 leading-relaxed">
                                    {currentQData.question}
                                </p>
                            </div>

                            {/* Answer Options Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQData.answers.map((ans, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => gameLogic.selectAnswer(idx)}
                                        disabled={gameLogic.isProcessingAnswer}
                                        className={getOptionClasses(idx)}
                                    >
                                        <span className={`font-extrabold text-base sm:text-lg w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${gameLogic.selectedOptionIndex === idx && (gameLogic.answerStatus === 'correct' || gameLogic.answerStatus === 'wrong') ? 'text-white border-white/50 bg-white/20' : 'text-amber-400 bg-slate-900/80 border-amber-500/30'}`}>
                                            {LABELS[idx]}
                                        </span>
                                        <span className={`text-sm sm:text-base font-semibold ${gameLogic.selectedOptionIndex === idx && (gameLogic.answerStatus === 'correct' || gameLogic.answerStatus === 'wrong') ? 'text-white' : 'text-slate-200'}`}>
                                            {ans}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <MoneyLadder currentLevel={gameLogic.currentLevel} />
                    </div>
                )}
            </main>

            <GameModals
                activeModal={gameLogic.activeModal}
                labels={LABELS}
                selectedOptionIndex={gameLogic.selectedOptionIndex}
                cancelAnswerSelection={gameLogic.cancelAnswerSelection}
                confirmFinalAnswer={gameLogic.confirmFinalAnswer}
                phoneDialogue={gameLogic.phoneDialogue}
                setActiveModal={gameLogic.setActiveModal}
                audiencePoll={gameLogic.audiencePoll}
                currentLevel={gameLogic.currentLevel}
                closeWalkAwayModal={gameLogic.closeWalkAwayModal}
                executeWalkAway={gameLogic.executeWalkAway}
                gameResult={gameLogic.gameResult}
                restartGame={gameLogic.restartGame}
            />

            <FooterMemo />
        </div>
    );
}

export default App;
