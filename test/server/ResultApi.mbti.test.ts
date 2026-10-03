import { beforeEach, describe, expect, it, vi } from 'vitest';
import mbti from '../../server/data/mbti';
import subPropensity from '../../server/data/subPropensity';
import { serverApp } from './serverApp';

beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
});

describe('GET /api/result/mbti/:mbti', () => {
    it.each(Object.keys(mbti) as MBTI.TYPE[])('%s의 결과를 하위 유형 없이 반환한다', async type => {
        const response = await serverApp.request(`/api/result/mbti/${type}`);
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({
            resultCode: 200,
            errMsg: '',
            data: { mbtiInfo: mbti[type], subPropensityInfo: [] },
        });
    });

    it.each([
        ['estj', 'expressive-social', [subPropensity.extraversion.expressive, subPropensity.extraversion.social]],
        ['infp', 'thinking-social', [subPropensity.introversion.thinking, subPropensity.introversion.social]],
        ['enfp', 'cognitive-energetic-expressive-social', Object.values(subPropensity.extraversion)],
        ['intj', 'anxious-restrained-thinking-social', Object.values(subPropensity.introversion)],
        ['estj', 'social-social-invalid-thinking', [subPropensity.extraversion.social]],
        ['infp', 'social-social-invalid-expressive', [subPropensity.introversion.social]],
        ['estj', 'invalid', []],
        ['infp', '', []],
    ] as const)('%s에서 sub=%s에 해당하는 하위 결과만 반환한다', async (type, sub, expected) => {
        const response = await serverApp.request(
            `/api/result/mbti/${type}?${new URLSearchParams({ sub })}`,
        );
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({
            resultCode: 200,
            errMsg: '',
            data: { mbtiInfo: mbti[type], subPropensityInfo: expected },
        });
    });
});
