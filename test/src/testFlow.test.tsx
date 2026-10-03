import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TestQuestionBox } from "@/widgets/TestQuestionBox";
import { TestResultCard } from "@/features/TestResultCard";
import { TestResultInfo } from "@/features/TestResultInfo";
import { BtnResultShared } from "@/features/BtnResultShared";
import { useQuestionMbtiStore } from "@/entities/question/mbti/store/useQuestionMbtiStore";
import { API_CLIENT_GET_QUESTION_MBTI } from "@/entities/question/mbti/api/api.question.mbti";
import { API_CLIENT_GET_QUESTION_SUB_PROPENSITY } from "@/entities/question/sub/api/api.question.sub.propensity";
import { API_CLIENT_GET_RESULT_MBTI } from "@/entities/result/api/api.result";

vi.mock("@/entities/question/mbti/api/api.question.mbti");
vi.mock("@/entities/question/sub/api/api.question.sub.propensity");
vi.mock("@/entities/result/api/api.result");

const makeQuestions = () =>
    ["energy", "recognition", "judgment", "life"].map((type) =>
        [1, 2, 3].map((number) => ({
            type,
            contents: `${type} 문항 ${number}`,
            is: null,
        })),
    ) as QUESTION.ITEM[][];
const makeSubQuestions = () =>
    Array.from({ length: 5 }, (_, idx) => ({
        type: "social",
        contents: `하위유형 문항 ${idx + 1}`,
        is: null,
    })) as QUESTION.ITEM[];
const resultData = {
    mbtiInfo: {
        type: "estj",
        animal: "테스트 동물",
        color: "#123456",
        subTitle: "현실적인 리더",
        summary: { title: "요약", items: ["계획을 실행한다"] },
        personality: {
            title: "성격",
            items: [{ title: "실행력", description: "책임감이 강하다" }],
        },
        strengths: { title: "강점", items: ["추진력이 좋다"] },
        cautions: { title: "주의점", items: ["휴식이 필요하다"] },
        relationships: { title: "관계", items: ["약속을 지킨다"] },
        message: { title: "메시지", description: "당신의 속도로 나아가세요" },
    },
    subPropensityInfo: [
        {
            keyword: "사교적인",
            title: "사람과 어울린다",
            items: ["교류를 즐긴다"],
        },
    ],
} as RESULT_ITEM;

function ResultScreen() {
    const location = useLocation();
    return (
        <>
            <output aria-label="결과 주소">
                {location.pathname}
                {location.search}
            </output>
            <TestResultCard />
            <TestResultInfo />
            <BtnResultShared />
        </>
    );
}

function renderFlow(entry = "/test") {
    const client = new QueryClient({
        defaultOptions: {
            queries: { retry: false, staleTime: Infinity, gcTime: 0 },
        },
    });
    const user = userEvent.setup();
    render(
        <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={[entry]}>
                <Routes>
                    <Route path="/test" element={<TestQuestionBox />} />
                    <Route path="/result/:type" element={<ResultScreen />} />
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>,
    );
    return { client, user };
}

async function answerAll(
    user: ReturnType<typeof userEvent.setup>,
    answer = "예",
) {
    for (const button of screen.getAllByRole("button", {
        name: answer,
    }))
        await user.click(button);
}

beforeEach(() => {
    useQuestionMbtiStore.setState({ mbti: "", currentIdx: 0 });
    vi.mocked(API_CLIENT_GET_QUESTION_MBTI).mockResolvedValue(makeQuestions());
    vi.mocked(API_CLIENT_GET_QUESTION_SUB_PROPENSITY).mockResolvedValue(
        makeSubQuestions(),
    );
    vi.mocked(API_CLIENT_GET_RESULT_MBTI).mockResolvedValue(
        structuredClone(resultData),
    );
});

