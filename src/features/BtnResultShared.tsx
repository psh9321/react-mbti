import { Share2 } from "lucide-react";

import { useResultHook } from "@/entities/result/hook/useResultHook";

export const BtnResultShared = () => {

    const { type, subTitle } = useResultHook();

    function OnClickShareKaKaoCallback() {
        if (!type) return;

        const mbti = type.toString();

        window.Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
                title: `MBTI 테스트 결과 : ${mbti}`,
                description: `${subTitle}`,
                imageUrl : `${window.location.origin}/mbti/${mbti.toLowerCase()}.webp?v=${new Date().toISOString()}`,
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            // buttons: [
            //     {
            //         title: "자세히 보기",
            //         link: {
            //             mobileWebUrl: window.location.href,
            //             webUrl: window.location.href,
            //         },
            //     },
            // ],
        });
    }
    return (
        <button  onClick={OnClickShareKaKaoCallback} className="flex justify-center items-center w-[280px] h-[45px] leading-[45px] text-[#fff] bg-color-main rounded-[20px]"><Share2 size={20} className="mr-[5px]"/>결과 공유하기</button>
    )
}
