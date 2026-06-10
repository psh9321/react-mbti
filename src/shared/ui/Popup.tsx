import { X, ChevronRight } from 'lucide-react';

import { Portal } from './Portal';

interface POPUP_WRAPPER extends LAYOUT_CHILD {
    cancelCallback : () => void
}

export const PopupWrapper = ({ children, cancelCallback } : POPUP_WRAPPER) => {
    return (
        <Portal>
            <div className="fixed top-[0] left-[0] flex justify-center items-center w-dvw h-dvh bg-[rgba(0,0,0,0.6)] z-3">
                <div className={`relative flex flex-wrap items-start w-[calc(490px)] bg-[#FEF9F7] rounded-[10px] py-[30px] px-[20px] 
                        [@media(max-width:499px)]:w-[calc(100%-40px)]
                        [@media(max-width:499px)]:flex-col
                        [@media(max-width:499px)]:items-center
                        [@media(max-width:499px)]:text-center
                    `}>
                    <button className='absolute top-[0] right-[5px]' title="팝업 닫기" onClick={cancelCallback}><X className='absolute top-[calc(50%-1.5px)] right-[5px] translate-y-1/2 size-[27px]'/></button>
                    <img className="w-[110px] mr-[8px]" src={"/confirm.webp"} alt={`팝업 이미지`} />
                    {children}
                </div>
            </div>
        </Portal>

    )
}

interface CONFIRM {
    title : string, 
    msg : string,
    submitTxt? : string,
    cancelTxt? : string,
    submitCallback : () => void,
    cancelCallback : () => void
}

export const Confirm = ({ title, msg, submitTxt, cancelTxt, submitCallback, cancelCallback } : CONFIRM) => {
    
    return (
        <PopupWrapper cancelCallback={cancelCallback}>
            <>
                <dl className="relative top-[20px] mb-[40px]">
                    <dt className="text-[#A76024] text-[1.3rem]">{title}</dt>
                    <dd className="w-[240px] leading-[1.3] mt-[10px] text-[#5D391E] text-[0.9rem] break-keep">{msg}</dd>
                </dl>
                <ul className='flex justify-between items-center w-full mt-[20px]
                    [&>li]:w-[calc(50%-5px)]
                    [&>li>button]:inline-block
                    [&>li>button]:w-full
                    [&>li>button]:p-[10px]
                    [&>li>button]:text-center
                    [&>li>button]:border
                    [&>li>button]:border-[#d3cdc7]
                    [&>li>button]:shadow-[0_10px_24px_rgba(0,0,0,0.15)]
                    [&>li>button]:rounded-[15px]
                    [&>li>button]:cursor-pointer
                '>
                    <li>
                        <button onClick={submitCallback} className='text-[#fff] bg-color-main border-none'>{submitTxt??"확인"}</button>
                    </li>
                    <li>
                        <button onClick={cancelCallback}>{cancelTxt??"취소"}</button>
                    </li>
                </ul>
            </>
        </PopupWrapper>
    )
}

interface ALERT {
    title : string, 
    msg : string,
    cancelTxt? : string,
    cancelCallback : () => void
}

export const Alert = ({ title, msg, cancelCallback, cancelTxt } : ALERT) => {
    return (
        <PopupWrapper cancelCallback={cancelCallback}>
            <>
                <dl className="relative top-[20px] mb-[40px]">
                    <dt className="text-[#A76024] text-[1.3rem]">{title}</dt>
                    <dd className="w-[240px] leading-[1.3] mt-[10px] text-[#5D391E] text-[0.9rem] break-keep">{msg}</dd>
                </dl>
                <div className='w-full text-right'>
                    <button className='inline-flex items-center py-[5px] pr-[35px] pl-[30px] text-[#fff] text-[1.2rem] bg-color-main rounded-[10px]' onClick={cancelCallback}>{cancelTxt??"확인"} <ChevronRight className='absolute top-1/2 right-[-5px] -translate-1/2 size-[27px]'/></button>  
                </div> 
            </>
        </PopupWrapper>
    )
}