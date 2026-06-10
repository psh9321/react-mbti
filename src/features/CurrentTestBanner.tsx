import { useShallow } from "zustand/shallow";
import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore";

export const CurrentTestBanner = () => {

    const { mbti, currentIdx } = useQuestionMbtiStore(useShallow(state => ({
        mbti : state.mbti,
        currentIdx : state.currentIdx,
    })));
    
    return (
        <div className="w-[550px] py-[15px_30px] text-center bg-[#FEFEFB] bg-[url('/treeBg.png')] bg-center bg-no-repeat bg-contain border border-color-sub rounded-[10px] [@media(max-width:580px)]:w-[calc(100%-40px)] [@media(max-width:580px)]:mx-auto">
            <span className="text-color-main text-[2.2rem]">Q.</span>
            <p className="[@media(min-width:450px)]:text-[1.3rem]">
                {
                    mbti ?
                    (mbti as string)[0] === "e" ? "에너지를 발산하는 나만의 방식은?" : "내 마음속 세상은 어떤 모습일까?"
                    :
                    <>
                        { currentIdx === 0 && "세상과 소통하는 나만의 방식은?" }
                        { currentIdx === 1 && "상상과 경험 중 무엇이 더 편할까?" }
                        { currentIdx === 2 && "무엇을 더 중요하게 생각할까?" }
                        { currentIdx === 3 && "하루를 보내는 나만의 방식은?" }                    
                    </>
                }
            </p>
        </div>
    )
}