export default function DoneGameModal() {
    return (
        <>
            <div
                id="gameover-modal"
                class="fixed inset-0 bg-slate-950/90 backdrop-blur-custom z-50 hidden flex items-center justify-center p-4"
            >
                <div class="bg-slate-900 border-2 border-amber-500/80 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
                    <div
                        id="result-icon-box"
                        class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-xl"
                    ></div>

                    <h2
                        id="result-title"
                        class="text-2xl sm:text-3xl font-black text-amber-300 mb-2"
                    >
                        KẾT THÚC CUỘC CHƠI
                    </h2>
                    <p
                        id="result-desc"
                        class="text-slate-300 text-sm sm:text-base mb-6"
                    >
                        Rất tiếc! Đáp án của bạn chưa chính xác.
                    </p>

                    <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
                        <div class="text-xs text-slate-400 uppercase tracking-widest mb-1">
                            Số tiền thưởng của bạn
                        </div>
                        <div
                            id="final-prize-money"
                            class="text-2xl sm:text-3xl font-black text-amber-400"
                        >
                            0 VNĐ
                        </div>
                    </div>

                    <button
                        onclick="restartGame()"
                        class="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-extrabold text-base rounded-xl shadow-lg hover:scale-105 transition duration-200"
                    >
                        THỬ SỨC LẠI{" "}
                        <i class="fa-solid fa-rotate-right ml-2"></i>
                    </button>
                </div>
            </div>
        </>
    );
}
