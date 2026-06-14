# MBTI + 성격 하위 유형 검사 

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

## Client <=> Hono API Router 통신 구조 설계

## 주요 기능 

### MBTI, 성격 하위 유형 테스트 
 - E/I, S/N, T/F, J/P 네 가지 지표 기반 문항 제공
 - MBTI 결과에 따른 세부 성향 문항 제공
 - 미응답 문항이 있을 경우 해당 위치로 자동 스크롤

### 테스트 결과 
 - MBTI 타입별 결과 조회
 - 하위 성향 결과 조회
 - 결과 공유 기능 제공