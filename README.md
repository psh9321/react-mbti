# MBTI + 성격 하위 유형 검사 
https://mbti.psh9321.cloud/

## 클라이언트 테스트

테스트는 루트의 `test/src`에 있습니다. Vitest와 React Testing Library로 실제 컴포넌트와 훅을 검증하며, API 응답과 카카오 SDK는 모킹합니다.

```sh
pnpm test:client # 클라이언트 테스트 실행
pnpm test       # 전체 테스트 실행
pnpm test:watch # 변경 시 자동 실행
```

문항 조회 및 요청 실패, MBTI·하위유형 답변 선택과 변경, 미응답 이동 차단, 챕터 이동과 답변 유지, MBTI 계산 및 하위유형 전환, 결과 조회와 카카오 공유 요청을 검증합니다. 실제 서버 연결과 카카오 공유 창은 검증 범위에 포함되지 않습니다.

## 서버 API 테스트

테스트는 `test/server`에 있으며, 파일명은 `QuestionApi.test.ts`처럼 PascalCase + camelCase 조합을 사용합니다. Hono 라우터에 직접 요청을 보내 실제 데이터와 JSON 응답을 검증합니다.

```sh
pnpm test:server # 서버 API 테스트 실행
pnpm test        # 클라이언트 + 서버 전체 테스트 실행
```

MBTI 지표별 15개 문항과 초기 답변 상태, 16개 MBTI 유형별 외향·내향 하위 문항, 유형별 결과, 하위 유형 쿼리의 선택·중복·잘못된 값 처리를 검증합니다. 테스트 실행 중 서버 포트를 열지 않습니다.

## 주요 기술 스택
 - React + Vite 
 - TypeScript
 - React Query
 - Zustand
 - Hono
 - Ky
 - Tailwind CSS

## FSD 디자인 패턴 적용
 - app : 애플리케이션 초기화 및 전역 설정
 - entities : API 도메인 별 최소 단위 UI 및 API, hook, zustand store 모음
 - features : 기능이 들어간 컴포넌트 UI
 - script : 외부 스크립트
 - shared : 전역으로 사용되는 ui, 유틸 기능 등등
 - views : 페이지 컴포넌트
 - widgets : 페이지를 구성하는 조립 단위 UI

## Client <=> Hono API Router 통신 구조
 - React 빌드 결과물을 Hono 서버에서 정적 파일로 서빙
 - Client와 Hono API Router 간 통신 구조 구성

## 주요 기능 

### MBTI, 성격 하위 유형 테스트 
 - E/I, S/N, T/F, J/P 네 가지 지표 기반 문항 제공
 - MBTI 결과에 따른 세부 성향 문항 제공
 - 미응답 문항이 있을 경우 해당 위치로 자동 스크롤

### 테스트 결과 
 - MBTI 타입별 결과 조회
 - 하위 성향 결과 조회
 - 결과 공유 기능 제공
 - indexedDB에 테스트결과 저장

### 최근에 테스트한 결과 제공
 - 테스트 완료시 결과를 저장하고 index 페이지에서 제공

## 기능 테스트

### 실행 커멘트
 - 테스트 전체 실행 : pnpm test
 - 클라이언트 테스트 : pnpm test-client
 - 서버 테스트 : pnpm test-server

### 테스트 항목
 - src : MBTI 테스트 문항, 하위 유형 테스트 문항 API 테스트, 테스트 문항 불러오기 및 체크, 테스트 챕터 이동, 결과보기 및 공유 테스트
 - server : MBTI 테스트 문항, 하위 유형 테스트 문항 API 테스트, 테스트 결과 API 테스트