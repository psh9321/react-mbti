import { useLayoutEffect, useRef } from "react"

export const AnimWrapper = ({
    className = "",
    height = 300,
    children,
    type = "scale down"
} : {
    className? : string,
    height? : number,
    children : React.ReactElement,
    type : "scale down" | "scale up"
}) => {

    const animationType = type;

    const wrapper = useRef<HTMLDivElement>(null);

    const stickyBox = useRef<HTMLDivElement>(null);

    const layoutInfo = useRef({
        start : 0,
        end : 0,
        step : 0,
        value : -1.
    })

    function Init(){

        if(!wrapper["current"]) return

        const wrapperElement = wrapper["current"];

        layoutInfo["current"]["start"] = wrapperElement.offsetTop;
        layoutInfo["current"]["end"] = wrapperElement.offsetTop + wrapperElement.clientHeight - innerHeight;
        layoutInfo["current"]["step"] = layoutInfo["current"]["end"] - layoutInfo["current"]["start"];
    }

    function GetCalculateValue(){
        if(!layoutInfo["current"]) return -1

        const { start, step, value } = layoutInfo["current"];

        const progress = (scrollY - start) / step;

        switch (animationType) {
            case "scale up": 
                return Math.min(value + progress, 1)

            case "scale down" : 
                return Math.max(value - progress, 0);
            default: return 0
        }
    }

    function OnResize(){ Init() }

    function OnScroll(){
 
        if(!stickyBox["current"]) return

        const stickyElement = stickyBox["current"];

        const value = GetCalculateValue();

        if(animationType === "scale down" || animationType === "scale up") {
            stickyElement.style.transform = `scale(${value.toFixed(1)})`
            stickyElement.style.opacity = value.toFixed(1);
        }
    }

    useLayoutEffect(() => {

        switch (animationType) {
            case "scale up": layoutInfo["current"]["value"] = 0 ; break;
            case "scale down" : layoutInfo["current"]["value"] = 1 ; break;
        }

        Init();
        window.addEventListener("resize",OnResize);
        window.addEventListener("scroll",OnScroll);

        return () => {
            window.removeEventListener("resize",OnResize);
            window.removeEventListener("scroll",OnScroll);
        }
    },[])

    return (
        <div 
            ref={wrapper}
            className={className}
            style={{
                height : `${height}dvh`
            }}
            >
            <div 
                ref={stickyBox}
                style={{
                    position: "sticky",
                    top: "0",
                    display: "flex",
                    justifyContent : "center",
                    alignItems: "center",
                    height: "100dvh",
                    transition: "0.25s ease",
                }}
            >
                {children}
            </div>
        </div>
    )
}

