import { CopyCheck } from "lucide-react"

import { useQuestionSubPropensityHook } from "@/entities/question/sub/hook/useQuestionSubPropensityHook"
import { createSearchParams, generatePath, useNavigate } from "react-router-dom"

interface BTN_SUB_PROPENSITE_SUBMIT {
    mbti : MBTI.TYPE
}

export const BtnTestSubmit = ({ mbti } : BTN_SUB_PROPENSITE_SUBMIT) => {

    const navigation = useNavigate();

    const { SubmitSubPropensity } = useQuestionSubPropensityHook(mbti);

    function SubmitCallback() {
        const unCheckElements = document.querySelectorAll(`[data-question-sub-propensity-check=false]`);

        if(unCheckElements.length > 0) {
            unCheckElements.forEach(el => el.parentElement?.classList.add("unchecked"))
            return unCheckElements[0].scrollIntoView({block : "center", behavior : "smooth"});
        }
        
        const subPropensite = SubmitSubPropensity();
        const search = subPropensite
            ? `?${createSearchParams({ sub: subPropensite })}`
            : "";

        navigation({
            pathname: generatePath("/result/:type", { type: String(mbti) }),
            search,
        }, {
            state: { isLoadingView: true },
        })
    }

    return (
        <div className="relative w-full h-[50px] mt-[40px] text-right">
            <button onClick={SubmitCallback} className="inline-block h-full px-[30px] text-[1.2rem] border rounded-[10px] text-[#fff] bg-color-main border-color-main [@media(max-width:499px)]:text-[1rem] ">결과 보기<CopyCheck className="inline-block ml-[5px] [@media(max-width:499px)]:size-[22px]"/></button>
        </div>
    )
}
