import { useEffect } from "react";

export const KakaoInitializer = () => {

    useEffect(() => {

        if (window.Kakao?.isInitialized()) return;

        const script = document.createElement("script");
        script.src = import.meta.env.VITE_KAKAO_SDK_URL;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.integrity = "sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6";

        script.onload = () => {
            if (!window.Kakao?.isInitialized()) {
              window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
            }
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    },[])

    return <></>;
};