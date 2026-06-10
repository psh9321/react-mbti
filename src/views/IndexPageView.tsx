
import { Link } from "react-router-dom"

import useMediaQuery from "@parksuhyun9321/use-media-query"

import { ChevronDown, ChevronRight, ClipboardList, PawPrint, Search } from "lucide-react"

import { Logo } from "@/shared/ui/Logo"

const IndexPageView = () => {

    const { isResize } = useMediaQuery(550);
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

                    <article className="[@media(min-width:550px)]:flex [@media(min-width:550px)]:items-center text-center [&>svg]:shrink-0 [&>svg]:stroke-color-sub [&>div>svg]:inline-block [&>div>svg]:size-[35px] [&>div>dl>dt]:my-[5px_10px] [&>div>dl>dt]:text-color-main [&>div>dl>dd]:leading-[1.3] [&>div>dl>dd]:text-[0.8rem] [&>div>dl>dd]:break-keep 
                    [@media(max-width:550px)]:[&>svg]:my-[15px]
                    [&>svg]:inline-block">
                        <div>
                            <ClipboardList/>
                            <dl>
                                <dt>질문에 답하기</dt>
                                <dd>질문에 예/아니오 로 직관적으로 답해주세요.</dd>
                            </dl>
                        </div>
                        { isResize ? <ChevronDown size={27} /> : <ChevronRight size={27}/>}
                        <div>
                            <Search/>
                            <dl>
                                <dt>성격 유형 분석</dt>
                                <dd>당신의 성향을 분석하여 동물유형을 찾아요.</dd>
                            </dl>
                        </div>
                        { isResize ? <ChevronDown size={27} /> : <ChevronRight size={27}/> }
                        <div>
                            <PawPrint/>
                            <dl>
                                <dt>결과 확인</dt>
                                <dd>나와 닮은 동물과 성격을 확인해요.</dd>
                            </dl>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    )
}

export default IndexPageView