# 팀 수비 학습용 36개 시나리오 원본문서

## 문서 성격

이 문서는 이 프로젝트의 `수비 시나리오 원본 문서`입니다.

- 앞으로 추가/수정되는 시나리오는 이 문서를 먼저 고칩니다.
- 앱 데이터는 이 문서를 기준으로 `src/features/scenarios/data/scenarios.ts` 진입점과 `src/features/scenarios/data/scenarioDetails/*.ts`에 옮깁니다.
- 좌표 이동과 경로는 [field-layout-reference.md](/Users/ho9/develop/baseball/docs/field-layout-reference.md)와 카테고리별 `*-layout.md` 문서를 함께 기준으로 삼습니다.
- 기존의 `짧은 복습용` 관점은 이 문서에서 더 이상 사용하지 않습니다.
- 이 앱은 팀원들이 수비를 `체계적으로 학습하는 도구`라는 전제로 설계합니다.

권장 운영 원칙:

- 이 문서의 시나리오 ID가 정본입니다.
- 한국어 설명이 원본이고, 독일어 제목/본문은 구현 단계에서 파생합니다.
- 같은 게임 상태라도 `팀 콜`이 다르면 별도 시나리오로 분리합니다.
- 한 시나리오에는 반드시 `Primary Out`과 `Fallback`이 있어야 합니다.

## 왜 36개인가

내야/외야 수비코치와 나눠 본 결과, `20개`는 입문용으로는 가능하지만 팀 학습용 원본 문서로는 부족했습니다. 반대로 `40개 이상`으로 바로 가면 구현과 학습 둘 다 퍼집니다. 그래서 이 문서는 `36개`를 1차 완성 커리큘럼으로 고정합니다.

코치 협의 요약:

- 내야 코치 관점: `24개 전후`의 인필드-heavy 시나리오가 있어야 팀 콜과 베이스 커버가 흔들리지 않습니다.
- 외야/특수수비 코치 관점: 좌우 대칭 priority, cutoff/relay, tag-up, foul pop, 1·3루, rundown 같은 `커뮤니케이션형 장면`도 반드시 포함돼야 합니다.
- 최종 판단: 순수한 내야/외야 숫자를 기계적으로 반반 나누기보다, `팀 전체 수비 언어를 만드는 장면`을 우선해 36개를 고정합니다.

그래서 이 문서는 아래 균형을 목표로 합니다.

- 기본 내야 루틴: `6`
- 포스/병살: `6`
- 번트/스퀴즈: `6`
- 득점 저지 및 태그업: `4`
- 외야 안타/컷오프/중계: `6`
- 플라이 우선권/파울팝: `4`
- 특수 수비/컨트롤 플레이: `4`

이 36개면 팀원들이 실제 경기에서 반복적으로 마주치는 중요한 수비 판단을 넓고 선명하게 배울 수 있습니다.

## 구현 매핑 규칙

각 시나리오는 최종적으로 아래 데이터로 옮겨집니다.

- `summary.id`
- `summary.titleDe`
- `runners`
- `outs`
- `playType`
- `teamCallDe`
- `objectiveDe`
- `primaryOutTarget`
- `fallbackOutTarget`
- `positions`
- `covers`
- `backups`
- `animation`
- `quiz`
- `acceptanceChecklist`

개발 시 주의:

- 각 카테고리 문서의 `핵심 움직임`은 `positions`, `covers`, `backups`의 근거가 됩니다.
- 각 카테고리의 `*-layout.md`는 `start`, `path`, `backups`, `actorTracks`의 좌표 원본입니다.
- 각 카테고리 문서의 `흔한 실수`는 `commonMistakeDe`와 퀴즈 오답 설계의 근거가 됩니다.
- 각 카테고리 문서의 `팀 콜`과 `Primary/Fallback`은 시나리오 정체성이므로 구현 단계에서 바꾸지 않습니다.
- 좌표가 필요한 구현은 `전술 문서만` 보고 추정하지 말고, 반드시 레이아웃 문서와 함께 확인합니다.

## 36개 시나리오 목록

