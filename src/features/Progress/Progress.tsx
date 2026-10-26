interface PROGRESS {
    progressPercent : number
    totalQuestions : number
    checkedQuestions : number
}

export const ProgressBar = ({progressPercent, totalQuestions, checkedQuestions} : PROGRESS) => {

    return (
        <div className="mb-[20px] rounded-[10px] border border-color-sub bg-[#FEFEFB] p-[20px]">
            <div className="mb-[10px] flex items-center justify-between gap-[10px] text-[0.9rem]">
                <span id="question-progress-label">문항 응답 진행률</span>
                <span aria-live="polite">{checkedQuestions}개 완료 / {totalQuestions}개 ({progressPercent}%)</span>
            </div>
            <div
                role="progressbar"
                aria-labelledby="question-progress-label"
                aria-valuemin={0}
                aria-valuemax={totalQuestions || 1}
                aria-valuenow={checkedQuestions}
                aria-valuetext={`${totalQuestions}개 중 ${checkedQuestions}개 응답 완료`}
                className="h-[10px] overflow-hidden rounded-full bg-color-sub/20"
            >
                <div className="h-full rounded-full bg-color-main transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${progressPercent}%` }} />
            </div>
        </div>
    );
};

export const ProgressBox = ({ progressPercent, totalQuestions, checkedQuestions } : PROGRESS) => {
    return (
        <div className="flex gap-[3px] text-[0.8rem]">
            <span>{checkedQuestions}개 완료</span> / <span>{totalQuestions}개 ({progressPercent}%)</span>
        </div>
    )
}