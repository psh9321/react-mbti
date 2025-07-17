import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import style from "@/css/home/introduce/typeRankingTable.module.css"

import { RangkingTable } from "./TypeRankingTable"
import { TestBtn } from "../MainBanner/TestBtn"

export const TypeRankingBox = () => {

    const ref = useRef<HTMLUListElement>(null);
    
    useEffect(() => {
        if(ref["current"]) {
            
            const observe = new IntersectionObserver((entries) => {
                
                entries.forEach(entry => {
                    const tableBox = entry.target.querySelector(`.${style.tableBox}`);
                    const txtBox = entry.target.querySelector(`dl`);

                    if(entry.isIntersecting) {

                        if(tableBox && !tableBox.classList.contains(style.active)) {
                            tableBox.classList.add(style.active);
                        }

                        if(txtBox && !txtBox.classList.contains(style.active)) {
                            txtBox.classList.add(style.active);
                        }
                    }
                    else {

                        if(tableBox && tableBox.classList.contains(style.active)) {
                            tableBox.classList.remove(style.active);
                        }

                        if(txtBox && txtBox.classList.contains(style.active)) {
                            txtBox.classList.remove(style.active);
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
        <article className={style.typeRankingBox} ref={ref}>
            <h2 className="hidden">mbti 조사 결과</h2>
            <dl>
                <dt>
                    <Link to={"https://testmoa.com/"} target="_blank" >테스트모아(TestMoa)</Link> 에서 2023년 7월 기준 104,484명 대상으로 조사한 결과입니다. 
                </dt>
                <dd>
                    <ul className={style.additionInfo}>
                        <li>ISFJ와 ESFJ 유형이 한국에서 가장 많이 보이는 유형으로 알려져 있습니다.</li>
                        <li>
                            내향형(I)이 약간 더 많으며, 감각형(S)이 직관형(N)보다 약간 우세한 경향이 있습니다.
                        </li>
                        <li>
                            이 통계는 표본과 조사 방법에 따라 변동될 수 있습니다.
                        </li>
                    </ul>
                </dd>
                <dd>
                    <TestBtn>mbti 검사</TestBtn>
                </dd>
            </dl>
            <div className={style.tableBox}>
                <RangkingTable/>
            </div>
        </article>
    )    
}