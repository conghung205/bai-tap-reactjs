export default function WalkAwayModal() {
    return (
        <>
            <div
                id="walkaway-modal"
                class="fixed inset-0 bg-slate-950/80 backdrop-blur-custom z-50 hidden flex items-center justify-center p-4"
            >
                <div class="bg-slate-900 border border-rose-500/50 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
                    <div class="w-16 h-16 mx-auto mb-4 bg-rose-500/10 border border-rose-500/40 rounded-full flex items-center justify-center text-rose-400 text-2xl">
                        <i class="fa-solid fa-hand"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-100 mb-2">
                        Dừng cuộc chơi?
                    </h3>
                    <p class="text-slate-300 text-sm mb-6">
                        Bạn có chắc chắn muốn dừng cuộc chơi và mang về số tiền
                        thưởng{" "}
                        <b id="walkaway-amount" class="text-amber-400">
                            0 VNĐ
                        </b>{" "}
                        không?
                    </p>

                    <div class="flex gap-3 justify-center">
                        <button
                            onclick="closeModal('walkaway-modal')"
                            class="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-sm transition"
                        >
                            Chơi tiếp
                        </button>
                        <button
                            onclick="executeWalkAway()"
                            class="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-sm transition"
                        >
                            Chắc chắn dừng
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
