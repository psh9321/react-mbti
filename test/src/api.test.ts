import { beforeEach, describe, expect, it, vi } from "vitest";
import { CLIENT_API } from "@/shared/api/instance";
import { API_CLIENT_GET_QUESTION_MBTI } from "@/entities/question/mbti/api/api.question.mbti";
import { API_CLIENT_GET_QUESTION_SUB_PROPENSITY } from "@/entities/question/sub/api/api.question.sub.propensity";
import { API_CLIENT_GET_RESULT_MBTI } from "@/entities/result/api/api.result";

vi.mock("@/shared/api/instance", () => ({ CLIENT_API: { get: vi.fn() } }));

const json = vi.fn();

beforeEach(() => {
    json.mockReset();
    vi.mocked(CLIENT_API.get).mockReturnValue({ json } as unknown as ReturnType<
        typeof CLIENT_API.get
    >);
});

describe("클라이언트 API", () => {
    it("MBTI 문항 응답에서 data를 반환한다", async () => {
        const data = [
            [{ type: "energy", contents: "사람들과 어울리나요?", is: null }],
        ];
        json.mockResolvedValue({ resultCode: 200, data, errMsg: "" });
        await expect(API_CLIENT_GET_QUESTION_MBTI()).resolves.toEqual(data);
        expect(CLIENT_API.get).toHaveBeenCalledWith("question/mbti");
    });

    it("선택한 MBTI 유형의 하위유형 문항을 요청한다", async () => {
        const data = [
            { type: "social", contents: "모임을 좋아하나요?", is: null },
        ];
        json.mockResolvedValue({ resultCode: 200, data, errMsg: "" });
        await expect(
            API_CLIENT_GET_QUESTION_SUB_PROPENSITY("infp"),
        ).resolves.toEqual(data);
        expect(CLIENT_API.get).toHaveBeenCalledWith("question/sub/infp");
    });

    it("유형과 하위유형 쿼리로 결과를 요청한다", async () => {
        const data = { mbtiInfo: { type: "estj" }, subPropensityInfo: [] };
        json.mockResolvedValue({ resultCode: 200, data, errMsg: "" });
        await expect(
            API_CLIENT_GET_RESULT_MBTI("estj", "social-expressive"),
        ).resolves.toEqual(data);
        expect(CLIENT_API.get).toHaveBeenCalledWith("result/mbti/estj", {
            searchParams: { sub: "social-expressive" },
        });
    });

    it.each([
        ["MBTI 문항", () => API_CLIENT_GET_QUESTION_MBTI()],
        ["하위유형 문항", () => API_CLIENT_GET_QUESTION_SUB_PROPENSITY("infp")],
        ["결과", () => API_CLIENT_GET_RESULT_MBTI("estj", "")],
    ] as const)("%s 요청 실패를 호출자에게 전달한다", async (_, request) => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        const error = new Error("네트워크 오류");
        json.mockRejectedValue(error);
        await expect(request()).rejects.toBe(error);
    });
});
