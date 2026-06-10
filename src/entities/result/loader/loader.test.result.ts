import { queryclient } from '@/app/Provider/QueryProvider'

import { API_CLIENT_GET_RESULT_MBTI } from '../api/api.result'


export function LoaderTestResult(type : MBTI.TYPE, sub : string) {

    return queryclient.ensureQueryData({
        queryKey: ['result', type, sub??""],
        queryFn: () => API_CLIENT_GET_RESULT_MBTI(type, sub),
    })
}
