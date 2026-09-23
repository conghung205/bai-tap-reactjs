export default function CallFriendModal() {
    return (
        <>
            <div
                id="phone-modal"
                class="fixed inset-0 bg-slate-950/80 backdrop-blur-custom z-50 hidden flex items-center justify-center p-4"
            >
                <div class="bg-slate-900 border border-sky-500/50 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
                    <div class="w-16 h-16 mx-auto mb-4 bg-sky-500/10 border border-sky-500/40 rounded-full flex items-center justify-center text-sky-400 text-2xl">
                        <i class="fa-solid fa-phone-volume"></i>
                    </div>
                    <h3 class="text-xl font-bold text-sky-300 mb-2">
                        Gọi điện thoại cho người thân
                    </h3>
                    <p class="text-xs text-slate-400 mb-4">
                        Chuyên gia đang hỗ trợ bạn suy nghĩ...
                    </p>

                    <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-sm text-slate-200 mb-6">
                        <p id="friend-dialogue" class="italic text-sky-200">
                            "Alo! Theo tôi nghĩ thì đáp án chính xác nhất ở câu
                            hỏi này nhiều khả năng là..."
                        </p>
                    </div>

                    <button
                        onclick="closeModal('phone-modal')"
                        class="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-sm transition"
                    >
                        Cảm ơn người thân!
                    </button>
                </div>
            </div>
        </>
    );
}
