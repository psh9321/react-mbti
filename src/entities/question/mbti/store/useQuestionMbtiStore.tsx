import { create } from 'zustand'

interface USE_QUESTION_MBTI_STORE {
    mbti : MBTI.TYPE | "";
    /** 
     * 0 : energy : E, I 테스트
     * 1 : recognition : S, N 테스트
     * 2 : judgment : T, F 테스트
     * 3 : life : J, P 테스트
     */
    currentIdx : 0 | 1 | 2 | 3;
    SetCurrentIdx : (idx : 0 | 1 | 2 | 3) => void;
    SetMbti : (mbti : MBTI.TYPE) => void;
}

export const useQuestionMbtiStore = create<USE_QUESTION_MBTI_STORE>((set) => ({
    mbti : "",
    currentIdx : 0,
    SetCurrentIdx(idx) { set({ currentIdx : idx }) },
    SetMbti(mbti) { set({ mbti }) }
}))