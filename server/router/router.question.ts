import { Hono } from "hono";

import { API_SERVER_GET_QUESTION_MBTI } from "@/api/api.question.mbti";
import { API_SERVER_GET_QUESTION_SUB_PROPENSITY } from "@/api/api.question.sub.propensity";
import { ApiError, ApiSuccess } from "@/model/response.model";

const QuestionRouter = new Hono();

const method = "/question"

QuestionRouter.get(`${method}/mbti`, async c => {
    try {
        const response = await API_SERVER_GET_QUESTION_MBTI();

        const result = new ApiSuccess(response);

        return c.json(result);
    }
    catch(err) {
        throw c.json(new ApiError(err, "mbti 테스트 문항 불러오기 에러"));
    }
})

QuestionRouter.get(`${method}/sub/:mbti`, async c => {
    try {
       const { mbti } = c.req.param() as { mbti : MBTI.TYPE };

       const response = await API_SERVER_GET_QUESTION_SUB_PROPENSITY(mbti);

        const result = new ApiSuccess(response);

        return c.json(result);       
    }
    catch(err) {
        throw c.json(new ApiError(err, "성격 하위 유형 테스트 문항 불러오기 에러"));
    }
})

export default QuestionRouter
