declare global {

    interface RESULT_ITEM {
        mbtiInfo : MBTI.ITEM,
        subPropensityInfo : SUB_PROPENSITY.ITEM[]
    }

    type API_CLIENT_GET_RESULT_MBTI = API.RESPONSE_MODEL<RESULT_ITEM>
}

export {}