| No | ID | 상태 | 카테고리 | 한국어 제목 |
| --- | --- | --- | --- | --- |
| 01 | `bases-empty-ss-routine-grounder` | 기존 | 기본 내야 루틴 | 주자 없음, SS 루틴 땅볼 |
| 02 | `bases-empty-3b-routine-grounder` | 신규 | 기본 내야 루틴 | 주자 없음, 3B 루틴 땅볼 |
| 03 | `bases-empty-2b-routine-grounder` | 신규 | 기본 내야 루틴 | 주자 없음, 2B 루틴 땅볼 |
| 04 | `bases-empty-1b-routine-grounder` | 신규 | 기본 내야 루틴 | 주자 없음, 1B 정면 루틴 땅볼 |
| 05 | `bases-empty-3b-slow-roller-charge` | 신규 | 기본 내야 루틴 | 주자 없음, 3B 앞 슬로우 롤러 |
| 06 | `bases-empty-1b-slow-roller-p-cover` | 신규 | 기본 내야 루틴 | 주자 없음, 1B 앞 슬로우 롤러와 P 커버 |
| 07 | `runner-on-first-double-play-keystone` | 기존 | 포스/병살 | 1루 주자, 4-6-3 병살 |
| 08 | `runner-on-first-ss-double-play-6-4-3` | 신규 | 포스/병살 | 1루 주자, 6-4-3 병살 |
| 09 | `runner-on-first-3b-double-play-5-4-3` | 신규 | 포스/병살 | 1루 주자, 5-4-3 병살 또는 선행 아웃 |
| 10 | `runner-on-first-1b-double-play-3-6-3` | 신규 | 포스/병살 | 1루 주자, 3-6-3 병살 |
| 11 | `runners-on-first-second-middle-grounder-force-third` | 신규 | 포스/병살 | 1,2루 주자, 가운데 땅볼 3루 포스 |
| 12 | `bases-loaded-middle-grounder-home-to-first` | 신규 | 포스/병살 | 만루, 가운데 땅볼 Home-1B |
| 13 | `runner-on-first-bunt-third-base-side` | 기존 | 번트/스퀴즈 | 1루 주자, 3루 쪽 번트 |
| 14 | `runner-on-first-bunt-first-base-side` | 신규 | 번트/스퀴즈 | 1루 주자, 1루 쪽 번트 |
| 15 | `runners-on-first-second-sac-bunt-third-base-side` | 신규 | 번트/스퀴즈 | 1,2루 주자, 3루 쪽 희생번트 |
| 16 | `runners-on-first-second-sac-bunt-first-base-side` | 신규 | 번트/스퀴즈 | 1,2루 주자, 1루 쪽 희생번트 |
| 17 | `runner-on-third-safety-squeeze-defense` | 신규 | 번트/스퀴즈 | 3루 주자, 세이프티 스퀴즈 수비 |
| 18 | `runner-on-third-suicide-squeeze-wheel-play` | 신규 | 번트/스퀴즈 | 3루 주자, 스퀴즈/휠 플레이 |
| 19 | `runner-on-third-infield-in-grounder` | 기존 | 득점 저지/태그업 | 3루 주자, 인필드 인 땅볼 |
| 20 | `bases-loaded-infield-in` | 신규 | 득점 저지/태그업 | 만루, 인필드 인 |
| 21 | `runner-on-third-shallow-left-fly-home-throw` | 신규 | 득점 저지/태그업 | 3루 주자, 얕은 LF 플라이 태그업 수비 |
| 22 | `runner-on-third-medium-center-fly-cutoff-home` | 신규 | 득점 저지/태그업 | 3루 주자, 중간 깊이 CF 플라이 태그업 수비 |
| 23 | `runner-on-second-left-single-cutoff-home` | 기존 | 외야 안타/컷오프 | 2루 주자, LF 안타 Home 컷오프 |
| 24 | `runner-on-second-center-single-cutoff-home` | 신규 | 외야 안타/컷오프 | 2루 주자, CF 안타 Home 플레이 |
| 25 | `runner-on-second-right-single-cutoff-third-home` | 신규 | 외야 안타/컷오프 | 2루 주자, RF 안타 3루/홈 판단 |
| 26 | `runner-on-first-left-single-first-to-third` | 신규 | 외야 안타/컷오프 | 1루 주자, LF 안타 1루주자 3루 저지 |
| 27 | `runner-on-first-right-single-first-to-third` | 신규 | 외야 안타/컷오프 | 1루 주자, RF 안타 1루주자 3루 저지 |
| 28 | `bases-empty-gap-double-relay-second` | 신규 | 외야 안타/컷오프 | 주자 없음, 갭 2루타 중계로 2루 저지 |
| 29 | `bases-empty-left-center-bloop` | 기존 | 플라이 우선권/파울팝 | 주자 없음, 좌중간 짧은 플라이 |
| 30 | `bases-empty-right-center-bloop` | 신규 | 플라이 우선권/파울팝 | 주자 없음, 우중간 짧은 플라이 |
| 31 | `bases-empty-first-base-foul-pop` | 신규 | 플라이 우선권/파울팝 | 주자 없음, 1루 쪽 파울팝 |
| 32 | `bases-empty-third-base-foul-pop` | 신규 | 플라이 우선권/파울팝 | 주자 없음, 3루 쪽 파울팝 |
| 33 | `runner-on-first-steal-second-cover` | 신규 | 특수 수비 | 1루 주자 도루, 2루 커버 |
| 34 | `runners-on-first-third-hold-defense` | 신규 | 특수 수비 | 1,3루 기본 홀드 수비 |
| 35 | `runners-on-first-third-break-play` | 신규 | 특수 수비 | 1,3루 브레이크 플레이 대응 |
| 36 | `rundown-third-home` | 신규 | 특수 수비 | 3루-홈 런다운 |

