"use client"
import ReactDOM from "react-dom";

import { useEffect, useState } from "react";

export const Portal = ({ children }: { children: React.ReactNode }) => {
    const [isMount, setIsMount] = useState(false);

    useEffect(() => {
        setIsMount(true);
    }, []);

    if (!isMount) return null;

    const elements = document.getElementById("portal-root");
    
    if (!elements) return null;

    return ReactDOM.createPortal(children, elements);
};
