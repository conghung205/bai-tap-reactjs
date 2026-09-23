import { memo } from "react";
import { PRIZE_LADDER } from "../data/prizeLadder";

export const GameModals = memo(function GameModals({ 
    activeModal, 
    labels, 
    selectedOptionIndex, 
    cancelAnswerSelection, 
    confirmFinalAnswer, 
    phoneDialogue, 
    setActiveModal, 
    audiencePoll, 
    currentLevel, 
    closeWalkAwayModal, 
    executeWalkAway, 
    gameResult, 
    restartGame 
}) {
    if (!activeModal) return null;

    return (
        <>
            {activeModal === "confirm" && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/10 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400 text-2xl">
                            <i className="fa-solid fa-question"></i>
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">Xác nhận lựa chọn</h3>
                        <p className="text-slate-300 text-sm mb-6">Bạn có chắc chắn muốn chọn đáp án {labels[selectedOptionIndex]} là câu trả lời cuối cùng không?</p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={cancelAnswerSelection} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-sm transition">Thử chọn lại</button>
                            <button onClick={confirmFinalAnswer} className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl font-bold text-sm shadow-md transition">Chốt đáp án!</button>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === "phone" && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-sky-500/50 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 mx-auto mb-4 bg-sky-500/10 border border-sky-500/40 rounded-full flex items-center justify-center text-sky-400 text-2xl">
                            <i className="fa-solid fa-phone-volume"></i>
                        </div>
                        <h3 className="text-xl font-bold text-sky-300 mb-2">Gọi điện thoại cho người thân</h3>
                        <p className="text-xs text-slate-400 mb-4">Chuyên gia đang hỗ trợ bạn suy nghĩ...</p>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-sm text-slate-200 mb-6">
                            <p className="italic text-sky-200">{phoneDialogue}</p>
                        </div>
                        <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-sm transition">Cảm ơn người thân!</button>
                    </div>
                </div>
            )}

            {activeModal === "audience" && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 text-2xl">
                            <i className="fa-solid fa-chart-simple"></i>
                        </div>
                        <h3 className="text-xl font-bold text-emerald-300 mb-4">Ý kiến khán giả trường quay</h3>
                        <div className="space-y-3 mb-6">
                            {Object.entries(audiencePoll).map(([idxStr, percent]) => (
                                <div key={idxStr}>
                                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                        <span>{labels[parseInt(idxStr)]}</span>
                                        <span>{percent}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                                        <div className="bg-amber-400 h-full transition-all duration-700" style={{ width: `${percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition">Tiếp tục cuộc chơi</button>
                    </div>
                </div>
            )}

            {activeModal === "walkaway" && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-rose-500/50 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 mx-auto mb-4 bg-rose-500/10 border border-rose-500/40 rounded-full flex items-center justify-center text-rose-400 text-2xl">
                            <i className="fa-solid fa-hand"></i>
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">Dừng cuộc chơi?</h3>
                        <p className="text-slate-300 text-sm mb-6">
                            Bạn có chắc chắn muốn dừng cuộc chơi và mang về số tiền thưởng{" "}
                            <b className="text-amber-400">{currentLevel > 0 ? PRIZE_LADDER[currentLevel - 1] : 0} VNĐ</b> không?
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={closeWalkAwayModal} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-sm transition">Chơi tiếp</button>
                            <button onClick={executeWalkAway} className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-sm transition">Chắc chắn dừng</button>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === "gameover" && (
                <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-xl border ${gameResult.status === 'win' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : gameResult.status === 'walkaway' ? 'bg-sky-500/20 text-sky-400 border-sky-500/50' : 'bg-rose-500/20 text-rose-400 border-rose-500/50'}`}>
                            {gameResult.status === "win" && <i className="fa-solid fa-crown"></i>}
                            {gameResult.status === "walkaway" && <i className="fa-solid fa-sack-dollar"></i>}
                            {gameResult.status === "lose" && <i className="fa-solid fa-circle-xmark"></i>}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-amber-300 mb-2">{gameResult.title}</h2>
                        <p className="text-slate-300 text-sm sm:text-base mb-6">{gameResult.desc}</p>
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
                            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Số tiền thưởng của bạn</div>
                            <div className="text-2xl sm:text-3xl font-black text-amber-400">{gameResult.prize}</div>
                        </div>
                        <button onClick={restartGame} className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-extrabold text-base rounded-xl shadow-lg hover:scale-105 transition duration-200">
                            THỬ SỨC LẠI <i className="fa-solid fa-rotate-right ml-2"></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
});
