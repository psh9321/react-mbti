
import { Outlet } from "react-router-dom"

import { QueryProvider } from "../Provider/QueryProvider"

import version from "version"


export const LayoutWrapper = () => {

    return (
        <>
            <QueryProvider>
                <div className="block m-auto py-[20px] select-none [@media(min-width:1100px)]:w-[1100px] [@media(min-width:1100px)]:mx-auto">
                    <div className="w-full">
                        <Outlet/>
                    </div>     
                    <div id="portal-root"></div>
                    <p className="sr-only">{version.DIST_VER}</p>
                </div>
            </QueryProvider>
        </>
    )
}
