import { Link } from "react-router-dom"

import style from "@/css/home/testBtn.module.css"

import { LAYOUT_CHILD } from "@/types"


export const TestBtn = ({children} : LAYOUT_CHILD) => {
    return (
        <Link className={style.btnNaviTest} to={"/test"}>{children}</Link>       
    )
}