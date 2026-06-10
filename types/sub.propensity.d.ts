import subPropensity from "@/data/subPropensity";

declare global {
    namespace SUB_PROPENSITY {
        /** 하위 유형 타입 */
        type MAIN_KEY = keyof typeof subPropensity;

        /** 외향형 하위유형 종류 */
        type EXTRAVERSION_KEY = keyof typeof subPropensity["extraversion"];

        /** 내향형 하위유형 종류 */
        type INTROVERSION_KEY = keyof typeof subPropensity["introversion"];

        /** 성향별 하위 유형 세부 종류 */
        type TYPE_KEY = EXTRAVERSION_KEY | INTROVERSION_KEY;

        interface SUB_PROPENSITY_DATA {
            [K : TYPE_KEY] : ITEM
        }

        interface ITEM {
            title : string,
            keyword : string,
            items : string[]
        }
    }
}

export {}