import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { ChevronRight, Clock3 } from "lucide-react"

import { useIndexedDBHook } from "@/entities/result/hook/useIndexedDBHook"

export const LatestTestResult = () => {

    const [ latestItem, SetLatestItem ] = useState<LATEST_ITEM | null>(null);

    const { GetLatestTestResult } = useIndexedDBHook();

    useEffect(() => {
        GetLatestTestResult()
        .then(SetLatestItem)
    },[]);

    if(!latestItem) return <></>

    const mbti = latestItem.mbti.toString();

    const subTypeTitle = (() => {
        const { subPropensityInfo } = latestItem
        if(subPropensityInfo) {
            if(subPropensityInfo.length > 1) return `다층 사고형`;
            if(subPropensityInfo.length === 1) return `${subPropensityInfo?.[0].keyword}`;
            else return `균형 사고형`;
        }
        else {
            return ""
        }
    })();
    
    return (
        <section className="mt-[30px] py-[10px] px-[20px] bg-[#FEFAED] border border-color-sub rounded-[10px]">
            <h2 className="flex items-center gap-[10px] mb-[20px] text-color-sub text-[1.2rem]"><Clock3/> 최근에 테스트한 결과</h2>
            <div>
                <div>
                    <ol>
                        <li className="relative flex gap-[10px]">
                            <img className="size-[100px]" src={`/mbti/${mbti.toLowerCase()}.webp`} alt={`${mbti}와 어울리는 동물 이미지`} />
                            <div>
                                <dl>
                                    <dt className="text-[0.8rem]">{latestItem.subTitle}</dt>
                                    <dd style={{
                                        backgroundColor : `${latestItem.color}`
                                    }} className="inline-block my-[2px_5px] p-[2.5px_10px] text-[#fff] text-[1.2rem] rounded-[12px]">
                                        {subTypeTitle} {mbti}
                                    </dd>
                                </dl>
                                <ul className="mt-[10px] p-[15px] text-[#7a6551] text-[0.8rem] bg-[#FCF3E1] break-keep space-y-[10px] rounded-[10px] [&>li]:relative [&>li]:pl-[9px] [&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:top-[7px] [&>li]:before:left-0 [&>li]:before:block [&>li]:before:size-[4px] [&>li]:before:bg-[#F7CF98] [&>li]:before:rounded-[100%]">
                                    {
                                        latestItem.summaryItems.map(el => {
                                            return (
                                                <li key={`${mbti}-요약글-${el}`}>{el}</li>
                                            )
                                        })
                                    }
                                </ul>
                                <p className="mt-[15px] text-[#84837C] text-right text-[0.65rem]">테스트 일자 : {latestItem.testDate}</p>
                            </div>
                            <Link className="absolute top-0 right-0 flex items-center text-[#84837C] text-[0.7rem] border-b" to={`/result/${mbti.toLowerCase()}${latestItem.subPropensityKey? `?sub=${latestItem.subPropensityKey}` : ""}`}>상세보기 <ChevronRight size={14}/></Link>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    )
}