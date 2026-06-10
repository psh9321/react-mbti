import { useQuestionSubPropensityHook } from "@/entities/question/sub/hook/useQuestionSubPropensityHook"
import { QuestionCheckBox } from "./ui/QuestionCheckBox";
import { useEffect } from "react";

interface SUB_PROPENSITY_TEST_QUESTION_LIST {
    mbti : MBTI.TYPE
}

export const SubPropensityTestQuestionList = ( { mbti } : SUB_PROPENSITY_TEST_QUESTION_LIST ) => {

    const { questions } = useQuestionSubPropensityHook(mbti);

    useEffect(() => {
        window.scrollTo({top : 0, behavior : "smooth"})
    },[])

    return (
        <ul className="space-y-[20px]">
            {
                (questions as QUESTION.ITEM[])?.map((el, i) => {
                    return (
                        <li className="flex flex-wrap p-[20px] bg-[#FEFEFB] border border-color-sub rounded-[10px]" key={`성격하위유형-테스트문항-${i}`}>
                            <h3 className="[@media(max-width:420px)]:text-[0.9rem] [@media(max-width:420px)]:w-[calc(100%-80px)] w-[calc(100%-100px)] ml-[10px] mb-[20px] text-[1.1rem] break-keep">{el["contents"]}</h3>
                            <QuestionCheckBox idx={i} mbti={mbti} is={el["is"]} />
                        </li>
                    )
                })
            }
        </ul>
    )
}
