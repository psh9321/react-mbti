import style from "@/css/home/mainBanner/mainBanner.module.css"

import { AnimWrapper } from "./AnimWrapper"
import { TestBtn } from "./TestBtn"



export const MainBanner = () => {
    
    return (
        <article>
            <h2 className="hidden">main banner</h2>
            <AnimWrapper type="scale down" className={style.chapter01} >
                <div className={style.contentsBox}>
                    <dl>
                        <dt>MBTI</dt>
                        <dd>심리 이론에 기반한 성격 분석.</dd>
                        <dd>더 깊이 있는 나를 알아가는 시간.</dd>
                        <dd>전문적인 MBTI 검사, 무료 제공.</dd>
                        <dd><TestBtn>mbti 검사</TestBtn></dd>
                    </dl>
                    <img src="/banner/mbti_animal.jpg" alt="MBTI 심리 이론에 기반한 성격 분석. 더 깊이 있는 나를 알아가는 시간. 전문적인 MBTI 검사, 무료 제공."/>
                </div>
            </AnimWrapper>
            <AnimWrapper type="scale up" className={style.chapter02}>
                <div className={style.contentsBox}>
                    <dl>
                        <dt>MBTI (Myers-Briggs Type Indicator)</dt>
                        <dd>MBTI는 자기 이해, 대인 관계 개선, 팀워크 향상, 진로 탐색 등 다양한 분야에서 활용될 수 있습니다.</dd>
                    </dl>
                    <img src="/banner/mbti_indicator.jpg" alt="MBTI (Myers-Briggs Type Indicator) MBTI는 자기 이해, 대인 관계 개선, 팀워크 향상, 진로 탐색 등 다양한 분야에서 활용될 수 있습니다." />
                </div>
            </AnimWrapper>
        </article>
    )
}