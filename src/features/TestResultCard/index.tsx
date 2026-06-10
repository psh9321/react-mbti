import { useResultHook } from "@/entities/result/hook/useResultHook";
import { SubPropensityItem } from "./ui/SubPropensityItem";

export const TestResultCard = () => {
    const { type, color, animal, subTitle, summary, subPropensityInfo } = useResultHook();

    const subTypeTitle = (() => {
        if(subPropensityInfo) {
            if(subPropensityInfo.length > 1) return `다층 사고형 ${type?.toString()}`;
            if(subPropensityInfo.length === 1) return `${subPropensityInfo?.[0].keyword} ${type?.toString()}`;
            else return `균형 사고형 ${type?.toString()}`;
        }
        else {
            return ""
        }
    })();

    return (
        <section className="relative flex flex-col justify-center items-center block w-[calc(100%-30px)] max-w-[470px] min-h-[520px] py-[25px] px-[20px] text-center border border-[#F4D39E] bg-[url('/resultBg.png')] bg-center bg-no-repeat bg-cover rounded-[10px] shadow-[30px_18px_40px_rgba(0,0,0,0.12)]
        [&::after]:content-[''] [&::after]:absolute [&::after]:top-1/2 [&::after]:left-1/2  [&::after]:-translate-1/2  [&::after]:block [&::after]:w-[calc(100%-20px)] [&::after]:h-[calc(100%-20px)] [&::after]:border [&::after]:border-[#F4D39E] [&::after]:rounded-[20px]

        [@media(max-width:1100px)]:mx-auto
        [@media(max-width:1100px)]:shadow-[0px_18px_40px_rgba(0,0,0,0.12)]
            ">
            <h2 className="sr-only">메인 정보</h2>
            <p style={{
                backgroundColor : color
            }} className={`inline-block p-[2px_30px] text-[#fff] text-[1.8rem] font-[main] rounded-[50px]`}>{type?.toString()}</p>
            <div className="flex justify-center items-center w-full bg-cover bg-center bg-[url('/mbti-bg.png')]">
                <img className="[@media(max-width:490px)]:w-[40vw]" src={`/mbti/${type?.toString().toLowerCase()}.webp`} alt="" />
            </div>
            <dl className="text-center">
                <dt className="text-[1.6rem]">{animal}</dt>
                <dd className="text-color-sub [@media(min-width:490px)]:text-[1.2rem]">{subTitle}</dd>
            </dl>
            <ul className="block w-full mt-[20px] py-[15px] px-[5px] text-left bg-[#FCF3E1] rounded-[20px] space-y-[10px]">
                {
                    summary?.items.map((el, i) => {
                        return (
                            <li key={`${el}-${i}`}
                                className="
                                    relative
                                    flex
                                    items-start
                                    leading-[1.3]
                                    pl-[10px]
                                    text-[#7A6551]
                                    text-[0.9rem]
                                    break-keep
                                    [&::before]:content-['']
                                    [&::before]:shrink-0
                                    [&::before]:relative
                                    [&::before]:top-[5.5px]
                                    [&::before]:block
                                    [&::before]:w-[6px]
                                    [&::before]:h-[6px]
                                    [&::before]:mr-[5px]
                                    [&::before]:bg-[#F7CF98]
                                    [&::before]:rounded-[100%]

                                    [@media(max-width:499px)]:text-[0.7rem]
                                "
                            >{el}</li>
                        )
                    })
                }
            </ul>
            <div className="relative w-full">
                <h3 className="relative my-[20px_40px] text-center text-[1.1rem]">
                    <span className={`relative inline-block w-[250px] py-[10px] text-[#A76024] text-[1.1rem] bg-[#FBEACF] rounded-[20px] shadow-[0_18px_40px_rgba(0,0,0,0.12)]
                    [&::before]:content-['*']
                    [&::before]:absolute
                    [&::before]:top-1/2
                    [&::before]:right-[-30px]
                    [&::before]:-translate-y-1/2
                    [&::before]:text-[#A19992]
                    [&::before]:text-[2rem]
            
                    [&::after]:content-['*']
                    [&::after]:absolute
                    [&::after]:top-1/2
                    [&::after]:left-[-30px]
                    [&::after]:-translate-y-1/2
                    [&::after]:text-[#A19992]
                    [&::after]:text-[2rem]
                    [@media(max-width:499px)]:w-[220px]

                    [@media(max-width:499px)]:[&::before]:hidden
                    [@media(max-width:499px)]:[&::after]:hidden
                        `}>
                        {subTypeTitle}
                    </span>
                    {
                        [...Array(2)].map((_, i) => {
                            return <b key={`ui-${i}`} className={`
                                absolute
                                top-1/2
                                -translate-y-1/2
                                block
                                w-[50px]
                                h-[1px]
                                bg-[#A19992]
                                ${i === 0 ? "left-[0]" : "right-[0]"}
                                [@media(max-width:499px)]:hidden
                                [@media(max-width:499px)]:hidden
                            `}></b>
                        })
                    }
                </h3>
                <ul className="w-full text-[left] space-y-[20px]">
                    {
                        subPropensityInfo && subPropensityInfo.length > 0 ? subPropensityInfo.map((el, i) => <SubPropensityItem key={`${el["keyword"]}-${i}`} item={el} />)
                        : 
                        <SubPropensityItem item={{
                            keyword : "균형적인",
                            title : "특정 사고 스타일에 치우치지 않고 균형을 유지한다.",
                            items : ["사람들과의 교류 속에서도 자신의 기준을 유지한다", "감정에만 의존하지 않고 한 번 더 판단한다", "표현과 침묵 사이의 균형을 잘 잡는다", "상황에 따라 다양한 사고 방식을 활용한다"]
                        }} />
                    }
                </ul>
            </div>
        </section>
    )
}