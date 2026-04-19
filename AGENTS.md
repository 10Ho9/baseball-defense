# AGENTS.md

## 목적

이 저장소는 독일 취미야구 팀을 위한 수비 학습 앱을 만든다.
에이전트나 협업자가 문서와 코드를 수정할 때는 `무엇이 정본인지`, `어떤 순서로 수정해야 하는지`를 먼저 지켜야 한다.

## 정본 우선순위

1. `docs/defense-scenario-curriculum.md`
2. 관련 카테고리 원문 `docs/defense-curriculum/*.md`
3. 좌표 원문 `docs/field-layout-reference.md`, `docs/defense-curriculum/*-layout.md`
4. 구현 계약 `docs/scenario-data-model.md`, `src/features/scenarios/data/types.ts`
5. 실제 데이터 `src/features/scenarios/data/scenarios.ts`, `src/features/scenarios/data/scenarioDetails/*.ts`
6. 파생 문서 `README.md`, `docs/product-brief.md`, `docs/mobile-mvp.md`, `docs/roadmap.md`
7. 참고 문서 `project-kickoff-summary.md`, `docs/scenario-expansion-playbook.md`

충돌이 나면 항상 위 순서를 따른다.

## 작업 순서

### 전술 판단이 바뀌는 경우

1. `defense-scenario-curriculum.md`에서 시나리오 위치와 정체성을 확인한다.
2. 해당 카테고리 원문에서 팀 콜, Primary Out, Fallback, 커버, 백업을 수정한다.
3. 좌표가 바뀌면 대응하는 `*-layout.md`와 `field-layout-reference.md`를 수정한다.
4. 그다음 `scenario-data-model.md`, `types.ts`, `scenarios.ts`, `scenarioDetails/*.ts`를 수정한다.
5. 마지막에 README, brief, roadmap 같은 파생 문서를 정리한다.

### 좌표만 바뀌는 경우

1. 관련 `*-layout.md` 수정
2. `field-layout-reference.md` 확인
3. `scenarios.ts`, `scenarioDetails/*.ts`, 테스트 동기화

## 시나리오 불변 규칙

- 한 시나리오는 하나의 팀 콜을 가진다.
- 한 시나오는 하나의 Primary Out과 하나의 Fallback을 가진다.
- 같은 게임 상태라도 팀 콜이 다르면 시나리오를 분리한다.
- `SS 또는 2B`, `CF 또는 RF`처럼 책임자가 열려 있는 표현은 데이터에 넣지 않는다.
- 문서 원문은 한국어로 유지하고, 사용자 노출 문구는 독일어로 파생한다.
- LLM은 설명 보조 역할만 하며 정답을 새로 만들지 않는다.

## 현재 상태

- 코드에 구현된 시나리오는 11개다.
- 정본 커리큘럼은 36개다.
- 구현되지 않은 시나리오를 이미 앱에 들어 있는 것처럼 문서에 적지 않는다.

## 점검

- 코드 변경이 있으면 `npm test`를 우선 실행한다.
- 배포 전 검증이 필요하면 `npm build`까지 확인한다.
