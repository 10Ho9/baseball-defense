# 상황 데이터 모델

## 문서 목적

이 문서는 `src/features/scenarios/data/types.ts`, `src/features/scenarios/data/scenarios.ts`, `src/features/scenarios/data/scenarioDetails/*.ts`를 사람이 읽기 쉽게 설명한 구현 기준 문서입니다.
전술 정본은 `docs/defense-scenario-curriculum.md`와 각 카테고리 문서에 있고, 이 문서는 그 내용을 데이터로 옮기는 규칙을 정의합니다.

## 소스 오브 트루스 순서

1. `docs/defense-scenario-curriculum.md`
2. `docs/defense-curriculum/*.md`
3. `docs/field-layout-reference.md`와 `docs/defense-curriculum/*-layout.md`
4. `src/features/scenarios/data/types.ts`
5. `src/features/scenarios/data/scenarios.ts`, `src/features/scenarios/data/scenarioDetails/*.ts`
6. 화면/코치/퀴즈 관련 파생 문서

## 시나리오 작성 흐름

1. 커리큘럼 문서에서 시나리오 ID와 카테고리를 고정합니다.
2. 카테고리 문서에서 팀 콜, Primary Out, Fallback, 커버, 백업을 고정합니다.
3. 좌표 문서에서 시작 위치와 이동 경로를 고정합니다.
4. 그 결과를 `ScenarioDetail` 구조로 옮기고 해당 카테고리 파일에 배치합니다.
5. `scenarios.ts`에서 카테고리 배열을 문서 순서대로 합칩니다.
6. 애니메이션, 퀴즈, acceptance checklist는 같은 시나리오 정의에서 파생합니다.
7. `throwEvents.startMs`는 `BALL`과 송구자 track의 실제 릴리스 좌표 시점과 맞춰 둡니다.

## 핵심 엔티티

- `ScenarioSummary`: 카드 목록과 필터에서 쓰는 최소 정보
- `PositionAssignment`: 포지션별 시작 위치, 첫 스텝, 책임, 송구 우선순위
- `SupportAssignment`: cover와 backup 책임
- `AnimationTimeline`: actor track, phase, throw event
- `QuizPrompt`: 학습 확인 문제
- `AcceptanceChecklistItem`: QA 검증 항목
- `ScenarioDetail`: 앱이 읽는 최종 시나리오 단위

## TypeScript 기준

```ts
export type PositionId =
  | "P"
  | "C"
  | "1B"
  | "2B"
  | "3B"
  | "SS"
  | "LF"
  | "CF"
  | "RF";

export type PlayType =
  | "groundball"
  | "double-play"
  | "bunt"
  | "cutoff"
  | "infield-in"
  | "flyball";

export type FieldPoint = {
  x: number;
  y: number;
};

export type ScenarioSummary = {
  id: string;
  titleDe: string;
  runners: {
    first: boolean;
    second: boolean;
    third: boolean;
  };
  outs: 0 | 1 | 2;
  playType: PlayType;
  ballDirectionDe: string;
};

export type PositionAssignment = {
  position: PositionId;
  labelDe: string;
  start: FieldPoint;
  path: FieldPoint[];
  prePitchAlignmentDe: string;
  firstStepDe: string;
  primaryResponsibilityDe: string;
  secondaryResponsibilityDe?: string;
  throwPriority: string[];
  commonMistakeDe?: string;
  communicationCueDe?: string;
};

export type SupportAssignment = {
  position: PositionId;
  targetDe: string;
  detailDe: string;
};

export type AnimationTimeline = {
  durationMs: number;
  phases: { labelDe: string; startMs: number; endMs: number }[];
  actorTracks: {
    actorId: PositionId | "BALL" | "BATTER" | "BATTER_RUNNER" | "RUNNER_1" | "RUNNER_2" | "RUNNER_3";
    keyframes: Array<FieldPoint & { atMs: number; visible?: boolean }>;
  }[];
  throwEvents: {
    fromActor: string;
    toActor: string;
    startMs: number;
    durationMs: number;
    labelDe: string;
  }[];
};

export type QuizPrompt = {
  id: string;
  type: "move-first" | "throw-first";
  questionDe: string;
  optionsDe: { key: string; textDe: string }[];
  correctAnswerKey: string;
  explanationDe: string;
};

export type AcceptanceChecklistItem = {
  labelDe: string;
  expectedDe: string;
  severity: "blocker" | "major" | "minor";
};

export type ScenarioDetail = {
  summary: ScenarioSummary;
  teamCallDe: string;
  objectiveDe: string;
  primaryOutTarget: string;
  fallbackOutTarget: string;
  positions: PositionAssignment[];
  covers: SupportAssignment[];
  backups: SupportAssignment[];
  animation: AnimationTimeline;
  quiz: QuizPrompt[];
  acceptanceChecklist: AcceptanceChecklistItem[];
};
```

## JSON 예시

