
import { useState } from "react";

import { ChevronLeft } from "lucide-react"

import { Confirm } from "@/shared/ui/Popup";
import { useQuestionMbtiHook } from "@/entities/question/mbti/hook/useQuestionMbtiHook";
import { useQuestionSubPropensityHook } from "@/entities/question/sub/hook/useQuestionSubPropensityHook";
import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore";
import { useNavigate } from "react-router-dom";

export const BtnTestClose = () => {

    const [ isConfirm, SetIsConfirm ] = useState(false);

    const navigation = useNavigate();

    function OnClickToggleConfirmCallback() {
        SetIsConfirm(!isConfirm)
    }

    const mbti = useQuestionMbtiStore(state => state.mbti);

    const { ClearQuestionMbti } = useQuestionMbtiHook();
    const { ClearQuestionSubPropensity } = useQuestionSubPropensityHook(mbti);

    function CloseCallback() {
        if(mbti) ClearQuestionSubPropensity();
        ClearQuestionMbti();
        navigation("/")
    }

    return (
        <>  
            <button onClick={OnClickToggleConfirmCallback}>
                <ChevronLeft size={30}/>
            </button>
            {
                isConfirm && <Confirm title="테스트 종료하기" msg="진행 된 테스트 결과는 저장 되지 않습니다. 홈으로 가시겠습니까?" submitTxt="종료하기" cancelCallback={OnClickToggleConfirmCallback} submitCallback={CloseCallback}/>
            }
        </>
    )
}