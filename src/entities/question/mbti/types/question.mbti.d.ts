declare global {
    type API_CLIENT_GET_QUESTION_MBTI = API.RESPONSE_MODEL<QUESTION.ITEM[][]>;

    interface TEST_VALIDATA {
        [key : MBTI.TYPE_KEY] : { true : number, false : number }
    }
}

export {}