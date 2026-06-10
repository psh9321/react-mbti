import { useEffect } from "react"
import { useShallow } from "zustand/shallow"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore"
import { useQuestionMbtiHook } from "@/entities/question/mbti/hook/useQuestionMbtiHook"

export const MbtiTestChapterNavi = () => {

    const { questions, SubmitMbtiTest } = useQuestionMbtiHook();
     
    const { currentIdx, SetCurrentIdx } = useQuestionMbtiStore(useShallow(state => ({
        currentIdx : state.currentIdx,
        SetCurrentIdx : state.SetCurrentIdx
    })));

    function MbtiTestCompleteCallback() {
        SubmitMbtiTest()
    }

    function NextChapterCallback() {
        if(!questions) return

        const unCheckElement = document.querySelector(`[data-question-mbti-check=false]`);

        if(unCheckElement) return unCheckElement.scrollIntoView({block : "center", behavior : "smooth"});

        if(currentIdx === 3) {
            MbtiTestCompleteCallback();
        }
        else {
            SetCurrentIdx(currentIdx+1 as 0 | 1 | 2 | 3);    
        }
    }

    function PrevChapterCallback() {
        if(currentIdx === 0) return

        const prevChapter = currentIdx-1 < 0 ? 0 : currentIdx-1;

        SetCurrentIdx(prevChapter as 0 | 1 | 2 | 3);
    }

    useEffect(() => {
        const unCheckElement = document.querySelector(`[data-question-mbti-check=false]`);

        if(unCheckElement) { unCheckElement.scrollIntoView({block : "end", behavior : "smooth"}) } 
    },[currentIdx]);

    return (
        <div className="relative flex justify-between w-full h-[50px] mt-[40px] [&>button]:absolute [&>button]:flex [&>button]:justify-center [&>button]:items-center [&>button]:h-full [&>button]:px-[30px] [&>button]:text-[1.2rem] [&>button]:border [&>button]:rounded-[10px] [@media(max-width:499px)]:[&>button]:px-[15px] [@media(max-width:499px)]:[&>button]:text-[1rem] [@media(max-width:499px)]:[&>button>svg]:size-[22px]">
            { currentIdx > 0 && <button onClick={PrevChapterCallback} className="left-0 bg-[#FEFEFB] border-color-sub" ><ChevronLeft/>이전</button>}
            <button onClick={NextChapterCallback} className="right-0 text-[#fff] bg-color-main border-color-main">다음<ChevronRight/></button>
        </div>
    )
}