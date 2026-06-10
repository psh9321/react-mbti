import { CLIENT_API } from "@/shared/api/instance";

export async function API_CLIENT_GET_QUESTION_SUB_PROPENSITY(mbti : MBTI.TYPE) {
    try {
        const result = await CLIENT_API.get(`question/sub/${String(mbti)}`)
        .json<API_CLIENT_GET_QUESTION_SUB_PROPENSITY>();

        return result["data"] as QUESTION.ITEM[]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}