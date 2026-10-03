import { describe, expect, it } from 'vitest';
import mbti from '../../server/data/mbti';
import subQuestions from '../../server/data/question/subPropensity';
import mbtiQuestion from '../../server/data/question/mbti';
import { serverApp } from './serverApp';

describe('GET /api/question/mbti', () => {
    it('네 지표별로 중복 없는 15개 문항과 초기 답변 상태를 반환한다', async () => {
        const response = await serverApp.request('/api/question/mbti');
        expect(response.status).toBe(200);
        expect(response.headers.get('content-type')).toContain('application/json');

        const body = await response.json();
        expect(body).toMatchObject({ resultCode: 200, errMsg: '' });
        expect(body.data).toHaveLength(4);

        const types = ['energy', 'recognition', 'judgment', 'life'] as const;
        types.forEach((type, index) => {
            const questions = body.data[index] as QUESTION.ITEM[];
            expect(questions).toHaveLength(15);
            expect(new Set(questions.map(question => question.contents)).size).toBe(15);
            for (const question of questions) {
                expect(question).toEqual({
                    type,
                    contents: expect.any(String),
                    is: null,
                });
                expect(mbtiQuestion[type].map(item => item.contents)).toContain(question.contents);
            }
        });
    });

    it('반복 요청에서도 각 지표의 문항 수와 미응답 상태를 유지한다', async () => {
        for (let attempt = 0; attempt < 3; attempt++) {
            const response = await serverApp.request('/api/question/mbti');
            const body = await response.json();
            expect(response.status).toBe(200);
            expect(body.data).toHaveLength(4);
            for (const questions of body.data as QUESTION.ITEM[][]) {
                expect(questions).toHaveLength(15);
                expect(questions.every(question => question.is === null)).toBe(true);
            }
        }
    });
});

describe('GET /api/question/sub/:mbti', () => {
    it.each(Object.keys(mbti) as MBTI.TYPE[])('%s에 맞는 하위 유형 전체 문항을 반환한다', async type => {
        const response = await serverApp.request(`/api/question/sub/${type}`);
        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body).toMatchObject({ resultCode: 200, errMsg: '' });
        const expected = subQuestions[type.startsWith('e') ? 'extraversion' : 'introversion'];
        const questions = body.data as QUESTION.ITEM[];
        expect(questions).toHaveLength(expected.length);
        expect(questions.length).toBeGreaterThan(0);
        expect(questions).toEqual(expect.arrayContaining(
            expected.map(question => ({ ...question, is: null })),
        ));
        expect(new Set(questions.map(question => question.contents)).size).toBe(expected.length);
        expect([...new Set(questions.map(question => question.type))].sort()).toEqual(
            (type.startsWith('e')
                ? ['cognitive', 'energetic', 'expressive', 'social']
                : ['anxious', 'restrained', 'thinking', 'social']).sort(),
        );
    });
});
