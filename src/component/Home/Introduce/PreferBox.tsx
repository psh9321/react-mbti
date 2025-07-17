import { useEffect, useRef } from "react";
import { MoveLeft, MoveRight } from "lucide-react"

import style from "@/css/home/introduce/preferBox.module.css"

export const PreferBox = () => {
    
    const indicatorRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if(indicatorRef["current"]) {
            
            const observe = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.querySelectorAll(`.${style.left}`).forEach((el, i) => {
                            if(!el.classList.contains(style.active)) {
                                
                                const timer = setTimeout(() => {
                                    el.classList.add(style.active);    
                                    clearTimeout(timer);
                                }, i * 100);
                            }
                        })
                        entry.target.querySelectorAll(`.${style.right}`).forEach((el, i) => {
                            if(!el.classList.contains(style.active)) {

                                const timer = setTimeout(() => {
                                    el.classList.add(style.active);    
                                    clearTimeout(timer);
                                }, i * 100);
                            }
                        })
                    }
                })
            },
            {
                threshold : 0.5
            });

            observe?.observe(indicatorRef["current"]);

            return () => {
                observe.disconnect();
            }
        }
    },[]);

    return (
        <>
            <div className={style.preferBox} >
                <h3>선호 경향</h3>
                <ul className={style.indicatorList} ref={indicatorRef}>
                    <li>
                        <h3><MoveLeft/><span>에너지 방향</span><MoveRight/></h3>
                        <p className={style.left}>
                            외향 E
                        </p>
                        <p className={style.right}>내향 I</p>
                    </li>
                    <li>
                        <h3><MoveLeft/><span>인식 기능</span><MoveRight/></h3>
                        <p className={style.left}>감각 S</p>
                        <p className={style.right}>직관 N</p>
                    </li>
                    <li>
                        <h3><MoveLeft/><span>판단 기능</span><MoveRight/></h3>
                        <p className={style.left}>사고 T</p>
                        <p className={style.right}>감정 F</p>
                    </li>
                    <li>
                        <h3><MoveLeft/><span>생활 양식</span><MoveRight/></h3>
                        <p className={style.left}>판단 J</p>
                        <p className={style.right}>인식 P</p>
                    </li>
                </ul>
            </div>
        </>
    )
}