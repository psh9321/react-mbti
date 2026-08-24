
import { Link } from "react-router-dom"

import { ChevronRight, PawPrint } from "lucide-react"

import { Logo } from "@/shared/ui/Logo"

import { HowItWorkContents } from "@/widgets/HowItWorkContents"

const IndexPageView = () => {
    
    return (
        <div className="max-w-[550px] mx-auto px-[30px] font-bold">
            <h1 className="sr-only">메인 페이지</h1>
            <header className="flex justify-between items-center">
                <Logo/>
                <p className="inline-block p-[5px_10px] text-color-main border border-color-main rounded-[10px] opacity-[0.7]" >16가지 동물 유형</p>
            </header>
            <main className="mt-[50px]">
                <section className="flex flex-col justift-center items-center mt-[10px]">
                    <h2 className="sr-only">메인 배너</h2>

                    <dl className="text-center">
                        <dt className="[@media(max-width:450px)]:text-[1.8rem] text-[2.4rem] font-['main']">나와 닮은 <span className="text-color-main">동물</span>은?</dt>
                        <dd className="[@media(max-width:450px)]:text-[0.9rem] leading-[1.3]">
                            MBTI로 알아보는 <br/> 나의 동물 성격 유형
                        </dd>
                    </dl>
                    <img src="/animal.webp" alt="" className="w-full" />  
                    <Link to="/test" className="flex items-center p-[10px_40px] text-[#fff] text-[1.2rem] bg-color-main rounded-[20px]">테스트 시작하기 <ChevronRight size={27}/></Link>  
                </section>
                <section className="mt-[30px] py-[10px] px-[20px] bg-[#FEFAED] border border-color-sub rounded-[10px]">
                    <h2 className="sr-only">테스트 안내</h2>
                    <p className="flex justify-center items-center gap-[10px] mb-[20px] text-color-sub text-[1.2rem]"><PawPrint className="fill-color-sub"/>HOW IT WORKS</p>

                    <HowItWorkContents/>
                </section>
            </main>
        </div>
    )
}

export default IndexPageView