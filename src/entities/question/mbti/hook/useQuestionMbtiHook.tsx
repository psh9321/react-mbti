import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

import { useQuestionMbtiStore } from "../store/useQuestionMbtiStore";

import { API_CLIENT_GET_QUESTION_MBTI } from "../api/api.question.mbti";

export const useQuestionMbtiHook = () => {

    const queryClient = useQueryClient();

    const queryKey = ["question","mbti"];

    const { data, isLoading } = useQuery({
        queryKey,
        queryFn : API_CLIENT_GET_QUESTION_MBTI,
    });

    const { currentIdx, SetMbti } = useQuestionMbtiStore(useShallow(state => ({
        currentIdx : state.currentIdx,
        SetMbti : state.SetMbti,
    })));

    function CheckQuestions(idx : number,is : boolean) {
        queryClient.setQueryData<QUESTION.ITEM[][]>(queryKey, prev => {
            if (!prev) return prev;

            return prev.map((group, groupIdx) =>
                groupIdx === currentIdx
                    ? group.map((question, questionIdx) =>
                        questionIdx === idx ? { ...question, is } : question
                    )
                    : group
            );
        });
    }

    function SubmitMbtiTest() {
        const validata = data?.flat().reduce<TEST_VALIDATA>((acc, cur) => {
            if(typeof cur["is"] === "boolean") {
                acc[cur["type"]][String(cur["is"]) as "true" | "false"]++;
            }

            return acc
        }, {
            energy: { true: 0, false: 0 },
            recognition: { true: 0, false: 0 },
            judgment: { true: 0, false: 0 },
            life: { true: 0, false: 0 },
        });

        const result = Object.entries(validata as TEST_VALIDATA).reduce((acc, [type, val]) => {
            switch (type) {
                case "energy": acc += val["true"] > val["false"] ? "e" : "i"; break;
                case "recognition": acc += val["true"] > val["false"] ? "s" : "n"; break;
                case "judgment": acc += val["true"] > val["false"] ? "t" : "f"; break;
                case "life": acc += val["true"] > val["false"] ? "j" : "p"; break;
                default: console.log("type error", type); break;
            }
            return acc;
        }, "") as MBTI.TYPE;

        SetMbti(result);
    }

    return {
        questions : data?.[currentIdx],
        currentIdx,
        CheckQuestions,
        SubmitMbtiTest,
        isLoading
    }
}