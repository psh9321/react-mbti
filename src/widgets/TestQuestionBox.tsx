import { lazy, Suspense } from "react";

import { MbtiTestQuestionList } from "@/features/MbtiTestQuestionList";
import { MbtiTestChapterNavi } from "@/features/MbtiTestChapterNavi";

import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore";
import { PeanutLoader } from "@/shared/ui/PeanutLoader";

const SubPropensityTestQuestionList = lazy(() => import("@/features/SubPropensityTestQuestionList").then(rs => ({ default : rs.SubPropensityTestQuestionList })));

const BtnTestSubmit = lazy(() => import("@/features/BtnTestSubmit").then(rs => ({
    default : rs.BtnTestSubmit
})));


export const TestQuestionBox = () => {

    const mbti = useQuestionMbtiStore(state => state.mbti);
    
    return (
        <section className="px-[25px]">
            <h2 className="sr-only">{mbti ? "하위유형 테스트" : "MBTI 테스트"} 박스</h2>
            {
                mbti ? 
                <Suspense fallback={<PeanutLoader/>}>
                    <SubPropensityTestQuestionList mbti={mbti}/>
                    <BtnTestSubmit mbti={mbti} />
                </Suspense>
                
                :
                <>
                    <MbtiTestQuestionList/>
                    <MbtiTestChapterNavi/>            
                </>
            }
        </section>
    )
}