"use client"

import { twMerge } from "tailwind-merge"

interface PEANUT_LOADER {
    className?: string
}

export const PeanutLoader = ({ className }: PEANUT_LOADER) => {
    return (
        <div className={twMerge("flex flex-col items-center justify-center gap-[16px]", className ?? "")}>
            <div className="relative w-[25px] h-[25px]">
                {/* 왼쪽 원 */}
                <span className="absolute left-0 top-0 w-[25px] h-[25px] rounded-full border-[3px] border-color-main border-t-transparent animate-[peanut-spin_1s_linear_infinite]" />
            </div>
            <style>{`
                @keyframes peanut-spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}