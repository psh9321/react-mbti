import { useQuestionMbtiHook } from "@/entities/question/mbti/hook/useQuestionMbtiHook";

import { ProgressBar, ProgressBox } from "./Progress"

export const MbtiTestProgressBar = () => {

    const { 
        progressPercent,
        totalQuestions,
        checkedQuestions,
    } = useQuestionMbtiHook();

    return (
        <ProgressBar progressPercent={progressPercent} totalQuestions={totalQuestions} checkedQuestions={checkedQuestions} />
    )
}

export const MbtiTestProgressBox = () => {
    
    const { 
        progressPercent,
        totalQuestions,
        checkedQuestions,
    } = useQuestionMbtiHook();

    return (
        <ProgressBox progressPercent={progressPercent} totalQuestions={totalQuestions} checkedQuestions={checkedQuestions}/>
    )
}