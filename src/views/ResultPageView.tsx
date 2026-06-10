import { Link } from "react-router-dom";

import { House, RefreshCw } from "lucide-react"

import { TestResultCard } from "@/features/TestResultCard";
import { BtnResultShared } from "@/features/BtnResultShared";
import { ResultPageLoadingView } from "@/features/ResultPageLoadingView";
import { TestResultInfo } from "@/features/TestResultInfo";

import { KakaoInitializer } from "@/script/KakaoInitializer";

export const ResultPageView = () => {

    return (
        <>
            
            <KakaoInitializer/>
            <ResultPageLoadingView/>
            
            <h1 className="sr-only">테스트 결과 페이지</h1>

            <header className="sticky top-0 flex justify-between items-center h-[56px] mb-[10px] bg-[#FDF8E6] z-[2] [@media(max-width:1100px)]:px-[20px]">
                <Link to={"/"}><House size={26} className="stroke-color-main"/></Link>
                <Link to={"/test"} className="inline-flex items-center gap-[5px] p-[5px_10px] text-[1rem] bg-[#FDF9EF] border border-color-sub rounded-[20px]"><RefreshCw size={20} />다시 테스트 하기</Link>
            </header>
        
            <main className="[@media(max-width:1100px)]:px-[20px] [@media(min-width:1100px)]:flex">
                <TestResultCard/>
                <div className="flex-1 [@media(max-width:1100px)]:max-w-[550px] [@media(max-width:1100px)]:mt-[50px] [@media(max-width:1100px)]:mx-auto [@media(min-width:1100px)]:self-start [@media(min-width:1100px)]:sticky [@media(min-width:1100px)]:top-[66px] [@media(min-width:1100px)]:ml-[40px]">
                    <TestResultInfo/>
                    <div className="flex flex-col items-center gap-[10px] w-full mt-[20px] text-center ">
                        <BtnResultShared/>
                        <Link to={"/test"} className="inline-flex justify-center items-center gap-[5px] w-[180px] h-[45px] text-[1rem] bg-[#FDF9EF] border border-color-sub rounded-[20px]"><RefreshCw size={20} />다시 테스트 하기</Link>
                    </div>
                </div>
            </main>
        </>
            
    )
}
