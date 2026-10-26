import { lazy, Suspense } from "react";

import useMediaQuery from "@parksuhyun9321/use-media-query";

import { Logo } from "@/shared/ui/Logo";

import { BtnTestClose } from "@/features/BtnTestClose";
import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore";

const HeaderProgressBox = lazy(() => import("@/features/Progress/MbtiTestProgress").then(rs => ({default : rs.MbtiTestProgressBox})));
const SubPropensityTestProgressBox = lazy(() => import("@/features/Progress/SubPropensityTestProgress").then(rs => ({ default : rs.SubPropensityTestProgressBox })));

export const TestPageHeader = () => {

    const { isResize } = useMediaQuery(1100,true);  

    const mbti = useQuestionMbtiStore(state => state.mbti);
    
    return (
        <header className="sticky top-[0] flex justify-between items-center w-full h-[70px] mt-[-20px] bg-[#FDF8E6] z-[2] [@media(max-width:1100px)]:px-[20px]">
            <Logo className="order-2"/>
            <BtnTestClose/>
            {
                isResize && 
                <Suspense fallback={null}>
                    {
                        mbti ? <SubPropensityTestProgressBox mbti={mbti} /> : <HeaderProgressBox/>
                    }
                </Suspense>
            }
        </header>
    )
}