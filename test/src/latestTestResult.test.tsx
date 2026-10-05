import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { openDB } from 'idb';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useIndexedDBHook } from '@/entities/result/hook/useIndexedDBHook';
import { API_CLIENT_GET_RESULT_MBTI } from '@/entities/result/api/api.result';
import { TestResultSetLatest } from '@/features/TestResultSetLatest';
import IndexPageView from '@/views/IndexPageView';
import { estj } from '../../server/data/mbti/estj';
import { extraversion } from '../../server/data/subPropensity/extraversion';

vi.mock('@/entities/result/api/api.result');

const latestParams: LATEST_ITEM_PARAMS = {
    mbti: 'ESTJ',
    subTitle: estj.subTitle,
    color: estj.color,
    summaryItems: estj.summary.items,
    subPropensityKey: 'social',
    subPropensityInfo: [extraversion.social],
};
const resultData: RESULT_ITEM = {
    mbtiInfo: { ...estj, type: 'ESTJ' },
    subPropensityInfo: latestParams.subPropensityInfo,
};
const oldItem: LATEST_ITEM = {
    ...latestParams,
    mbti: 'INFP',
    subTitle: '이전 테스트 결과',
    testDate: '2026.10.04 (일) 12:00',
};
const storeName = String(import.meta.env.VITE_INDEXED_DB_STORE_NAME);

// 앱의 저장/조회 함수를 거치지 않고 DB 내용을 직접 검증한다.
async function readRecords() {
    const db = await openDB(
        String(import.meta.env.VITE_INDEXED_DB_NAME),
        Number(import.meta.env.VITE_INDEXED_DB_VERSION),
    );
    try {
        return await db.getAll(storeName);
    } finally {
        db.close();
    }
}

async function seedRecords(items: LATEST_ITEM[]) {
    const db = await openDB(
        String(import.meta.env.VITE_INDEXED_DB_NAME),
        Number(import.meta.env.VITE_INDEXED_DB_VERSION),
        { upgrade(db) { db.createObjectStore(storeName, { keyPath: 'mbti' }); } },
    );
    try {
        const tx = db.transaction(storeName, 'readwrite');
        for (const item of items) await tx.store.put(item);
        await tx.done;
    } finally {
        db.close();
    }
}

function renderIndex() {
    return render(<MemoryRouter><IndexPageView /></MemoryRouter>);
}

function renderSaveResult(state?: RESULT_PAGE_LOCATION_STATE) {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 } },
    });
    render(
        <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={[{ pathname: '/result/estj', search: '?sub=social', state }]}>
                <Routes>
                    <Route path="/result/:type" element={<TestResultSetLatest />} />
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>,
    );
    return client;
}

beforeEach(() => {
    // 테스트마다 별도 DB를 사용해 이전 테스트의 연결/데이터가 섞이지 않게 한다.
    vi.stubGlobal('indexedDB', new IDBFactory());
    vi.mocked(API_CLIENT_GET_RESULT_MBTI).mockResolvedValue(structuredClone(resultData));
});

