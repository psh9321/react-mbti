import style from "@/css/home/home.module.css"

import { MainBanner } from "@/component/Home/MainBanner/Index"
import { Introduce } from "@/component/Home/Introduce/Index"

import { TypeRankingBox } from "@/component/Home/TypeRankingBox/Index"
import { CopyRight } from "@/component/shared/CopyRight"

export const HomeView = () => {
    
    return (
        <section>
            <h2 className="hidden">인덱스</h2>          
            <div className={style.inner}>
                
                <MainBanner/>
                <Introduce/>
                <TypeRankingBox/>
            </div>
            <CopyRight/>
        </section>
    )
}