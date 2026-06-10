
import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { ChevronLeft } from "lucide-react"

import { Confirm } from "@/shared/ui/Popup";

import { useNavigate } from "react-router-dom";

export const BtnTestClose = () => {

    const [ isConfirm, SetIsConfirm ] = useState(false);

    const queryClient = useQueryClient();

    const navigation = useNavigate();

    function OnClickToggleConfirmCallback() {
        SetIsConfirm(!isConfirm)
    }

    function CloseCallback() {
        queryClient.removeQueries({queryKey : ["question"]})
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