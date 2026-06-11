import { useEffect, useRef, useState } from "react"
import { useShallow } from "zustand/shallow";

import { useLocation, useNavigate } from "react-router-dom";

import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore";

import { FadeAnimation } from "@/shared/util/fadeAnimation";
import { useQueryClient } from "@tanstack/react-query";

type ResultPageLocationState = {
    isLoadingView?: boolean;
    [key: string]: unknown;
}

export const ResultPageLoadingView = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const [ isVisible, SetIsVisible ] = useState<boolean>((location.state as ResultPageLocationState | null)?.isLoadingView ?? false);

    const { SetMbti, SetCurrentIdx } = useQuestionMbtiStore(useShallow(state => ({
        SetMbti : state.SetMbti,
        SetCurrentIdx : state.SetCurrentIdx
    })))

    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {

        if (!isVisible) return;

        if (!ref.current) return;

        SetMbti("");
        SetCurrentIdx(0);
        
        queryClient.removeQueries({queryKey : ["question"]});

        window.scrollTo({top : 0});

        const p = ref["current"];

        const words = p.textContent?.split(" ");

        p.innerHTML = words?.map(word => `<span style="opacity : 0">${word}</span>`).join(" ") as string;

        const spanArr = p.querySelectorAll("span");

        spanArr.forEach((el, i) => {
            const timer =  setTimeout(() => {
                FadeAnimation("in",el, 250, true, () => {
                    if(i === spanArr.length-1) {

                        const timer2 = setTimeout(() => {
                            SetIsVisible(false);

                            const nextState = {
                                ...((location.state as ResultPageLocationState | null) ?? {}),
                            };

                            delete nextState.isLoadingView;

                            navigate({
                                pathname: location.pathname,
                                search: location.search,
                                hash: location.hash,
                            }, {
                                replace: true,
                                state: Object.keys(nextState).length ? nextState : null,
                            });

                            clearTimeout(timer2);
                        }, 1000);
                    }
                });

                clearTimeout(timer);
            }, i * 400);
        })
    },[])

    return (
        <div
            style={{
                position: "fixed",
                top : "0",
                left : "0",
                display : isVisible ? "block" : "none",
                width:"100%",
                height : "100dvh",
                zIndex:"99",
                backgroundColor:"#F6D064",
            }}
        >
            <p
                ref={ref}
                style={{
                    position: "fixed",
                    top : "50%",
                    left : "50%",
                    transform : "translate(-50%, -50%)",
                    color : "#fff",
                    fontSize : "3rem",
                }}
                className="font-[main]"
            >나의 성격 유형은?
            </p>
        </div>
    )
}