describe('최근 테스트 결과 IndexedDB 저장', () => {
    it('빈 DB에서 조회하면 null을 반환한다', async () => {
        const { result } = renderHook(() => useIndexedDBHook());
        expect(await result.current.GetLatestTestResult()).toBeNull();
    });

    it('결과 전체와 테스트 일자를 저장하고 다시 조회한다', async () => {
        vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2026);
        vi.spyOn(Date.prototype, 'getMonth').mockReturnValue(9);
        vi.spyOn(Date.prototype, 'getDate').mockReturnValue(5);
        vi.spyOn(Date.prototype, 'getDay').mockReturnValue(1);
        vi.spyOn(Date.prototype, 'getHours').mockReturnValue(9);
        vi.spyOn(Date.prototype, 'getMinutes').mockReturnValue(3);
        const { result } = renderHook(() => useIndexedDBHook());
        await result.current.SetLatestTestResult(latestParams);
        const expected = { ...latestParams, testDate: '2026.10.05 (월) 09:03' };
        expect(await readRecords()).toEqual([expected]);
        expect(await result.current.GetLatestTestResult()).toEqual(expected);
    });

    it('기존 여러 유형의 내역을 모두 삭제하고 최신 결과 한 건만 남긴다', async () => {
        await seedRecords([oldItem, { ...oldItem, mbti: 'INTJ' }]);
        const { result } = renderHook(() => useIndexedDBHook());
        await result.current.SetLatestTestResult(latestParams);
        expect(await readRecords()).toEqual([{ ...latestParams, testDate: expect.any(String) }]);
        await result.current.SetLatestTestResult({ ...latestParams, subTitle: '다시 테스트한 결과' });
        expect(await readRecords()).toEqual([{
            ...latestParams, subTitle: '다시 테스트한 결과', testDate: expect.any(String),
        }]);
    });

    it('새 테스트 결과를 불러온 뒤 기존 내역을 교체하고 index에 표시한다', async () => {
        await seedRecords([oldItem]);
        let resolveResult!: (value: RESULT_ITEM) => void;
        vi.mocked(API_CLIENT_GET_RESULT_MBTI).mockReturnValue(new Promise(resolve => { resolveResult = resolve; }));
        const client = renderSaveResult({ isLoadingView: true });
        await waitFor(() => expect(API_CLIENT_GET_RESULT_MBTI).toHaveBeenCalledWith('estj', 'social'));
        expect(await readRecords()).toEqual([oldItem]);
        await act(async () => { resolveResult(resultData); });
        await waitFor(async () => expect(await readRecords()).toEqual([{
            ...latestParams, testDate: expect.any(String),
        }]));
        client.clear();
        renderIndex();
        expect(await screen.findByText(latestParams.subTitle)).toBeVisible();
        expect(screen.queryByText(oldItem.subTitle)).not.toBeInTheDocument();
    });

    it.each([undefined, { isLoadingView: false }])('결과 URL을 직접 조회하면 기존 저장 결과를 유지한다 (%j)', async state => {
        await seedRecords([oldItem]);
        const client = renderSaveResult(state);
        await waitFor(() => expect(client.getQueryData(['result', 'estj', 'social'])).toEqual(resultData));
        expect(await readRecords()).toEqual([oldItem]);
        client.clear();
    });
});

describe('index 페이지 최근 테스트 결과 UI', () => {
    it('저장된 결과가 없으면 최근 결과와 상세보기 UI를 표시하지 않는다', async () => {
        const read = vi.spyOn(IDBObjectStore.prototype, 'getAll');
        renderIndex();
        await waitFor(() => expect(read).toHaveBeenCalled());
        // 비동기 DB 조회가 완료된 후에도 숨겨져 있는지 확인한다.
        await act(async () => { await readRecords(); });
        expect(screen.getByRole('heading', { name: '메인 페이지' })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: '최근에 테스트한 결과' })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: '상세보기' })).not.toBeInTheDocument();
    });

    it.each([
        ['social', [extraversion.social], '사교적인', '/result/estj?sub=social'],
        ['', [], '균형 사고형', '/result/estj'],
        ['social-expressive', [extraversion.social, extraversion.expressive], '다층 사고형', '/result/estj?sub=social-expressive'],
    ])('저장된 결과 내용과 상세보기 링크를 표시한다 (%s)', async (key, info, title, href) => {
        await seedRecords([{ ...latestParams, subPropensityKey: key as string, subPropensityInfo: info as SUB_PROPENSITY.ITEM[], testDate: oldItem.testDate }]);
        renderIndex();
        expect(await screen.findByRole('heading', { name: '최근에 테스트한 결과' })).toBeVisible();
        expect(screen.getByText(latestParams.subTitle)).toBeVisible();
        expect(screen.getByText(`${title} ESTJ`)).toHaveStyle({ backgroundColor: latestParams.color });
        for (const summary of latestParams.summaryItems) expect(screen.getByText(summary)).toBeVisible();
        expect(screen.getByText(`테스트 일자 : ${oldItem.testDate}`)).toBeVisible();
        expect(screen.getByRole('img', { name: 'ESTJ와 어울리는 동물 이미지' })).toHaveAttribute('src', '/mbti/estj.webp');
        expect(screen.getByRole('link', { name: '상세보기' })).toHaveAttribute('href', href);
    });
});
