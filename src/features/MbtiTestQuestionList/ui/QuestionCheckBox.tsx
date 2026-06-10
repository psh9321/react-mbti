import { useRef } from "react";

import { useQuestionMbtiHook } from "@/entities/question/mbti/hook/useQuestionMbtiHook"

interface QUESTION_CHECK_BOX {
    idx : number,
    is? : boolean | null
}

export const QuestionCheckBox = ( { is, idx } : QUESTION_CHECK_BOX) => {
    const { CheckQuestions } = useQuestionMbtiHook();

    const checkBoxRef = useRef<HTMLDivElement>(null);

    function CheckCallback(chk : boolean) {
        CheckQuestions(idx, chk);

        checkBoxRef?.current?.scrollIntoView({ block : "center", behavior : "smooth" });
    }

    return (
        <div data-question-mbti-check={is !== null} ref={checkBoxRef} className="flex gap-[10px] mt-auto ml-auto [&>button]:w-[80px] [&>button]:py-[5px] [&>button]:border [&>button]:rounded-[8px] [&>button.on]:text-[#fff] [&>button.on]:bg-color-main [&>button.on]:border-color-main [@media(max-width:499px)]:[&>button]:w-[60px] [@media(max-width:499px)]:[&>button]:text-[0.8rem]">
            <button onClick={() => CheckCallback(true)} className={`${is && "on"}`}>예</button>
            <button onClick={() => CheckCallback(false)} className={`${is === false && "on"}`}>아니오</button>
        </div>
    )
}