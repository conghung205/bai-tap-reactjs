export default function HelpModal() {
    return (
        <>
            <div
                id="audience-modal"
                class="fixed inset-0 bg-slate-950/80 backdrop-blur-custom z-50 hidden flex items-center justify-center p-4"
            >
                <div class="bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
                    <div class="w-16 h-16 mx-auto mb-4 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 text-2xl">
                        <i class="fa-solid fa-chart-simple"></i>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-300 mb-4">
                        Ý kiến khán giả trường quay
                    </h3>

                    <div class="space-y-3 mb-6">
                        <div>
                            <div class="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                <span>A</span>
                                <span id="poll-percent-A">0%</span>
                            </div>
                            <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                                <div
                                    id="bar-A"
                                    class="bg-amber-400 h-full w-0 transition-all duration-700"
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                <span>B</span>
                                <span id="poll-percent-B">0%</span>
                            </div>
                            <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                                <div
                                    id="bar-B"
                                    class="bg-amber-400 h-full w-0 transition-all duration-700"
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                <span>C</span>
                                <span id="poll-percent-C">0%</span>
                            </div>
                            <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                                <div
                                    id="bar-C"
                                    class="bg-amber-400 h-full w-0 transition-all duration-700"
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                <span>D</span>
                                <span id="poll-percent-D">0%</span>
                            </div>
                            <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                                <div
                                    id="bar-D"
                                    class="bg-amber-400 h-full w-0 transition-all duration-700"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <button
                        onclick="closeModal('audience-modal')"
                        class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition"
                    >
                        Tiếp tục cuộc chơi
                    </button>
                </div>
            </div>
        </>
    );
}
