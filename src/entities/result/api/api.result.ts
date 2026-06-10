import { CLIENT_API } from "@/shared/api/instance";

export async function API_CLIENT_GET_RESULT_MBTI(mbti : MBTI.TYPE, queryString : string) {
    try {
        const result = await CLIENT_API.get(`result/mbti/${String(mbti)}`, {
            searchParams : {
                sub : queryString
            }
        })
        .json<API_CLIENT_GET_RESULT_MBTI>();

        return result["data"] as RESULT_ITEM
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}