describe("테스트 문항 불러오기 및 체크", () => {
    it("MBTI 문항을 불러와 현재 챕터만 표시한다", async () => {
        renderFlow();
        expect(await screen.findByText("energy 문항 1")).toBeVisible();
        expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
        expect(
            screen.queryByText("recognition 문항 1"),
        ).not.toBeInTheDocument();
        expect(API_CLIENT_GET_QUESTION_MBTI).toHaveBeenCalledTimes(1);
    });

    it("MBTI 답변을 예에서 아니오로 변경하고 다른 문항은 유지한다", async () => {
        const { user, client } = renderFlow();
        const row = (await screen.findByText("energy 문항 1")).closest("li")!;
        await user.click(
            within(row).getByRole("button", { name: "예" }),
        );
        expect(
            within(row).getByRole("button", { name: "예" }),
        ).toHaveClass("on");
        await user.click(within(row).getByRole("button", { name: "아니오" }));
        expect(within(row).getByRole("button", { name: "아니오" })).toHaveClass(
            "on",
        );
        expect(
            within(row).getByRole("button", { name: "예" }),
        ).not.toHaveClass("on");
        const questions = client.getQueryData<QUESTION.ITEM[][]>([
            "question",
            "mbti",
        ])!;
        expect(questions[0].map((item) => item.is)).toEqual([
            false,
            null,
            null,
        ]);
        expect(questions[1].every((item) => item.is === null)).toBe(true);
    });

    it("MBTI 유형에 맞는 하위유형 문항을 불러오고 답변을 변경한다", async () => {
        useQuestionMbtiStore.setState({ mbti: "estj" });
        const { user, client } = renderFlow();
        const row = (await screen.findByText("하위유형 문항 1")).closest("li")!;
        expect(API_CLIENT_GET_QUESTION_SUB_PROPENSITY).toHaveBeenCalledWith(
            "estj",
        );
        await user.click(within(row).getByRole("button", { name: "아니오" }));
        expect(within(row).getByRole("button", { name: "아니오" })).toHaveClass(
            "on",
        );
        await user.click(
            within(row).getByRole("button", { name: "예" }),
        );
        expect(
            within(row).getByRole("button", { name: "예" }),
        ).toHaveClass("on");
        expect(
            client
                .getQueryData<QUESTION.ITEM[]>(["question", "subPropensity"])!
                .map((item) => item.is),
        ).toEqual([true, null, null, null, null]);
    });
});

describe("MBTI 챕터 이동", () => {
    it("첫 챕터에는 이전 버튼이 없고 미응답 시 다음 이동을 막는다", async () => {
        const { user } = renderFlow();
        const row = (await screen.findByText("energy 문항 1")).closest("li")!;
        expect(
            screen.queryByRole("button", { name: "이전" }),
        ).not.toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "다음" }));
        expect(useQuestionMbtiStore.getState().currentIdx).toBe(0);
        expect(row).toHaveClass("unchecked");
        expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
        await user.click(within(row).getByRole("button", { name: "아니오" }));
        expect(row).not.toHaveClass("unchecked");
    });

    it("다음과 이전으로 이동해도 체크한 답변이 유지된다", async () => {
        const { user } = renderFlow();
        await screen.findByText("energy 문항 1");
        await answerAll(user, "아니오");
        await user.click(screen.getByRole("button", { name: "다음" }));
        expect(await screen.findByText("recognition 문항 1")).toBeVisible();
        await user.click(screen.getByRole("button", { name: "이전" }));
        expect(await screen.findByText("energy 문항 1")).toBeVisible();
        for (const button of screen.getAllByRole("button", { name: "아니오" }))
            expect(button).toHaveClass("on");
        expect(
            screen.queryByRole("button", { name: "이전" }),
        ).not.toBeInTheDocument();
    });

    it.each([
        ["예", "estj"],
        ["아니오", "infp"],
    ] as const)(
        "네 챕터에서 %s를 선택하면 %s 하위유형 테스트로 전환한다",
        async (answer, mbti) => {
            const { user } = renderFlow();
            for (const type of ["energy", "recognition", "judgment", "life"]) {
                await screen.findByText(`${type} 문항 1`);
                await answerAll(user, answer);
                await user.click(screen.getByRole("button", { name: "다음" }));
            }
            expect(await screen.findByText("하위유형 문항 1")).toBeVisible();
            expect(useQuestionMbtiStore.getState().mbti).toBe(mbti);
            expect(API_CLIENT_GET_QUESTION_SUB_PROPENSITY).toHaveBeenCalledWith(
                mbti,
            );
            expect(
                screen.queryByRole("button", { name: "다음" }),
            ).not.toBeInTheDocument();
        },
    );
});

