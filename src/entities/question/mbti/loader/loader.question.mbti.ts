import { queryclient } from '@/app/Provider/QueryProvider'
import { API_CLIENT_GET_QUESTION_MBTI } from '../api/api.question.mbti'

export function LoaderQuestionMbti() {

    return queryclient.ensureQueryData({
        queryKey: ['question', 'mbti'],
        queryFn: API_CLIENT_GET_QUESTION_MBTI,
    })
}
