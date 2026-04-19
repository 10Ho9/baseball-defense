# 04. 득점 저지/태그업

이 문서는 `득점 저지/태그업` 카테고리의 원본 문서입니다.

- 수정이 필요하면 이 문서를 먼저 고칩니다.
- 좌표 구현 원문은 [04-run-prevention-and-tag-ups-layout.md](./04-run-prevention-and-tag-ups-layout.md)를 함께 봅니다.
- 이 카테고리의 시나리오는 총 `4개`입니다.
- 핵심 목표는 `Home 우선 판단`, `플레이트 백업`, `태그업 송구 판단`, `no-play 전환`을 팀 공통 언어로 고정하는 것입니다.

## 시나리오

### 19. `runner-on-third-infield-in-grounder`

- 상황: 3루 주자, 인필드 인 땅볼
- 팀 콜: 2B가 타구를 처리해 Home을 먼저 보고, 닫히면 즉시 1루로 전환한다.
- Primary Out: `Home`
- Fallback: `1B`
- 핵심 움직임:
  - `2B`는 포구 후 시선을 먼저 Home으로 준다.
  - `C`는 조기 타깃과 태그 창을 만든다.
  - `P`는 홈 뒤 백업을 돈다.
- 백업/정렬:
  - `LF`는 좌측 홈 라인 뒤를 짧게 잡아 pull-throw를 정리한다.
  - `RF`는 우측 홈 라인과 1루 쪽 fallback 라인을 정리한다.
  - `CF`는 정중앙으로 얕게 들어와 플레이트 뒤 큰 리바운드의 최종 백업이 된다.
- 흔한 실수:
  - Home 확인이 늦어 둘 다 늦는 것

### 20. `bases-loaded-infield-in`

- 상황: 만루, 인필드 인
- 팀 콜: Home 포스를 절대 놓치지 않고, 필요하면 거기서 끝낸다.
- Primary Out: `Home`
- Fallback: `Home만 확보`
- 핵심 움직임:
  - `Middle`은 굴절 타구까지 포함해 Home 우선 구조를 유지한다.
  - `C`는 플레이트 포스를 안정적으로 처리한다.
  - `Corners`는 번트와 느린 타구까지 읽는다.
- 백업/정렬:
  - `P`는 플레이트 뒤를 깊지 않게 잡아 Home 포스 이탈구의 첫 백업을 맡는다.
  - `LF`와 `RF`는 각각 좌우 홈 라인을 짧게 잡아 Home 방향 악송구를 양쪽에서 받친다.
  - `CF`는 정중앙으로 얕게 들어와 홈 뒤 큰 리바운드와 다음 주자 진루를 동시에 관리한다.
- 흔한 실수:
  - 2아웃 욕심 때문에 Home 포스가 흔들리는 것

### 21. `runner-on-third-shallow-left-fly-home-throw`

- 상황: 3루 주자, 1사 미만, 얕은 LF 플라이
- 팀 콜: 확실한 캐치 후 강한 Home 송구를 준비한다.
- Primary Out: `Home after catch`
- Fallback: `태그업 억제 및 추가 진루 차단`
- 핵심 움직임:
  - `LF`는 캐치 우선 후 빠른 스텝 교환으로 송구한다.
  - `C`는 태그 라인을 준비한다.
  - `P`는 Home 뒤 백업을 돈다.
  - `SS`는 no-play일 때 공을 끊어 주는 고정 cutoff 역할을 준비한다.
- 백업/정렬:
  - `CF`는 좌중간에서 LF 뒤를 받쳐 catch miss와 긴 리바운드를 정리한다.
  - `RF`는 중간 쪽으로 안쪽 이동해 Home 송구가 지나가거나 cut에서 빠질 때 2차 정리수가 된다.
  - `3B`는 베이스를 지키며 태그업 억제와 귀루 플레이를 동시에 준비한다.
- 흔한 실수:
  - 송구 욕심 때문에 캐치를 불안하게 만드는 것

### 22. `runner-on-third-medium-center-fly-cutoff-home`

- 상황: 3루 주자, 1사 미만, 중간 깊이 CF 플라이
- 팀 콜: CF가 캐치 후 SS 컷오프를 통해 Home 승부 여부를 판단하고, 안 되면 태그업 주자만 통제한다.
- Primary Out: `Home if line is clean`
- Fallback: `Cutoff and hold the runner at 3B`
- 핵심 움직임:
  - `CF`는 캐치 후 몸이 흐르지 않는 송구 방향을 만든다.
  - `SS`는 Home 승부와 no-play를 모두 준비하는 고정 cutoff가 된다.
  - `C`는 태그 타이밍을 보며 송구 라인을 맞춘다.
- 백업/정렬:
  - `LF`는 좌중간 쪽으로 안쪽 이동해 cutoff 뒤 왼쪽 리바운드를 정리한다.
  - `RF`는 우중간 쪽으로 안쪽 이동해 Home 송구나 cut miss의 우측 백업을 맡는다.
  - `P`는 플레이트 뒤를 잡고 `3B`는 stop-base를 유지해 no-play 전환을 안정시킨다.
- 흔한 실수:
  - 애매한 거리에서 억지 Home 송구를 하는 것
