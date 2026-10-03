import { Hono } from 'hono';
import QuestionRouter from '../../server/router/router.question';
import ResultRouter from '../../server/router/router.result';

// 포트를 열지 않고 실제 서버 라우터에 HTTP 요청을 보낸다.
export const serverApp = new Hono()
    .route('/api', QuestionRouter)
    .route('/api', ResultRouter);
