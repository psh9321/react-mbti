import mbti from "@/data/mbti";
import subPropensity from "@/data/subPropensity";

export async function API_SERVER_GET_RESULT_MBTI(type : MBTI.TYPE, sub : string) {
    try {
console.log(sub,"##")
        const VALID_SUB_KEYS : SUB_PROPENSITY.TYPE_KEY[] = ["cognitive", "energetic", "expressive", "social", "anxious", "restrained", "thinking"];

        const subParams : SUB_PROPENSITY.TYPE_KEY[] = sub
        ? sub.split("-").filter((k): k is SUB_PROPENSITY.TYPE_KEY => VALID_SUB_KEYS.includes(k as SUB_PROPENSITY.TYPE_KEY))
        : [];

        const subPropensityInfo : SUB_PROPENSITY.SUB_PROPENSITY_DATA[] = [];

        if(subParams.length > 0) {

            const supType = type[0].toUpperCase() === "E" ? "extraversion" : "introversion";

            Object.entries(subPropensity[supType]).forEach(([key, item]) => {
                if(subParams.includes(key as SUB_PROPENSITY.TYPE_KEY)) subPropensityInfo.push(item);
            })
        }

        const mbtiInfo = mbti[type];

        return {
            mbtiInfo,
            subPropensityInfo
        }
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}