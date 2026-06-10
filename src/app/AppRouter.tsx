import { createBrowserRouter } from 'react-router-dom'
import { LayoutWrapper } from './ui/LayoutWrapper'
import IndexPageView from '@/views/IndexPageView';
import { TestPageView } from '@/views/TestPageView';
import { LoaderQuestionMbti } from '@/entities/question/mbti/loader/loader.question.mbti';
import { ResultPageView } from '@/views/ResultPageView';
import { LoaderTestResult } from '@/entities/result/loader/loader.test.result';
import ErrorPageView from '@/views/ErrorPageView';

export default createBrowserRouter([
    {
        path: '/',
        element: <LayoutWrapper />,
        children: [
            {
                index: true,
                element: <IndexPageView />,
            },
            {
                path: 'test',
                element: <TestPageView />,
                loader: LoaderQuestionMbti,
            },
            {
                path : "result/:type",
                element : <ResultPageView/>,
                loader : ({ params, request }) => {
                    const type = params.type;
                    const url = new URL(request.url);
                    const query = url.searchParams;

                    LoaderTestResult(type as MBTI.TYPE, query.get("sub") as string)
                }
            }, 
            {
                path : "*",
                element : <ErrorPageView/>
            }
        ],
    },
])
