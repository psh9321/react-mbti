import { PawPrint } from "lucide-react"

import { twMerge  } from "tailwind-merge"

export const Logo = ({ className } : CLASS_APPEND_COMPONENT) => {
    return (
        <h3 className={twMerge("leading-[1.2]", className??"")}>
            <span className="flex items-center gap-[4px] text-[1.6rem] font-['main'] font">MBTI <PawPrint className="fill-color-sub stroke-color-sub"/></span>
            <span className="block text-color-sub">ANIMAL TEST</span>
        </h3>
    )
}