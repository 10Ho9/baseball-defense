# Baseball Defense Trainer

독일 취미야구 팀을 위한 모바일 퍼스트 수비 학습 앱입니다.
현재 코드에는 첫 6개 카테고리에 걸쳐 총 11개 시나리오가 구현되어 있고, 문서 정본 기준으로는 36개 팀 수비 커리큘럼을 확장 대상으로 고정합니다.

## 정본 문서 순서

1. [팀 수비 학습용 36개 시나리오 원본문서](./docs/defense-scenario-curriculum.md)
2. [카테고리별 시나리오 원문](./docs/defense-curriculum/)
3. [필드 좌표 기준](./docs/field-layout-reference.md) 및 카테고리별 `*-layout.md`
4. [상황 데이터 모델](./docs/scenario-data-model.md)과 `src/features/scenarios/data/types.ts`
5. [제품 개요](./docs/product-brief.md), [모바일 MVP 구조](./docs/mobile-mvp.md), [구현 로드맵](./docs/roadmap.md)
6. [프로젝트 시작 요약](./project-kickoff-summary.md), [시나리오 확장 플레이북](./docs/scenario-expansion-playbook.md)
7. `AGENTS.md`, `RULES.md`

## 문서 수정 순서

- 시나리오 판단이 바뀌면 먼저 `defense-scenario-curriculum.md`와 해당 카테고리 원문을 수정합니다.
- 좌표가 바뀌면 `field-layout-reference.md` 또는 해당 `*-layout.md`를 함께 수정합니다.
- 그다음 `scenario-data-model.md`와 실제 데이터 `src/features/scenarios/data/scenarios.ts`를 맞춥니다.
- 마지막에 `product-brief`, `mobile-mvp`, `roadmap`, `README` 같은 파생 문서를 정리합니다.

## 현재 구현 상태

- 구현됨: 기본 내야 루틴 6개 `bases-empty-ss-routine-grounder`, `bases-empty-3b-routine-grounder`, `bases-empty-2b-routine-grounder`, `bases-empty-1b-routine-grounder`, `bases-empty-3b-slow-roller-charge`, `bases-empty-1b-slow-roller-p-cover`
- 추가 구현됨: `runner-on-first-double-play-keystone`, `runner-on-first-bunt-third-base-side`, `runner-on-second-left-single-cutoff-home`, `runner-on-third-infield-in-grounder`, `bases-empty-left-center-bloop`
- 정본 커리큘럼: 36개 시나리오
- 사용자 노출 언어: 독일어 기본, 핵심 야구 용어는 영어 표기를 유지할 수 있음
- 문서 원문 언어: 한국어, 구현용 독일어 문구는 여기서 파생
- 현재 UX 방향: `카테고리 -> 시나리오 -> Ablauf / Position`
- 초기 MVP 제외: `Quiz`, `Coach`

## 현재 UI 흐름

- 홈 `/`
  - `Defensivfokus wählen.` 헤더 아래에 6개 카테고리를 `2 x 3` 텍스트 카드 보드로 노출합니다.
  - 카테고리 제목은 `Infield`, `Double Play`, `Play at the Plate`처럼 영어 야구 용어를 사용할 수 있습니다.
  - 카드 보조 설명은 독일어로 제공합니다.
  - 최근 학습 재진입 영역은 현재 MVP 홈에서 제거했습니다.
- 카테고리 `/k/:categoryId`
  - 구현된 시나리오만 카드로 보여주고, 빈 카테고리는 홈에 노출하지 않습니다.
- 상세 `/s/:scenarioId`
  - 진입 즉시 가장 중요한 애니메이션 필드 영역으로 포커스를 이동합니다.
  - 필드 안에는 경기 상태 HUD가 들어가고, 하단에는 재생/진행 상태와 포지션 선택이 이어집니다.
  - 상세 학습은 `Ablauf`와 `Position` 두 모드만 노출합니다.

## 가장 중요한 원칙

- 앱의 정답은 항상 문서와 데이터에 있고, LLM은 설명 보조 역할만 합니다.
- 한 시나리오는 하나의 팀 콜, 하나의 Primary Out, 하나의 Fallback을 가집니다.
- 같은 게임 상태라도 팀 콜이 다르면 별도 시나리오로 분리합니다.
- 구현 문서가 충돌하면 정본은 `docs/defense-scenario-curriculum.md`와 해당 카테고리 원문입니다.
