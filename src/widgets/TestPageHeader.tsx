
import { Logo } from "@/shared/ui/Logo";
import { BtnTestClose } from "@/features/BtnTestClose";

export const TestPageHeader = () => {
    
    return (
        <>

            <header className="sticky top-[0] flex justify-between items-center w-full h-[70px] mt-[-20px] bg-[#FDF8E6] z-[2] [@media(max-width:1100px)]:px-[20px]">
                <Logo className="order-2"/>
                <BtnTestClose/>
            </header>
        </>
    )
}