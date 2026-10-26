
import { TestQuestionBox } from "@/widgets/TestQuestionBox";
import { TestPageHeader } from "@/widgets/TestPageHeader";
import { TestPageBanner } from "@/widgets/TestPageBanner";

export const TestPageView = () => {

    return (
        <div className="px-[40px]`">
            <h1 className="sr-only">성격 유형 테스트 페이지</h1>
            <TestPageHeader/>
            <main className=" [@media(max-width:1100px)]:max-w-[550px] [@media(max-width:1100px)]:mx-auto [@media(min-width:1100px)]:flex">
                <TestPageBanner/>
                <TestQuestionBox/>
            </main>
        </div>
    )
}