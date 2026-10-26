import { useQuestionSubPropensityHook } from "@/entities/question/sub/hook/useQuestionSubPropensityHook"
import { ProgressBar, ProgressBox } from "./Progress"

interface SUB_PROPENTSITY_TEST_PROGRESS {
    mbti : MBTI.TYPE
}

export const SubPropensityTestProgressBar = ({ mbti } : SUB_PROPENTSITY_TEST_PROGRESS) => {

    const { checkedQuestions, totalQuestions, progressPercent, } = useQuestionSubPropensityHook(mbti);

    return (
        <ProgressBar progressPercent={progressPercent} totalQuestions={totalQuestions} checkedQuestions={checkedQuestions} />
    )
}

export const SubPropensityTestProgressBox = ({ mbti } : SUB_PROPENTSITY_TEST_PROGRESS) => {
    const { checkedQuestions, totalQuestions, progressPercent, } = useQuestionSubPropensityHook(mbti);

    return (
        <ProgressBox progressPercent={progressPercent} totalQuestions={totalQuestions} checkedQuestions={checkedQuestions} />
    )
}