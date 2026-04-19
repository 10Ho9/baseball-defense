# 05. 외야 안타/컷오프/중계

이 문서는 `외야 안타/컷오프/중계` 카테고리의 원본 문서입니다.

- 수정이 필요하면 이 문서를 먼저 고칩니다.
- 좌표 구현 원문은 [05-outfield-hits-cutoffs-relays-layout.md](./05-outfield-hits-cutoffs-relays-layout.md)를 함께 봅니다.
- 이 카테고리의 시나리오는 총 `6개`입니다.
- 핵심 목표는 `처리 외야수의 정면 포구`, `cutoff 깊이`, `반대편 외야 백업`, `stop-base 유지`를 팀 공통 언어로 고정하는 것입니다.
- 이 카테고리에서 `반대편 외야 백업`은 플레이트 뒤 직접 백업이 아니라 `middle/cutoff 뒤 리바운드 구역`을 닫는 역할로 고정합니다.

## 시나리오

### 23. `runner-on-second-left-single-cutoff-home`

- 상황: 2루 주자, LF 안타
- 팀 콜: LF가 공격적으로 처리하고 SS를 통해 Home으로 연결한다.
- Primary Out: `Home`
- Fallback: `Infield control, no extra-base`
- 핵심 움직임:
  - `LF`는 몸 앞 처리와 빠른 릴리스를 만든다.
  - `SS`는 Home cutoff 라인을 정렬한다.
  - `3B`는 3루를 유지한다.
  - `P`는 Home 백업을 돈다.
- 백업/정렬:
  - `CF`는 LF 뒤를 가장 먼저 받아 첫 미스플레이와 벽/갭 리바운드를 정리한다.
  - `RF`는 2루 쪽으로 안쪽 이동해 middle-cut 뒤 2차 백업과 반대편 누수를 막는다.
  - `C`와 `3B`는 Home/3B 두 베이스를 동시에 열어 두지 않도록 정렬을 고정한다.
- 흔한 실수:
  - LF가 직접 Home만 보고 무리하는 것

### 24. `runner-on-second-center-single-cutoff-home`

- 상황: 2루 주자, CF 안타
- 팀 콜: CF가 직접 Home 승부를 보되, SS cutoff가 no-play를 정리한다.
- Primary Out: `Home`
- Fallback: `3B/2B 추가 진루 억제`
- 핵심 움직임:
  - `CF`는 타구를 몸 정면에서 처리한다.
  - `SS`는 송구 라인을 맞추는 고정 cutoff가 된다.
  - `C`는 Home 타깃과 리바운드 대비를 한다.
- 백업/정렬:
  - `LF`는 좌중간 쪽으로 안쪽 이동해 CF 뒤 첫 리바운드와 Home miss의 왼쪽 백업을 맡는다.
  - `RF`는 우중간 쪽으로 안쪽 이동해 cut 뒤 빠지는 공과 다음 베이스 진루를 정리한다.
  - `P`는 Home 뒤를 잡고 `3B`는 stop-base를 유지해 no-play 전환을 안정시킨다.
- 흔한 실수:
  - CF가 공을 비스듬히 잡아 송구 발이 꼬이는 것

### 25. `runner-on-second-right-single-cutoff-third-home`

- 상황: 2루 주자, RF 안타
- 팀 콜: RF는 공을 빠르게 처리하고 1B 컷오프를 통해 Home을 먼저 공격하되, 닫히면 3루에서 멈추게 한다.
- Primary Out: `Home`
- Fallback: `3B stop`
- 핵심 움직임:
  - `RF`는 낮고 빠른 송구를 만든다.
  - `1B`는 Home 방향 첫 cutoff를 맡는다.
  - `3B`는 stop-base 역할을 확실히 한다.
- 백업/정렬:
  - `CF`는 RF 뒤를 먼저 잡아 우측 미스플레이와 긴 리바운드를 정리한다.
  - `LF`는 좌중간과 3루 뒤 방향으로 안쪽 이동해 반대편 누수와 no-play 전환을 받친다.
  - `P`는 Home-3B 사이를 읽으며 send가 나올 때 홈 뒤 백업으로 즉시 전환한다.
- 흔한 실수:
  - Home 욕심 때문에 3루 진루 저지도 놓치는 것

### 26. `runner-on-first-left-single-first-to-third`

- 상황: 1루 주자, LF 안타
- 팀 콜: 선행주자의 3루 진루를 억제하되, 무리한 아웃보다는 정확한 stop이 우선이다.
- Primary Out: `3B if reckless runner`
- Fallback: `Hold at 3B`
- 핵심 움직임:
  - `LF`는 타구를 끊어 읽고 빠르게 relay에 맞춘다.
  - `SS`는 중계와 3루 방향 라인을 조정한다.
  - `3B`는 태그 준비와 stop 역할을 동시에 한다.
- 백업/정렬:
  - `CF`는 LF 뒤를 가장 먼저 받아 미스플레이와 좌중간 누수를 막는다.
  - `RF`는 2루 쪽으로 안쪽 이동해 relay 뒤 2차 백업과 타자주자 추가 진루를 정리한다.
  - `P`는 3루-Home 라인을 읽으며 send가 길어질 때 Home 백업으로 전환할 준비를 한다.
- 흔한 실수:
  - 불필요하게 Home까지 생각해 플레이가 길어지는 것

### 27. `runner-on-first-right-single-first-to-third`

- 상황: 1루 주자, RF 안타
- 팀 콜: 우측 relay를 통해 3루 진루를 억제한다.
- Primary Out: `3B if runner over-commits`
- Fallback: `Hold at 3B`
- 핵심 움직임:
  - `RF`는 공을 공격적으로 처리하고 낮은 송구를 만든다.
  - `2B`는 우측 relay의 중심이 된다.
  - `SS`는 2루 주변과 추가 진루를 관리한다.
  - `3B`는 stop-base를 지킨다.
- 백업/정렬:
  - `CF`는 RF 뒤를 먼저 잡아 우중간 누수와 미스플레이를 정리한다.
  - `LF`는 2루 쪽으로 안쪽 이동해 relay 뒤 2차 백업과 반대편 긴 악송구를 정리한다.
  - `P`는 3루-Home 라인을 읽으며 send가 이어지면 플레이트 뒤 백업으로 바로 전환한다.
- 흔한 실수:
  - 우측 relay가 너무 깊어 3루 송구가 늦는 것

### 28. `bases-empty-gap-double-relay-second`

- 상황: 주자 없음, 갭으로 빠지는 2루타성 타구
- 팀 콜: 외야는 공을 빨리 끊고, middle relay로 타자주자를 2루에 묶는다.
- Primary Out: `2B on over-aggressive runner`
- Fallback: `Clean stop at 2B`
- 핵심 움직임:
  - `OF`는 공을 정면 처리해 중계맨을 정확히 찾는다.
  - `Middle`은 2루 쪽 중계 각도를 만든다.
  - `2B`는 베이스 태그 준비를 일찍 한다.
- 백업/정렬:
  - `처리하지 않는 코너 외야수`는 플레이 뒤를 길게 따라가 첫 리바운드와 담장 처리 미스를 정리한다.
  - `반대쪽 외야수`는 중간 쪽으로 안쪽 이동해 relay miss의 2차 백업과 추가 진루 억제를 맡는다.
  - `SS`와 `C`는 2루 stop이 끝난 뒤 3루/홈으로 이어지는 무리한 진루가 없는지 바로 정렬한다.
- 흔한 실수:
  - 중계 라인이 너무 늦게 만들어지는 것
