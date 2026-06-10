import subPropensityQuestion from "@/data/question/subPropensity";
import { GetSuffleQuestion } from "@/util/getSuffleQuestion";

export async function API_SERVER_GET_QUESTION_SUB_PROPENSITY(mbti : MBTI.TYPE) {
    try {
        const type : SUB_PROPENSITY.MAIN_KEY = (mbti as string)[0] === "e" ? "extraversion" : "introversion";

        const questions = subPropensityQuestion[type] as QUESTION.ITEM[];

        questions.forEach(el => el["is"] = null);

        const result = GetSuffleQuestion(questions, questions.length);

        return result

    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}