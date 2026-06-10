import { Hono } from "hono";

import { ApiError, ApiSuccess } from "@/model/response.model";
import { API_SERVER_GET_RESULT_MBTI } from "@/api/api.result.mbti";

const ResultRouter = new Hono();

const method = "/result"

ResultRouter.get(`${method}/mbti/:mbti`, async c => {
    try {
        const { mbti } = c.req.param() as { mbti : MBTI.TYPE };

        const { sub } = c.req.query() as { sub : string };

        const response = await API_SERVER_GET_RESULT_MBTI(mbti, sub);

        const result = new ApiSuccess(response);

        return c.json(result);
    }
    catch(err) {
        throw c.json(new ApiError(err, "테스트 결과 불러오기 에러"));
    }
});

export default ResultRouter