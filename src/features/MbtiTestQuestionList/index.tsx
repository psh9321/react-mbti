import { useQuestionMbtiHook } from "@/entities/question/mbti/hook/useQuestionMbtiHook";
import { QuestionCheckBox } from "./ui/QuestionCheckBox";
import { PeanutLoader } from "@/shared/ui/PeanutLoader";

const imgs = [
    [ "enfj", "esfj", "enfp", "estp", "entj", "esfp", "entp" ], /** energy */
    [ "istj", "estj", "isfj", "esfj", "istp", "estp", "isfp" ], /** recognition */
    [ "intj", "entj", "intp", "entp", "istp", "estj", "estp" ], /** judgment */
    [ "intj", "entj", "intp", "entp", "istp", "estj", "estp" ] /** life */
]

export const MbtiTestQuestionList = () => {

    const { questions, currentIdx, isLoading } = useQuestionMbtiHook();

    if(isLoading) return <PeanutLoader/>

    return (
        <ul className="space-y-[20px]">
            {
                (questions as QUESTION.ITEM[])?.map((el, i) => {
                    return (
                        <li className="flex flex-wrap p-[20px] bg-[#FEFEFB] border border-color-sub rounded-[10px]" key={`${String(el["type"])}-테스트문항-${i}`}>
                            <img className="[@media(max-width:420px)]:w-[70px] w-[90px]" src={`/mbti/${imgs[currentIdx][i]}.webp`} alt="" />
                            <h3 className="[@media(max-width:420px)]:text-[0.9rem] [@media(max-width:420px)]:w-[calc(100%-80px)] w-[calc(100%-100px)] ml-[10px] mb-[20px] text-[1.1rem] break-keep">{el["contents"]}</h3>
                            <QuestionCheckBox idx={i} is={el["is"]} />
                        </li>
                    )
                })
            }
        </ul>
    )
}