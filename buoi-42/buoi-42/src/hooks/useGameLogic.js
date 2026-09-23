import { useState, useRef, useEffect, useCallback } from "react";
import { PRIZE_LADDER } from "../data/prizeLadder";
import { BACKUP_QUESTIONS, QUESTION_DATABASE } from "../data/questions";

export function useGameLogic(playSound) {
    const [gameState, setGameState] = useState("start");
    const [currentLevel, setCurrentLevel] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [showCorrectAnswerIndex, setShowCorrectAnswerIndex] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);

    const [usedLifelines, setUsedLifelines] = useState({
        5050: false,
        phone: false,
        audience: false,
        switch: false,
    });
    const [hiddenOptions, setHiddenOptions] = useState([]);

    const [activeModal, setActiveModal] = useState(null);
    const [phoneDialogue, setPhoneDialogue] = useState("");
    const [audiencePoll, setAudiencePoll] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 });
    const [gameResult, setGameResult] = useState({ title: "", desc: "", prize: "0 VNĐ", status: "" });

    const timerRef = useRef(null);
    const backupQuestionsRef = useRef([...BACKUP_QUESTIONS]);

    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        setTimeLeft(60);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                if (prev <= 11 && prev > 1) {
                    playSound("tick");
                }
                return prev - 1;
            });
        }, [playSound]);
    }, [playSound]);

    const stopTimer = useCallback(() => {
        clearInterval(timerRef.current);
    }, []);

    const showGameOverScreen = useCallback((isWinner, isTimeout = false, levelToUse = currentLevel) => {
        stopTimer();
        let prize = "0 VNĐ";

        if (isWinner) {
            prize = PRIZE_LADDER[14] + " VNĐ";
            setGameResult({
                title: "XUẤT SẮC! BẠN LÀ TRIỆU PHÚ!",
                desc: "Chúc mừng bạn đã chinh phục thành công tất cả 15 câu hỏi!",
                prize,
                status: "win"
            });
        } else {
            if (levelToUse >= 10) {
                prize = PRIZE_LADDER[9] + " VNĐ";
            } else if (levelToUse >= 5) {
                prize = PRIZE_LADDER[4] + " VNĐ";
            }
            const desc = isTimeout
                ? "Đã hết thời gian suy nghĩ cho câu hỏi này!"
                : "Rất tiếc! Đáp án của bạn chưa chính xác.";
            setGameResult({
                title: "KẾT THÚC CUỘC CHƠI",
                desc,
                prize,
                status: "lose"
            });
        }
        setActiveModal("gameover");
    }, [currentLevel, stopTimer]);

    const executeTimeout = useCallback(() => {
        setIsProcessingAnswer(true);
        playSound("wrong");
        const qData = activeQuestions[currentLevel];
        setShowCorrectAnswerIndex(qData?.correct);
        setAnswerStatus("wrong");

        setTimeout(() => {
            showGameOverScreen(false, true, currentLevel);
        }, 2000);
    }, [activeQuestions, currentLevel, playSound, showGameOverScreen]);

    const timeoutRef = useRef(executeTimeout);
    useEffect(() => { timeoutRef.current = executeTimeout; }, [executeTimeout]);

    useEffect(() => {
        if (timeLeft <= 0 && gameState === "playing" && !isProcessingAnswer) {
            clearInterval(timerRef.current);
            timeoutRef.current();
        }
    }, [timeLeft, gameState, isProcessingAnswer]);

    const startGame = useCallback(() => {
        setGameState("playing");
        setCurrentLevel(0);
        setUsedLifelines({ 5050: false, phone: false, audience: false, switch: false });
        setActiveQuestions(JSON.parse(JSON.stringify(QUESTION_DATABASE)));
        setHiddenOptions([]);
        setIsProcessingAnswer(false);
        setSelectedOptionIndex(null);
        setAnswerStatus(null);
        setShowCorrectAnswerIndex(null);
        backupQuestionsRef.current = [...BACKUP_QUESTIONS];
        startTimer();
    }, [startTimer]);

    const loadQuestion = useCallback(() => {
        setIsProcessingAnswer(false);
        setSelectedOptionIndex(null);
        setAnswerStatus(null);
        setShowCorrectAnswerIndex(null);
        setHiddenOptions([]);
        startTimer();
    }, [startTimer]);

    const selectAnswer = useCallback((index) => {
        if (isProcessingAnswer) return;
        playSound("select");
        setSelectedOptionIndex(index);
        setActiveModal("confirm");
    }, [isProcessingAnswer, playSound]);

    const cancelAnswerSelection = useCallback(() => {
        setSelectedOptionIndex(null);
        setActiveModal(null);
    }, []);

    const confirmFinalAnswer = useCallback(() => {
        setActiveModal(null);
        stopTimer();
        setIsProcessingAnswer(true);

        const qData = activeQuestions[currentLevel];

        setTimeout(() => {
            const isCorrect = selectedOptionIndex === qData.correct;

            if (isCorrect) {
                playSound("correct");
                setAnswerStatus("correct");

                setTimeout(() => {
                    if (currentLevel === 14) {
                        showGameOverScreen(true, false, currentLevel);
                    } else {
                        setCurrentLevel(prev => prev + 1);
                        loadQuestion();
                    }
                }, 2000);
            } else {
                playSound("wrong");
                setAnswerStatus("wrong");
                setShowCorrectAnswerIndex(qData.correct);

                setTimeout(() => {
                    showGameOverScreen(false, false, currentLevel);
                }, 2500);
            }
        }, 1500);
    }, [activeQuestions, currentLevel, selectedOptionIndex, stopTimer, playSound, showGameOverScreen, loadQuestion]);

    const handleUseLifeline = useCallback((type) => {
        if (usedLifelines[type] || isProcessingAnswer) return;
        playSound("lifeline");

        setUsedLifelines(prev => ({ ...prev, [type]: true }));
        const qData = activeQuestions[currentLevel];

        if (type === "5050") {
            let wrongIndices = [];
            for (let i = 0; i < 4; i++) {
                if (i !== qData.correct) wrongIndices.push(i);
            }
            wrongIndices.sort(() => Math.random() - 0.5);
            setHiddenOptions([wrongIndices[0], wrongIndices[1]]);
        } else if (type === "phone") {
            const letters = ["A", "B", "C", "D"];
            const correctLetter = letters[qData.correct];
            const dialogues = [
                `"Theo mình tìm hiểu thì đáp án chính xác chắc chắn là phương án ${correctLetter}."`,
                `"Chủ đề này mình đã đọc qua rồi, bạn hãy chọn phương án ${correctLetter} nhé!"`,
                `"Thực sự câu này hơi khó, nhưng mình nghiêng 80% về đáp án ${correctLetter}."`,
            ];
            setPhoneDialogue(dialogues[Math.floor(Math.random() * dialogues.length)]);
            setActiveModal("phone");
        } else if (type === "audience") {
            let percentCorrect = Math.floor(Math.random() * 30) + 55;
            let remaining = 100 - percentCorrect;

            let p = { 0: 0, 1: 0, 2: 0, 3: 0 };
            p[qData.correct] = percentCorrect;

            let otherIndices = [0, 1, 2, 3].filter((i) => i !== qData.correct);
            let p1 = Math.floor(Math.random() * remaining);
            remaining -= p1;
            let p2 = Math.floor(Math.random() * remaining);
            let p3 = remaining - p2;

            p[otherIndices[0]] = p1;
            p[otherIndices[1]] = p2;
            p[otherIndices[2]] = p3;

            setAudiencePoll(p);
            setActiveModal("audience");
        } else if (type === "switch") {
            if (backupQuestionsRef.current.length > 0) {
                const newQ = backupQuestionsRef.current.pop();
                setActiveQuestions(prev => {
                    const next = [...prev];
                    next[currentLevel] = newQ;
                    return next;
                });
                loadQuestion();
            }
        }
    }, [usedLifelines, isProcessingAnswer, playSound, activeQuestions, currentLevel, loadQuestion]);

    const openWalkAwayModal = useCallback(() => {
        if (isProcessingAnswer || gameState !== "playing") return;
        stopTimer();
        setActiveModal("walkaway");
    }, [isProcessingAnswer, gameState, stopTimer]);

    const closeWalkAwayModal = useCallback(() => {
        setActiveModal(null);
        if (!isProcessingAnswer) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
    }, [isProcessingAnswer]);

    const executeWalkAway = useCallback(() => {
        setActiveModal(null);
        let prize = "0 VNĐ";
        if (currentLevel > 0) {
            prize = PRIZE_LADDER[currentLevel - 1] + " VNĐ";
        }
        setGameResult({
            title: "DỪNG CUỘC CHƠI",
            desc: `Bạn đã quyết định dừng cuộc chơi tại Câu số ${currentLevel + 1}.`,
            prize,
            status: "walkaway"
        });
        setActiveModal("gameover");
    }, [currentLevel]);

    const restartGame = useCallback(() => {
        setActiveModal(null);
        setGameState("start");
    }, []);

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return {
        gameState, currentLevel, timeLeft, activeQuestions, isProcessingAnswer,
        selectedOptionIndex, showCorrectAnswerIndex, answerStatus, usedLifelines, hiddenOptions,
        activeModal, phoneDialogue, audiencePoll, gameResult,
        startGame, selectAnswer, cancelAnswerSelection, confirmFinalAnswer, handleUseLifeline,
        openWalkAwayModal, closeWalkAwayModal, executeWalkAway, restartGame, setActiveModal
    };
}
