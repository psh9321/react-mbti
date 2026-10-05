import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useIndexedDBHook } from "@/entities/result/hook/useIndexedDBHook";
import { useResultHook } from "@/entities/result/hook/useResultHook"

export const TestResultSetLatest = () => {

    const { type, subPropensityInfo, color, subTitle, summary } = useResultHook();

    const { SetLatestTestResult } = useIndexedDBHook();

    const [ query ] = useSearchParams();

    const location = useLocation();
    const subPropensityKey = query.get("sub") ?? "";

    useEffect(() => {
        if(!type || !subTitle || !color || !summary?.items) return;

        const nextState = {
            ...((location.state as RESULT_PAGE_LOCATION_STATE | null) ?? {}),
        };
        if(nextState.isLoadingView) {
            const mbti = type.toString();

            SetLatestTestResult({
                mbti,
                subTitle : subTitle as string,
                color : color as MBTI.ITEM["color"],
                summaryItems : summary?.items as string[],
                subPropensityKey,
                subPropensityInfo : subPropensityInfo ?? []
            }).catch(error => {
                console.error("최근 테스트 결과 저장에 실패했습니다", error);
            });
        }

    },[location, type, subTitle, color, summary?.items, subPropensityKey, subPropensityInfo, SetLatestTestResult])

    return (
        <></>
    )
}
