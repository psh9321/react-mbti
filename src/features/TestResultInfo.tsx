import { useResultHook } from "@/entities/result/hook/useResultHook";

export const TestResultInfo = () => {

    const { message, relationships, strengths, cautions, personality } = useResultHook();

    return (
        <section className="
            [&_dt]:inline-block
            [&_dt]:mb-[10px]
            [&_dt]:p-[5px_20px]
            [&_dt]:rounded-[20px]
            [&_.box>dd]:flex
            [&_.box>dd]:gap-[5px]
            [&_.box>dd]:ml-[20px]
            [&_.box>dd]:leading-[1.8]
            [&_.box>dd]:break-keep
            [&_.box>dd:before]:content-['']
            [&_.box>dd:before]:shrink-0
            [&_.box>dd:before]:relative
            [&_.box>dd:before]:top-[12px]
            [&_.box>dd:before]:left-[-3px]
            [&_.box>dd:before]:block
            [&_.box>dd:before]:size-[4px]
            [&_.box>dd:before]:bg-color-sub
            [&_.box>dd:before]:rounded-[100%]
        ">
            <article className="w-full">
                <h2 className="sr-only">{personality?.title}</h2>
                <dl className="box">
                    <dt className="text-[#F9F3F4] bg-[#9B82BE]">{personality?.title}</dt>
                    {
                        personality?.items.map((el, i) =>
                            <dd key={`${personality?.title}-${i}`}>{el.description}</dd>
                        )
                    }
                </dl>
            </article>
            
            <div className="mt-[30px] [@media(max-width:600px)]:space-y-[30px] [@media(min-width:600px)]:flex [@media(min-width:600px)]:flex-wrap [@media(min-width:600px)]:[&>article]:w-[33.33%]">
                <article>
                    <h2 className="sr-only">{cautions?.title}</h2>
                    <dl className="box">
                        <dt className="text-[#E6842B] bg-[#FAE7BF]">{ cautions?.title }</dt>
                        {
                            cautions?.items.map((el, i) =>
                                <dd key={`${cautions?.title}-${i}`}>{el}</dd>
                            )
                        }
                    </dl>
                </article>
                <article>
                    <h2 className="sr-only">{strengths?.title}</h2>
                    <dl className="box">
                        <dt className="text-[#77973D] bg-[#ECEFCD]">{ strengths?.title }</dt>
                        {
                            strengths?.items.map((el, i) =>
                                <dd key={`${strengths?.title}-${i}`}>{el}</dd>)
                        }
                    </dl>
                </article>
                <article>
                    <h2 className="sr-only">{relationships?.title}</h2>
                    <dl className="box">
                        <dt className="text-[#FDF3F3] bg-[#F6B5A6]">{ relationships?.title }</dt>
                        {
                            relationships?.items.map((el, i) =>
                            <dd key={`${relationships?.title}-${i}`}>{el}</dd>)
                        }
                    </dl>
                </article>
            </div>
            <article className="w-full mt-[40px] p-[20px] bg-[#FDF9EF] border border-color-sub rounded-[10px]">
                <h2 className="sr-only">{message?.title}</h2>
                <dl className="text-center">
                    <dt className="text-[#FDFBF2] bg-[#F5C356]">{message?.title}</dt>
                    <dd className="break-keep">{message?.description}</dd>
                </dl>
            </article>
        </section>
    )
}