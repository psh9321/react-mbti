declare global {
    interface LAYOUT_CHILD {
        children? : React.ReactElement
    }

    interface CLASS_APPEND_COMPONENT extends LAYOUT_CHILD {
        className? : string
    }

    interface Window {
        Kakao: any;
    }
}

export {}