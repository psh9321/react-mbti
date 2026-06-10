declare global {

    namespace QUESTION {
        /** 테스트 문항 */
        interface ITEM {
            type : MBTI.TYPE_KEY | SUB_PROPENSITY.TYPE_KEY,
            contents : string,
            is? : null | boolean
        }
    }

}

export {}