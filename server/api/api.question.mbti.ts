import mbtiQuestion from "@/data/question/mbti";
import { GetSuffleQuestion } from "@/util/getSuffleQuestion";

export async function API_SERVER_GET_QUESTION_MBTI() {
    try {
        const result = [];

        for(const key in mbtiQuestion) {
            const questions = mbtiQuestion[key as MBTI.TYPE_KEY] as QUESTION.ITEM[];

            const shuffledArr = GetSuffleQuestion(questions, 7);

            shuffledArr.forEach(el => el["is"] = null);

            result.push(shuffledArr);
        }
        
        return result
        
    }
    catch(err) { 
        console.log(err, "$$$");
        throw err;
    }
}