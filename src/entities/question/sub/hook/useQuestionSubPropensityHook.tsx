import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_CLIENT_GET_QUESTION_SUB_PROPENSITY } from "../api/api.question.sub.propensity";

export const useQuestionSubPropensityHook = (mbti : MBTI.TYPE) => {
    
    const queryClient =  useQueryClient();

    const queryKey = ["question","subPropensity"];

    const { data } = useQuery({
        queryKey,
        queryFn : () => API_CLIENT_GET_QUESTION_SUB_PROPENSITY(mbti),
        enabled : !!mbti
    });

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

        ClearQuestionSubPropensity();
        return subPropensite
    }

    function ClearQuestionSubPropensity() { queryClient.removeQueries({queryKey : queryKey}) }


    return { 
        questions : data,
        CheckQuestions,
        SubmitSubPropensity,
        ClearQuestionSubPropensity
    }
}
