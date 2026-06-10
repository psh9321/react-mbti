
import { Outlet } from "react-router-dom"

import { QueryProvider } from "../Provider/QueryProvider"

export const LayoutWrapper = () => {

    
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
