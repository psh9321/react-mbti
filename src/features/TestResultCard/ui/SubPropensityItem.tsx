interface SUB_PROPENSITY_ITEM {
    item : SUB_PROPENSITY.ITEM
}

export const SubPropensityItem = ({ item } : SUB_PROPENSITY_ITEM) => {
    return (
        <li className="w-full">
            <dl className="break-keep">
                <dt className="flex flex-col items-start leading-[1.3] my-[10px] text-[1.2rem] font-[700] [@media(max-width:499px)]:text-[0.9rem]">
                    <span className="inline-block mb-[10px] py-[5px] px-[10px] text-[#A76024] text-[0.8rem] bg-[#f9e2a3] rounded-[20px]">{item["keyword"]}</span>
                    {item["title"]}
                </dt>
                {
                    item["items"].map((description, j) => {
                        return <dd key={`${description}-${j}`} className="
                            relative
                            block
                            pl-[10px]
                            leading-[1.4]
                            text-left
                            text-[#5D391E]
                            text-[1rem]

                            [&::before]:content-['']
                            [&::before]:absolute
                            [&::before]:top-[calc(50%-5px)]
                            [&::before]:left-[-2px]
                            [&::before]:translate-y-1/2
                            [&::before]:block
                            [&::before]:w-[5px]
                            [&::before]:h-[5px]
                            [&::before]:bg-color-sub
                            [&::before]:rounded-[100%]

                            [@media(max-width:499px)]:text-[0.8rem]
                        ">{description}</dd>
                    })
                }
            </dl>
        </li>
    )
}