```json
{
  "summary": {
    "id": "runner-on-first-bunt-third-base-side",
    "titleDe": "Laeufer auf 1B, Bunt zur 3B-Seite",
    "runners": {
      "first": true,
      "second": false,
      "third": false
    },
    "outs": 1,
    "playType": "bunt",
    "ballDirectionDe": "Bunt zur 3B-Seite"
  },
  "teamCallDe": "3B attackiert, P deckt 1B, SS schliesst 3B",
  "objectiveDe": "Das Team trainiert die feste Bunt-Rotation auf der linken Seite.",
  "primaryOutTarget": "Aus an 1B",
  "fallbackOutTarget": "Force an 2B nur bei klar offenem Fenster",
  "positions": [
    {
      "position": "3B",
      "labelDe": "3B",
      "start": { "x": 33.5, "y": 64.16 },
      "path": [{ "x": 29, "y": 73 }],
      "prePitchAlignmentDe": "Corners in",
      "firstStepDe": "Explosiv nach vorn auf den Buntball",
      "primaryResponsibilityDe": "Den Bunt angreifen und das sichere Aus an 1B einleiten",
      "secondaryResponsibilityDe": "Nur bei klar offenem Fenster an 2B umschalten",
      "throwPriority": ["1B", "2B"]
    }
  ],
  "covers": [
    {
      "position": "SS",
      "targetDe": "3B",
      "detailDe": "Schliesst die freie Base hinter dem chargenden 3B"
    }
  ],
  "backups": [
    {
      "position": "RF",
      "targetDe": "1B-Linie",
      "detailDe": "Sichert den Wurf an 1B"
    }
  ],
  "animation": {
    "durationMs": 4800,
    "phases": [
      { "labelDe": "Antritt", "startMs": 0, "endMs": 1400 }
    ],
    "actorTracks": [],
    "throwEvents": []
  },
  "quiz": [
    {
      "id": "bunt-rotation",
      "type": "move-first",
      "questionDe": "Wer schliesst in diesem Team-Call die 3B?",
      "optionsDe": [
        { "key": "A", "textDe": "SS" }
      ],
      "correctAnswerKey": "A",
      "explanationDe": "Der SS ersetzt den chargenden 3B."
    }
  ],
  "acceptanceChecklist": [
    {
      "labelDe": "Cover",
      "expectedDe": "SS deckt 3B",
      "severity": "blocker"
    }
  ]
}
```

## 데이터 불변 규칙

- 한 시나리오는 하나의 `teamCallDe`, 하나의 `primaryOutTarget`, 하나의 `fallbackOutTarget`을 가집니다.
- `positions`는 항상 9명 수비수를 모두 포함합니다.
- `covers`와 `backups`는 문장으로 명시된 책임이 있어야 합니다.
- 문서상 실제로 움직이는 support 역할은 `covers` 또는 `backups` 배열에도 빠짐없이 들어가야 합니다.
- 반복되는 커버/백업 좌표나 역할 문구는 shared helper로 재사용할 수 있지만, 최종 시나리오 데이터에는 누가 어디를 맡는지가 명시적으로 남아 있어야 합니다.
- `animation`, `quiz`, `acceptanceChecklist`는 전술 문서와 다른 정답을 만들면 안 됩니다.
- `*-layout.md`에 `Move 1`, `Move 2 / Hold`가 있으면 `positions.path`와 `animation.actorTracks`에도 같은 중간 노드가 살아 있어야 합니다.
- `throwEvents`의 종료 시점과 `BALL` 트랙의 도착 시점은 사실상 일치해야 합니다.
- `SS 또는 2B`, `CF 또는 RF`처럼 책임자가 열려 있는 표현은 데이터에 들어가기 전에 문서에서 먼저 고정해야 합니다.
- 같은 게임 상태라도 팀 콜이 다르면 시나리오를 분리합니다.
- 카테고리별 상세 구현은 `scenarioDetails/*.ts`에 두고, `scenarios.ts`는 정렬과 진입점 역할만 유지합니다.

## LLM 연결 규칙

LLM에게는 아래 정보만 전달합니다.

- 현재 선택된 시나리오 ID
- 현재 선택된 포지션
- 해당 시나리오의 책임, throw priority, cover, backup
- 사용자의 질문
- 필요하면 최근 퀴즈 결과나 현재 탭 정도의 최소 UI 상태

LLM에게 맡기지 않는 것:

- 실제 정답 생성
- 수비 위치 계산
- 퀴즈 정답 판정
- 문서 정본을 덮어쓰는 임의 전술 판단

## 추천 파일 배치

```text
src/
  features/
    scenarios/
      data/
        categoryRegistry.ts
        categoryTypes.ts
        fieldCoordinates.ts
        fieldLayout.ts
        registry.ts
        scenarioDetails/
          basicInfieldRoutines.ts
          buntsAndSqueezes.ts
          forceAndDoublePlays.ts
          outfieldHitsCutoffsRelays.ts
          priorityAndFoulPops.ts
          runPreventionAndTagUps.ts
          shared.ts
          specialDefenses.ts
          index.ts
        scenarios.ts
        schema.ts
        types.ts
    animation/
    coach/
    quiz/
  screens/
functions/
  src/
```
