import style from "@/css/home/introduce/introduce.module.css"

import { DiscriptionBox } from "./DiscriptionBox"

export const Introduce = () => {
    
    return (
        <article className={style.introduce}>
            <h2 className="hidden">mbti introduce</h2>
            {/* <PreferBox/> */}
            <DiscriptionBox/>
        </article>
    )
}