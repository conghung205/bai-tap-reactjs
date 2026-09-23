import { memo } from "react";

export const Lifelines = memo(function Lifelines({ usedLifelines, handleUseLifeline }) {
    return (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 flex justify-around items-center gap-2 shadow-lg">
            <button
                onClick={() => handleUseLifeline('5050')}
                disabled={usedLifelines['5050']}
                className={`lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold transition-all ${usedLifelines['5050'] ? 'opacity-30 cursor-not-allowed text-slate-500 bg-slate-900 border border-slate-800' : 'text-amber-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-amber-500/40'}`}
            >
                <i className="fa-solid fa-percent text-base sm:text-lg"></i>
                <span>50:50</span>
            </button>
            <button
                onClick={() => handleUseLifeline('phone')}
                disabled={usedLifelines['phone']}
                className={`lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold transition-all ${usedLifelines['phone'] ? 'opacity-30 cursor-not-allowed text-slate-500 bg-slate-900 border border-slate-800' : 'text-sky-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-sky-500/40'}`}
            >
                <i className="fa-solid fa-phone text-base sm:text-lg"></i>
                <span className="hidden md:inline">Người thân</span>
                <span className="md:hidden">Gọi điện</span>
            </button>
            <button
                onClick={() => handleUseLifeline('audience')}
                disabled={usedLifelines['audience']}
                className={`lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold transition-all ${usedLifelines['audience'] ? 'opacity-30 cursor-not-allowed text-slate-500 bg-slate-900 border border-slate-800' : 'text-emerald-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-emerald-500/40'}`}
            >
                <i className="fa-solid fa-users text-base sm:text-lg"></i>
                <span className="hidden md:inline">Khán giả</span>
                <span className="md:hidden">Khán giả</span>
            </button>
            <button
                onClick={() => handleUseLifeline('switch')}
                disabled={usedLifelines['switch']}
                className={`lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold transition-all ${usedLifelines['switch'] ? 'opacity-30 cursor-not-allowed text-slate-500 bg-slate-900 border border-slate-800' : 'text-purple-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-purple-500/40'}`}
            >
                <i className="fa-solid fa-arrows-rotate text-base sm:text-lg"></i>
                <span className="hidden md:inline">Đổi câu hỏi</span>
                <span className="md:hidden">Đổi câu</span>
            </button>
        </div>
    );
});
