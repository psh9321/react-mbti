import { CLIENT_API } from "@/shared/api/instance";

export async function API_CLIENT_GET_QUESTION_MBTI() {
    try {
        const result = await CLIENT_API.get("question/mbti")
        .json<API_CLIENT_GET_QUESTION_MBTI>();

        return result["data"]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}