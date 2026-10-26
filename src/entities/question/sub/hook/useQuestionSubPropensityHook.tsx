import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_CLIENT_GET_QUESTION_SUB_PROPENSITY } from "../api/api.question.sub.propensity";

export const useQuestionSubPropensityHook = (mbti : MBTI.TYPE) => {
    
    const queryClient =  useQueryClient();

    const queryKey = ["question","subPropensity"];

    const { data, isLoading } = useQuery({
        queryKey,
        queryFn : () => API_CLIENT_GET_QUESTION_SUB_PROPENSITY(mbti),
        enabled : !!mbti
    });

    const totalQuestions = data?.length??0;

    const checkedQuestions = data?.filter(question => typeof question.is === "boolean").length??0;

    const progressPercent = totalQuestions > 0 ? Math.round((checkedQuestions / totalQuestions) * 100) : 0;

    function CheckQuestions(idx : number,is : boolean) {
        queryClient.setQueryData<QUESTION.ITEM[]>(queryKey, prev => {
            if(!prev) return prev;

            return prev.map((question, questionIdx) =>
                questionIdx === idx ? { ...question, is } : question
            );
        });
    }

    function SubmitSubPropensity() {
        const obj = {} as { [key: string]: number };

        for(const item of data as QUESTION.ITEM[]) {
            const key = String(item["type"]);

            if(isNaN(obj[key])) obj[key] = 0;
            if(!item["is"]) continue;
            obj[key]++;
        }

        const subPropensite = Object.entries(obj).reduce<string[]>((acc, [key, length]) => {
            if(length >= 4) acc.push(key);
            return acc;
        }, []).join("-");

        return subPropensite
    }

    return { 
        checkedQuestions,
        totalQuestions,
        progressPercent,
        questions : data,
        isLoading,
        CheckQuestions,
        SubmitSubPropensity,
    }
}
