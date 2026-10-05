declare global {

    interface RESULT_ITEM {
        mbtiInfo : MBTI.ITEM,
        subPropensityInfo : SUB_PROPENSITY.ITEM[]
    }

    interface LATEST_ITEM_PARAMS {
        mbti : MBTI.ITEM["type"],
        subTitle : MBTI.ITEM["subTitle"],
        color : MBTI.ITEM["color"],
        summaryItems : MBTI.ITEM["summary"]["items"],
        subPropensityKey : string,
        subPropensityInfo : SUB_PROPENSITY.ITEM[]
    }

    interface LATEST_ITEM extends LATEST_ITEM_PARAMS {
        testDate : string, /** 테스트 시간 */
    }

    /** 테스트 결과 페이지 location state */
    interface RESULT_PAGE_LOCATION_STATE {
        isLoadingView?: boolean; /** 로딩화면 여부 */
        [key: string]: unknown;
    }

    type API_CLIENT_GET_RESULT_MBTI = API.RESPONSE_MODEL<RESULT_ITEM>
}

export {}