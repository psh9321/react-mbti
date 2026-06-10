import { Link } from "react-router-dom"

const ErrorPageView = () => {
    return (
        <section className="
        block max-w-[500px] h-[calc(100dvh-101px)] mx-[auto] py-[50px] text-center
        [&>p]:leading-[1.5]
        [&>p]:text-[#999]
        [&>p]:text-[1.2rem]

        [@media(max-width:499px)]:flex
        [@media(max-width:499px)]:flex-col
        [@media(max-width:499px)]:justify-center
        [@media(max-width:499px)]:items-center
        [@media(max-width:499px)]:px-[20px]
        [@media(max-width:499px)]:[&>p]:text-[0.9rem]
        ">
            <h1 className="block mb-[30px] text-[#7a5a1d] text-[2rem] font-[700] [@media(max-width:499px)]:text-[1.7rem]">길을 잃었어요.</h1>
            <p>주소가 변경되었거나 삭제된 페이지일 수 있어요.</p>
            <p>홈으로 돌아가 다시 시작해 주세요.</p>
            <img className="my-[30px] [@media(max-width:499px)]:w-[calc(100%-20px)]" src={"/error.webp"} alt="에러 페이지" />
            <ul className="
                flex justify-center items-center space-x-[20px]
                [&>li>a]:inline-block
                [&>li>a]:py-[15px]
                [&>li>a]:px-[40px]
                [&>li>a]:text-[1.3rem]
                [&>li>a]:border-[1px]
                [&>li>a]:rounded-[20px]
                [&>li>a]:shadow-[0_10px_24px_rgba(0,0,0,0.15)]

                [@media(max-width:499px)]:block
                [@media(max-width:499px)]:w-[calc(100%-50px)]
                
                [@media(max-width:499px)]:space-x-[0]
                [@media(max-width:499px)]:space-y-[15px]
                [@media(max-width:499px)]:[&>li>a]:w-full
                [@media(max-width:499px)]:[&>li>a]:text-[1rem]
            ">
                <li><Link to={"/"} className="text-[#c9c9c9]">홈으로 돌아가기</Link></li>
                <li><Link to={"/test"} className="text-[#fff] font-[700] bg-[#E2B86B] border-[#E2B86B]" >테스트 하러 가기</Link></li>
            </ul>
        </section>
    )
}

export default ErrorPageView