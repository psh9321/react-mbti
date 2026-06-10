import { MbtiTestQuestionList } from "@/features/MbtiTestQuestionList";
import { MbtiTestChapterNavi } from "@/features/MbtiTestChapterNavi";

import { SubPropensityTestQuestionList } from "@/features/SubPropensityTestQuestionList";

import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore";
import { BtnTestSubmit } from "@/features/BtnTestSubmit";

export const TestQuestionBox = () => {

    const mbti = useQuestionMbtiStore(state => state.mbti);
    
    return (
        <section className="px-[25px]">
            <h2 className="sr-only">{mbti ? "하위유형 테스트" : "MBTI 테스트"} 박스</h2>
            {
                mbti ? 
                <>
                    <SubPropensityTestQuestionList mbti={mbti}/>
                    <BtnTestSubmit mbti={mbti} />
                </>
                
                :
                <>
                    <MbtiTestQuestionList/>
                    <MbtiTestChapterNavi/>            
                </>
            }
        </section>
    )
}