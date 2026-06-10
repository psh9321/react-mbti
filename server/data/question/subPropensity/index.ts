import social from "./common/social"

import cognitive from "./extraversion/cognitive"
import energetic from "./extraversion/energetic"
import expressive from "./extraversion/expressive"

import anxious from "./introversion/anxious"
import restrained from "./introversion/restrained"
import thinking from "./introversion/thinking"

const subPropensityQuestion = {
    /** 외향형 */
    extraversion : [
        ...cognitive,
        ...energetic,
        ...expressive,
        ...social,
    ],
    
    /** 내향형 */
    introversion : [
        ...anxious,
        ...restrained,
        ...thinking,
        ...social,
    ]
}

export default subPropensityQuestion