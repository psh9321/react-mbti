import { useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom"

import { QueryProvider } from "../Provider/QueryProvider"

export const LayoutWrapper = () => {

    const location = useLocation();
    
    useEffect(() => {
        if(window.scrollY > 0) {
            window.scrollTo({
                top : 0,
                behavior : "smooth"
            })
        }
    },[location.pathname])

    return (
        <>
            <QueryProvider>
                <div className="block m-auto py-[20px] select-none [@media(min-width:1100px)]:w-[1100px] [@media(min-width:1100px)]:mx-auto">
                    <div className="w-full">
                        <Outlet/>
                    </div>     
                    <div id="portal-root"></div>
                </div>
            </QueryProvider>
        </>
    )
}
