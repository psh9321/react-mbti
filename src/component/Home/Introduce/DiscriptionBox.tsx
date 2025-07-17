import { useEffect, useRef } from "react"

import style from "@/css/home/introduce/discriptionBox.module.css"


export const DiscriptionBox = () => {

    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if(ref["current"]) {
            
            const observe = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        if(!entry.target.classList.contains(style.active)) {
                            entry.target.classList.add(style.active)
                        }
                    }
                    else {
                        if(entry.target.classList.contains(style.active)) {
                            entry.target.classList.remove(style.active)
                        }
                    }
                })
            },
            {
                threshold : 0.5
            });

            observe?.observe(ref["current"]);

            return () => {
                observe.disconnect();
            }
        }
    },[])

    return (
        <ul className={style.discriptionList} ref={ref}>
            <li>
                <dl>
                    <dt>16가지 성격 유형</dt>
                    <dd>
                        MBTI는 4가지 선호 경향을 조합하여 16가지 성격 유형으로 분류합니다. 
                    </dd>
                    <dd>
                        각 유형은 고유한 특징과 강점, 약점을 가지고 있습니다.
                    </dd>
                </dl>
            </li> 
            <li>
                <dl>
                    <dt>MBTI 활용</dt>
                    <dd>
                        MBTI는 개인의 성격 유형을 이해하고, 자신과 타인을 더욱 잘 이해하는 데 도움을 줄 수 있습니다.
                    </dd>
                    <dd>
                        또한, 진로 선택, 대인 관계, 팀워크 등 다양한 분야에서 활용될 수 있습니다.
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>주의사항</dt>
                    <dd>
                        MBTI는 절대적인 기준이 아니며, 개인의 성격을 100% 설명할 수 있는 것은 아닙니다.
                    </dd>
                    <dd>
                        참고 자료로 활용하여 자신과 타인을 이해하는 데 도움을 얻는 것이 좋습니다.
                    </dd>
                </dl>
            </li>
        </ul>
    )
}