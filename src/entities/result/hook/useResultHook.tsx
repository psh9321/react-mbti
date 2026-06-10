import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router-dom"
import { API_CLIENT_GET_RESULT_MBTI } from "../api/api.result";

export const useResultHook = () => {

    const { type: mbti } = useParams<{ type: string }>();

    const [ query ] = useSearchParams();

    const sub = query.get("sub") as string;

    const { data } = useQuery({
        queryKey : ["result",mbti, sub??""],
        queryFn : () => API_CLIENT_GET_RESULT_MBTI(mbti as MBTI.TYPE, sub),
        enabled : !!mbti,
    });

    return {
        ...data?.mbtiInfo,
        subPropensityInfo : data?.subPropensityInfo
    }
}