## 코치 기준 공통 원칙

- 수비는 공을 잡는 선수만이 아니라 `비는 베이스를 메우는 선수`까지 포함해 학습해야 합니다.
- 송구보다 먼저 봐야 하는 것은 `첫 스텝`입니다.
- 무리한 아웃보다 `확실한 아웃 + 추가 진루 차단`이 항상 우선입니다.
- 좌측/우측 대칭 장면은 둘 다 필요합니다. 방향이 바뀌면 커버와 백업도 바뀌기 때문입니다.

## 카테고리별 원본 문서

36개 시나리오의 상세 원문은 `전술 문서`와 `좌표 문서`를 한 쌍으로 유지합니다.

| Category | Tactical Source | Layout Source |
| --- | --- | --- |
| 기본 내야 루틴 | [01-basic-infield-routines.md](./defense-curriculum/01-basic-infield-routines.md) | [01-basic-infield-routines-layout.md](./defense-curriculum/01-basic-infield-routines-layout.md) |
| 포스/병살 | [02-force-and-double-plays.md](./defense-curriculum/02-force-and-double-plays.md) | [02-force-and-double-plays-layout.md](./defense-curriculum/02-force-and-double-plays-layout.md) |
| 번트/스퀴즈 | [03-bunts-and-squeezes.md](./defense-curriculum/03-bunts-and-squeezes.md) | [03-bunts-and-squeezes-layout.md](./defense-curriculum/03-bunts-and-squeezes-layout.md) |
| 득점 저지/태그업 | [04-run-prevention-and-tag-ups.md](./defense-curriculum/04-run-prevention-and-tag-ups.md) | [04-run-prevention-and-tag-ups-layout.md](./defense-curriculum/04-run-prevention-and-tag-ups-layout.md) |
| 외야 안타/컷오프/중계 | [05-outfield-hits-cutoffs-relays.md](./defense-curriculum/05-outfield-hits-cutoffs-relays.md) | [05-outfield-hits-cutoffs-relays-layout.md](./defense-curriculum/05-outfield-hits-cutoffs-relays-layout.md) |
| 플라이 우선권/파울팝 | [06-priority-and-foul-pops.md](./defense-curriculum/06-priority-and-foul-pops.md) | [06-priority-and-foul-pops-layout.md](./defense-curriculum/06-priority-and-foul-pops-layout.md) |
| 특수 수비 | [07-special-defenses.md](./defense-curriculum/07-special-defenses.md) | [07-special-defenses-layout.md](./defense-curriculum/07-special-defenses-layout.md) |

## 좌표 기반 구현 원칙

- 좌표의 기본 축은 항상 [field-layout-reference.md](/Users/ho9/develop/baseball/docs/field-layout-reference.md)입니다.
- 카테고리 `전술 문서`는 `왜 그렇게 움직이는지`를 정의합니다.
- 카테고리 `좌표 문서`는 `어디서 출발해 어디로 멈추는지`를 정의합니다.
- 구현자는 전술 문서만 보고 좌표를 새로 추정하지 않습니다.
- 좌표 문서를 수정하면 관련 전술 문서의 역할 설명도 함께 확인합니다.

## 카테고리 기반 구현 원칙

- 구현도 카테고리 단위로 진행합니다.
- `Scenario` 데이터에는 이후 `categoryId`, `categoryLabelKo`, `categoryLabelDe`, `categoryOrder`를 붙이는 것이 좋습니다.
- 각 카테고리의 `전술 문서 + 좌표 문서`를 기준으로 `scenarioDetails/*.ts`에 카테고리별로 구현하고, `scenarios.ts`에서 문서 순서대로 합치면 테스트, 리뷰, QA가 쉬워집니다.
- 문서 수정도 항상 `카테고리 문서 -> 좌표 문서 -> 데이터 구현` 순서로 진행합니다.

