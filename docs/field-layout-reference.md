# Field Layout Reference

이 문서는 현재 앱이 사용하는 `단일 필드 좌표계` 기준의 참조 문서다.
`원본 좌표`와 `렌더 좌표`를 따로 적지 않는다.

## Source of Truth

- 필드 좌표 helper: `src/features/scenarios/data/fieldCoordinates.ts`
- 기본 수비 시작 위치와 베이스 앵커: `src/features/scenarios/data/fieldLayout.ts`
- 실제 시나리오 적용값: `src/features/scenarios/data/scenarios.ts`, `src/features/scenarios/data/scenarioDetails/*.ts`
- 카테고리별 좌표 원문: `docs/defense-curriculum/*-layout.md`

새 좌표를 추가할 때는 반드시 같은 기준을 쓰고, 별도의 렌더 전용 보정은 추가하지 않는다.
전술이 바뀌어서 커버/백업/시작점이 바뀌면 카테고리 원문과 이 문서, 실제 데이터 진입점, 해당 카테고리 상세 파일이 같이 바뀌어야 한다.

## Field Anchors

| Anchor | x | y |
| --- | ---: | ---: |
| Home | 50.00 | 90.12 |
| 1B base | 70.00 | 66.52 |
| 2B base | 50.00 | 42.92 |
| 3B base | 30.00 | 66.52 |
| LF foul anchor | 7.00 | 42.92 |
| RF foul anchor | 93.00 | 42.92 |

## Default Defensive Starts

| Position | x | y |
| --- | ---: | ---: |
| P | 50.00 | 66.52 |
| C | 50.00 | 88.94 |
| 1B | 66.00 | 58.26 |
| 2B | 58.50 | 48.23 |
| 3B | 34.00 | 58.26 |
| SS | 41.50 | 48.23 |
| LF | 24.50 | 36.43 |
| CF | 50.00 | 27.58 |
| RF | 75.50 | 36.43 |

## Scenario Start Overrides

| Scenario | Position | x | y | Note |
| --- | --- | ---: | ---: | --- |
| `runner-on-first-double-play-keystone` | 1B | 67.50 | 63.57 | 러너 홀드 후 더블플레이 복귀 시작점 |
| `runner-on-first-bunt-third-base-side` | 1B | 67.50 | 64.75 | 번트 대응용 corners-in 성향 |
| `runner-on-first-bunt-third-base-side` | 3B | 33.50 | 64.16 | 3루 라인 번트 차지 시작점 |
| `runner-on-second-left-single-cutoff-home` | 3B | 32.00 | 64.75 | 3B hold 우선 컷오프 장면 |
| `runner-on-third-infield-in-grounder` | 2B | 58.00 | 60.62 | infield-in 전진 정렬 |
| `runner-on-third-infield-in-grounder` | 3B | 28.00 | 62.98 | corners-in 전진 정렬 |
| `runner-on-third-infield-in-grounder` | SS | 43.00 | 50.00 | infield-in middle 보강 정렬 |

## Coordinate Authoring Rules

- 이 문서는 `모든 좌표 문서의 공통 기준`입니다.
- 카테고리별 `*-layout.md` 문서는 이 표의 기본 좌표를 출발점으로 사용합니다.
- 어떤 포지션이 표에 없으면 `Default Defensive Starts`를 그대로 씁니다.
- 시나리오별 표기 규칙은 아래 네 가지로 고정합니다.

| Label | Meaning |
| --- | --- |
| `Start` | 프리피치 시작 좌표. override가 없으면 기본 좌표 사용 |
| `Move 1` | 첫 리드와 첫 스텝이 끝나는 지점 |
| `Move 2 / Hold` | 최종 수비 정렬, 베이스 커버, 백업 정지 지점 |
| `Purpose` | 왜 그 좌표로 가는지에 대한 코치 메모 |

- `Move 1`이 비어 있으면 `Start`에서 바로 `Move 2 / Hold`로 간다고 해석합니다.
- `Move 2 / Hold`가 비어 있으면 `Move 1` 좌표가 최종 정지점입니다.
- 좌표는 가능하면 `소수 둘째 자리`로 적고, 실제 구현에서는 `fieldPoint` helper로 동일한 기준을 유지합니다.
- 좌표 문서에서 명시하지 않은 세부 미세조정은 구현에서 하더라도, `수비 판단이 바뀌는 수준`의 이동은 반드시 문서에 먼저 반영합니다.

## Common Working Targets

아래 좌표는 카테고리별 레이아웃 문서에서 반복해서 쓰는 공통 목표점입니다.

| Target | x | y | Usage |
| --- | ---: | ---: | --- |
| 1B bag target | 69.00 | 63.00 | 1루 마무리, P cover, 1B bag hold |
| 2B cover target | 50.50 | 44.50 | 도루 커버, pivot, center stop |
| 3B bag target | 31.00 | 63.00 | 3루 hold, bunt rotation, stop-base |
| Home receive target | 50.00 | 86.50 | Home force/tag receive |
| 1B foul backup | 82.00 | 68.00 | P/RF 1루선 오버스로우 백업 |
| 3B line backup | 18.00 | 68.00 | LF 3루선 오버스로우 백업 |
| Left home-line backup | 39.00 | 84.00 | LF 쪽 홈 라인 백업 |
| Right home-line backup | 61.00 | 84.00 | RF 쪽 홈 라인 백업 |
| Left-center pinch | 44.00 | 30.50 | CF/LF 좌중간 압축 |
| Right-center pinch | 56.00 | 30.50 | CF/RF 우중간 압축 |
| Shallow center stop | 50.00 | 34.50 | 태그업, 홈 백업, 특수 수비 얕은 중앙 정렬 |
| 2B deep backup | 50.00 | 36.00 | 병살/도루/번트 전환 시 2루 뒤 안전판 |

## Notes

- 외야 기본 정렬은 펜스에 붙지 않는 일반 수비 깊이를 기준으로 둔다.
- 외야 백업 위치는 시작 위치와 다르며, 시나리오별 `path`와 `actorTracks`에서 따로 검증한다.
- 투수 시작 위치는 현재 `네 베이스 중심축` 기준으로 맞춰져 있다.
- 각 카테고리마다 대응하는 `*-layout.md`가 있고, 좌표 변경 시 해당 문서와 실제 시나리오 데이터를 함께 수정한다.
