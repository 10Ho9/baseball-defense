# Baseball Defense Trainer 프로젝트 시작 요약

> 이 문서는 초기 킥오프 메모를 보관하는 요약본입니다. 현재 운영 기준은 `docs/defense-scenario-curriculum.md`, `docs/scenario-data-model.md`, `AGENTS.md`, `RULES.md`입니다.

## 당시 출발점

- 독일어로 야구 수비 상황을 학습하는 모바일 퍼스트 웹앱
- 9명 수비수 전체 움직임과 공의 흐름을 애니메이션으로 보여주는 구조
- 특정 포지션을 눌렀을 때 자기 역할만 깊게 보는 학습 방식
- 퀴즈와 질문 응답으로 수동 열람이 아니라 능동 학습을 만드는 방향

## 현재 기준으로 해석할 내용

- 당시 MVP 가정이었던 `상황 5~6개`는 현재 코드 기준 `11개 구현`으로 확장되었습니다.
- 이후 기획이 확장되면서 시나리오 정본은 `36개 커리큘럼`으로 고정되었습니다.
- 데이터 구조는 이 문서의 초기 예시 타입이 아니라 `docs/scenario-data-model.md`와 `src/features/scenarios/data/types.ts`를 따라야 합니다.
- 실제 시나리오 데이터는 `scenarios.ts` 진입점과 `scenarioDetails/*.ts` 카테고리 파일로 관리합니다.
- 전술 판단의 원문은 `docs/defense-scenario-curriculum.md`와 `docs/defense-curriculum/*.md`에 있습니다.

## 지금도 유효한 핵심 원칙

- 실제 수비 로직과 정답 판정은 앱 내부 데이터가 기준입니다.
- LLM은 설명과 질문 응답을 돕는 역할로만 사용합니다.
- 애니메이션, 설명, 퀴즈, 코치 응답은 같은 시나리오 데이터에서 파생되어야 합니다.
- 구현은 디자인보다 먼저 `상황 정의`, `팀 콜`, `커버`, `백업`을 고정하는 편이 안전합니다.

## 지금 읽을 문서

1. `docs/defense-scenario-curriculum.md`
2. `docs/defense-curriculum/*.md`
3. `docs/scenario-data-model.md`
4. `docs/mobile-mvp.md`
5. `docs/roadmap.md`

## 메모

이 문서는 프로젝트의 출발 의도를 남기는 역할까지만 합니다.
현재 의사결정이나 구현 기준을 고를 때는 이 문서보다 최신 정본 문서를 우선합니다.
