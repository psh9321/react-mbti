import { useRef } from "react";

import { useQuestionSubPropensityHook } from "@/entities/question/sub/hook/useQuestionSubPropensityHook"

interface QUESTION_CHECK_BOX {
    idx : number,
    mbti : MBTI.TYPE,
    is? : boolean | null
}

export const QuestionCheckBox = ( { is, idx, mbti } : QUESTION_CHECK_BOX) => {
    const { CheckQuestions } = useQuestionSubPropensityHook(mbti);

    const checkBoxRef = useRef<HTMLDivElement>(null);

    function CheckCallback(chk : boolean) {
        CheckQuestions(idx, chk);

        checkBoxRef?.current?.scrollIntoView({ block : "center", behavior : "smooth" });
    }

    return (
        <div data-question-sub-propensity-check={is !== null} ref={checkBoxRef} className="flex gap-[10px] mt-auto ml-auto [&>button]:w-[80px] [&>button]:py-[5px] [&>button]:border [&>button]:rounded-[8px] [&>button.on]:text-[#fff] [&>button.on]:bg-color-main [&>button.on]:border-color-main [@media(max-width:499px)]:[&>button]:w-[60px] [@media(max-width:499px)]:[&>button]:text-[0.8rem]">
            <button onClick={() => CheckCallback(true)} className={`${is && "on"}`}>예</button>
            <button onClick={() => CheckCallback(false)} className={`${is === false && "on"}`}>아니오</button>
        </div>
    )
}