describe("테스트 결과 보기와 공유", () => {
    it("하위유형 미응답 시 결과 화면으로 이동하지 않는다", async () => {
        useQuestionMbtiStore.setState({ mbti: "estj" });
        const { user } = renderFlow();
        const row = (await screen.findByText("하위유형 문항 1")).closest("li")!;
        await user.click(screen.getByRole("button", { name: "결과 보기" }));
        expect(row).toHaveClass("unchecked");
        expect(screen.queryByLabelText("결과 주소")).not.toBeInTheDocument();
        expect(API_CLIENT_GET_RESULT_MBTI).not.toHaveBeenCalled();
    });

    it.each([
        ["예", "?sub=social", "social"],
        ["아니오", "", null],
    ] as const)(
        "하위유형에 %s로 응답하면 결과 주소와 조회 데이터를 표시한다",
        async (answer, search, sub) => {
            useQuestionMbtiStore.setState({ mbti: "estj" });
            const { user } = renderFlow();
            await screen.findByText("하위유형 문항 1");
            await answerAll(user, answer);
            await user.click(screen.getByRole("button", { name: "결과 보기" }));
            expect(await screen.findByLabelText("결과 주소")).toHaveTextContent(
                `/result/estj${search}`,
            );
            expect(await screen.findByText("현실적인 리더")).toBeVisible();
            expect(screen.getByText("책임감이 강하다")).toBeVisible();
            expect(screen.getByText("교류를 즐긴다")).toBeVisible();
            expect(API_CLIENT_GET_RESULT_MBTI).toHaveBeenCalledWith(
                "estj",
                sub,
            );
        },
    );

    it("결과 URL의 유형과 하위유형으로 조회한다", async () => {
        renderFlow("/result/estj?sub=social-expressive");
        expect(await screen.findByText("현실적인 리더")).toBeVisible();
        expect(API_CLIENT_GET_RESULT_MBTI).toHaveBeenCalledWith(
            "estj",
            "social-expressive",
        );
    });

    it("카카오 공유에 유형, 설명, 이미지, 현재 URL을 전달한다", async () => {
        const sendDefault = vi.fn();
        vi.stubGlobal("Kakao", { Share: { sendDefault } });
        const { user } = renderFlow("/result/estj?sub=social");
        await screen.findByText("현실적인 리더");
        await user.click(screen.getByRole("button", { name: "결과 공유하기" }));
        expect(sendDefault).toHaveBeenCalledExactlyOnceWith({
            objectType: "feed",
            content: {
                title: "MBTI 테스트 결과 : estj",
                description: "현실적인 리더",
                imageUrl: expect.stringMatching(
                    new RegExp(
                        `^${window.location.origin}/mbti/estj\\.webp\\?v=`,
                    ),
                ),
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        });
        vi.unstubAllGlobals();
    });

    it("결과를 불러오기 전에는 공유 요청을 보내지 않는다", async () => {
        vi.mocked(API_CLIENT_GET_RESULT_MBTI).mockReturnValue(
            new Promise(() => {}),
        );
        const sendDefault = vi.fn();
        vi.stubGlobal("Kakao", { Share: { sendDefault } });
        const { user } = renderFlow("/result/estj");
        await user.click(screen.getByRole("button", { name: "결과 공유하기" }));
        await waitFor(() =>
            expect(API_CLIENT_GET_RESULT_MBTI).toHaveBeenCalled(),
        );
        expect(sendDefault).not.toHaveBeenCalled();
        vi.unstubAllGlobals();
    });
});
