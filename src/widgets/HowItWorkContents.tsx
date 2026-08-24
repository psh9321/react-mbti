import useMediaQuery from "@parksuhyun9321/use-media-query";

import { ChevronDown, ChevronRight, ClipboardList, PawPrint, Search } from "lucide-react"

export const HowItWorkContents = () => {

    const { isResize } = useMediaQuery(550);

    return (
        <article className="[@media(min-width:550px)]:flex [@media(min-width:550px)]:items-center text-center [&>svg]:shrink-0 [&>svg]:stroke-color-sub [&>div>svg]:inline-block [&>div>svg]:size-[35px] [&>div>dl>dt]:my-[5px_10px] [&>div>dl>dt]:text-color-main [&>div>dl>dd]:leading-[1.3] [&>div>dl>dd]:text-[0.8rem] [&>div>dl>dd]:break-keep 
        [@media(max-width:550px)]:[&>svg]:my-[15px]
        [&>svg]:inline-block">
            <div>
                <ClipboardList/>
                <dl>
                    <dt>질문에 답하기</dt>
                    <dd>질문에 예/아니오 로 직관적으로 답해주세요.</dd>
                </dl>
            </div>
            { isResize ? <ChevronDown size={27} /> : <ChevronRight size={27}/>}
            <div>
                <Search/>
                <dl>
                    <dt>성격 유형 분석</dt>
                    <dd>당신의 성향을 분석하여 동물유형을 찾아요.</dd>
                </dl>
            </div>
            { isResize ? <ChevronDown size={27} /> : <ChevronRight size={27}/> }
            <div>
                <PawPrint/>
                <dl>
                    <dt>결과 확인</dt>
                    <dd>나와 닮은 동물과 성격을 확인해요.</dd>
                </dl>
            </div>
        </article>
    )
}