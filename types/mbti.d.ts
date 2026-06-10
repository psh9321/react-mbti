import mbti from "@/data/mbti"
import mbtiQuestionType from "@/data/question/mbti"

interface DEFAULT_ITEM {
    title : string
}

declare global {
    namespace MBTI {
        /** mbti 유형 */
        type TYPE = keyof typeof mbti;

        /** mbti 유형 타입 */
        type TYPE_KEY = keyof typeof mbtiQuestionType;

    interface MESSAGE extends DEFAULT_ITEM {
        description : string
    }

    interface RELATIONSHIPS extends DEFAULT_ITEM {
        items : string[]
    }

    interface CAUTIONS extends DEFAULT_ITEM {
        items : string[]
    }

    interface STRENGTHS extends DEFAULT_ITEM {
        items : string[]
    }

    interface PERSONALITY extends DEFAULT_ITEM {
        items : { title : string, description : string }[]
    }

    interface SUMMARY extends DEFAULT_ITEM {
        items : string[]
    }

    interface ITEM {
        /** mbti type */
        type : TYPE,
        /** 유형별 동물 */
        animal : ANIMAL,
        /** 서브 타이틀 */
        subTitle : string,
        /** 유형별 어울리는 색상 */
        color : string,
        /** 한줄요약 */
        summary : SUMMARY,
        /** 성격특징 */
        personality : PERSONALITY,
        /** 강점 */
        strengths : STRENGTHS,
        /** 주의하면 좋은점 */
        cautions : CAUTIONS,
        /** 관계 성향 */
        relationships :RELATIONSHIPS,
        /** 메세지 */
        message : MESSAGE,
    }
    }
}

export {}