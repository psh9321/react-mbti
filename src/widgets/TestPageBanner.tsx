import { lazy, Suspense } from "react";

import { Lightbulb } from "lucide-react"

import useMediaQuery from "@parksuhyun9321/use-media-query"

import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore";

import { CurrentTestBanner } from "@/features/CurrentTestBanner";
import { PeanutLoader } from "@/shared/ui/PeanutLoader";

const MbtiTestProgressBar = lazy(() => import("@/features/Progress/MbtiTestProgress").then(rs => ({default : rs.MbtiTestProgressBar})));

const SubPropensityTestProgressBar = lazy(() => import("@/features/Progress/SubPropensityTestProgress").then(rs => ({ default : rs.SubPropensityTestProgressBar })));

export const TestPageBanner = () => {

    const { isResize } = useMediaQuery(1100);

    const mbti = useQuestionMbtiStore(state => state.mbti);

    return (
        <section className="[@media(min-width:1100px)]:self-start [@media(min-width:1100px)]:sticky [@media(min-width:1100px)]:top-[70px] [@media(min-width:1100px)]:w-[550px]">
            <h2 className="sr-only">배너</h2>
            <CurrentTestBanner/>
            <p className="[@media(max-width:400px)]:text-[0.9rem] [@media(max-width:1100px)]:mb-[50px] flex justify-center items-center my-[20px] text-color-sub">
                <Lightbulb/> 정답은 없어요! 가장 나다운 선택을 해주세요.
            </p>
            {
                !isResize &&
                <article>
                    <h2 className="sr-only">프로그래스 바</h2>
                    <Suspense fallback={<PeanutLoader/>}>
                        {
                            mbti ? <SubPropensityTestProgressBar mbti={mbti}/> : <MbtiTestProgressBar/>
                        }
                    </Suspense>
                </article>
            }
        </section>
    )
}