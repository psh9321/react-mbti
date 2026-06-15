
import { useEffect } from "react";

import { Lightbulb } from "lucide-react"

import { CurrentTestBanner } from "@/features/CurrentTestBanner";
import { TestQuestionBox } from "@/widgets/TestQuestionBox";
import { TestPageHeader } from "@/widgets/TestPageHeader";

export const TestPageView = () => {

    useEffect(() => {
        if(window.scrollY > 0) {
            window.scrollTo({
                top : 0,
                behavior : "smooth"
            })
        }
    },[])

    return (
        <div className="px-[40px]`">
            <h1 className="sr-only">성격 유형 테스트 페이지</h1>
            <TestPageHeader/>
            <main className=" [@media(max-width:1100px)]:max-w-[550px] [@media(max-width:1100px)]:mx-auto [@media(min-width:1100px)]:flex">
                <div className="[@media(min-width:1100px)]:self-start [@media(min-width:1100px)]:sticky [@media(min-width:1100px)]:top-[70px] [@media(min-width:1100px)]:w-[550px]">
                    <CurrentTestBanner/>
                    <p className="[@media(max-width:400px)]:text-[0.9rem] [@media(max-width:1100px)]:mb-[50px] flex justify-center items-center my-[20px] text-color-sub">
                        <Lightbulb/> 정답은 없어요! 가장 나다운 선택을 해주세요.
                    </p>
                </div>
                
                <TestQuestionBox/>
            </main>
        </div>
    )
}