## 카테고리 기반 UX 원칙

사용자에게는 36개 시나리오를 평면 리스트로 한 번에 보여주지 않는 편이 좋습니다.

- 1단계: 카테고리 선택
- 2단계: 카테고리 안에서 시나리오 선택
- 3단계: 시나리오 상세 학습

권장 이유:

- 처음 보는 팀원이 전체 목록에 압도되지 않습니다.
- 자기 포지션이나 훈련 주제에 맞는 묶음만 선택할 수 있습니다.
- 구현 시에도 카테고리 화면, 시나리오 목록 화면, 상세 화면으로 분리하기 쉽습니다.

상세 학습 단계의 권장 원칙:

- 상세 화면은 긴 세로 스크롤보다 `Ablauf`와 `Position` 중심의 모드 전환이 더 적합합니다.
- 필드는 가능한 한 계속 화면 중심에 두고, 설명을 보기 위해 계속 아래로 내리게 만들지 않습니다.
- `Quiz`, `Coach`는 초기 MVP 핵심 흐름에서 제외하고, `애니메이션 이해 -> 포지션 책임 이해 -> 다음 시나리오 반복`을 우선합니다.

권장 카테고리 노출 순서:

1. 기본 내야 루틴
2. 포스/병살
3. 번트/스퀴즈
4. 득점 저지/태그업
5. 외야 안타/컷오프/중계
6. 플라이 우선권/파울팝
7. 특수 수비

## 개발 우선순위

36개를 한 번에 넣기보다 아래 순서로 확장합니다.

현재 구현 완료 기준:

- 01~07, 13, 19, 23, 29

### 1차 묶음: 현재 구현 11개 + 잔여 좌우/포지션 균형 보강

- 완료: 02 `bases-empty-3b-routine-grounder`
- 완료: 03 `bases-empty-2b-routine-grounder`
- 완료: 06 `bases-empty-1b-slow-roller-p-cover`
- 잔여: 14 `runner-on-first-bunt-first-base-side`
- 잔여: 25 `runner-on-second-right-single-cutoff-third-home`
- 잔여: 30 `bases-empty-right-center-bloop`

### 2차 묶음: 팀 전술의 기본 뼈대 완성

- 08 `runner-on-first-ss-double-play-6-4-3`
- 15 `runners-on-first-second-sac-bunt-third-base-side`
- 20 `bases-loaded-infield-in`
- 24 `runner-on-second-center-single-cutoff-home`
- 31 `bases-empty-first-base-foul-pop`
- 33 `runner-on-first-steal-second-cover`

### 3차 묶음: 복수 주자와 특수 수비 확장

- 나머지 18개 시나리오 순차 추가

## 36개 밖의 1차 확장 후보

코치 협의 과정에서 중요하지만 36개에는 우선순위상 넣지 않은 후보는 아래와 같습니다.

- 투수 정면 컴백커 전용 시나리오
- 홈 앞 약한 타구 전용 시나리오
- 2루 주자 도루 시 3루 커버 전용 시나리오
- 1루-2루 런다운 전용 시나리오
- 좌익선상/우익선상 flare 우선권
- RF 얕은 플라이 태그업 Home 송구 전용 시나리오

이 후보들은 `36개 커리큘럼을 구현한 뒤` 가장 먼저 확장할 수 있는 묶음입니다.

## 기존 문서와의 관계

- 이 문서가 시나리오 커리큘럼의 정본입니다.
- [scenario-expansion-playbook.md](/Users/ho9/develop/baseball/docs/scenario-expansion-playbook.md)는 초기 확장 메모 성격으로 유지하되, 상세 기준은 이 문서를 따릅니다.
- `AGENTS.md`와 `RULES.md`는 이 문서와 카테고리 원문을 협업 규칙으로 요약한 파생 문서입니다.

## 마지막 코치 메모

좋은 수비팀은 많은 플레이를 외운 팀이 아니라, 장면이 바뀌어도 `누가 움직이고 누가 멈춰야 하는지`를 아는 팀입니다.

그래서 이 36개는 단순한 예시 목록이 아니라, 팀 수비를 가르치는 `공통 언어 목록`으로 사용해야 합니다.
