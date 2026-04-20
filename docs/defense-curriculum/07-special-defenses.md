# 07. 특수 수비

이 문서는 `특수 수비` 카테고리의 원본 문서입니다.

- 수정이 필요하면 이 문서를 먼저 고칩니다.
- 좌표 구현 원문은 [07-special-defenses-layout.md](./07-special-defenses-layout.md)를 함께 봅니다.
- 이 카테고리의 시나리오는 총 `4개`입니다.
- 핵심 목표는 `도루 커버`, `1·3루 규칙`, `브레이크 플레이`, `런다운 절제`를 팀 공통 언어로 고정하는 것입니다.

## 시나리오

### 33. `runner-on-first-steal-second-cover`

- 상황: 1루 주자 도루 시도
- 팀 콜: C가 던지고 SS가 2루를 커버한다.
- Primary Out: `2B tag`
- Fallback: `Keep runner close and control overthrow`
- 핵심 움직임:
  - `C`는 빠른 교환과 낮은 송구를 만든다.
  - `SS`는 2루 베이스를 선점해 태그 라인을 만든다.
  - `CF`는 중간 뒤 백업을 읽는다.
- 백업/정렬:
  - `LF`와 `RF`는 한두 걸음 안쪽으로 당겨 2루 뒤 오버스로우가 갭으로 빠지는 것을 막는다.
  - `3B`는 3루를 지키며 더블스틸 가능성을 계속 읽는다.
  - `P`는 Home 앞 라인을 비우고 `C`가 바로 던질 수 있게 동선을 정리한다.
- 흔한 실수:
  - 커버맨이 늦게 들어와 태그 창이 사라지는 것

### 34. `runners-on-first-third-hold-defense`

- 상황: 1,3루 기본 수비
- 팀 콜: 공짜 실점을 막기 위해 SS가 cut/home 복귀를 맡고, 2B는 2루 take를 정리한다.
- Primary Out: `2B tag if the steal is taken cleanly`
- Fallback: `3루주자 Home 진입 차단`
- 핵심 움직임:
  - `C`는 송구와 Home 복귀 라인을 동시에 준비한다.
  - `SS`는 cut 여부와 Home 복귀 라인을 책임진다.
  - `2B`는 2루 take가 열릴 때만 태그 플레이를 완성한다.
  - `3B`와 `P`는 3루주자 리드와 Home 움직임을 계속 본다.
- 백업/정렬:
  - `CF`는 얕은 중간 정렬로 2루 송구 뒤 cut-return 라인과 큰 오버스로우를 함께 정리한다.
  - `LF`와 `RF`는 한 걸음씩 안쪽으로 당겨 Home 또는 2루 뒤 누수를 막는 외야 안전판이 된다.
  - `1B`는 1루주자 귀루와 2차 런다운 시작점까지 대비해 베이스를 쉽게 비우지 않는다.
- 흔한 실수:
  - hold와 cut 책임이 섞이는 것
  - 2루 주자만 보다가 3루주자를 공짜로 들여보내는 것

### 35. `runners-on-first-third-break-play`

- 상황: 1,3루 브레이크 플레이 또는 더블스틸 대응
- 팀 콜: 브레이크가 들어오면 SS가 cut/return로 Home을 먼저 잡고, 2B는 태그 창을 보여준다.
- Primary Out: `Home on the break`
- Fallback: `2B tag if runner at 3B holds`
- 핵심 움직임:
  - `C`는 2루 송구 후 즉시 Home 복귀 가능성을 준비한다.
  - `SS`는 cut 또는 return throw를 책임지는 고정 역할을 맡는다.
  - `2B`는 2루 태그 창을 보여주고 return lane을 비운다.
  - `3B`는 3루주자 스타트를 끝까지 읽는다.
- 백업/정렬:
  - `CF`는 얕은 정중앙으로 들어와 2루 송구 miss와 Home 복귀 miss의 공통 백업이 된다.
  - `LF`는 3루-Home 쪽으로 안쪽 정렬해 3루주자 브레이크 뒤 left-side 누수를 막는다.
  - `RF`는 1루-2루 쪽으로 안쪽 정렬해 2루 송구 이탈과 1루주자 추가 진루를 정리한다.
- 흔한 실수:
  - 목적 없이 가짜 송구만 하는 것
  - 런다운 라인이 생기기 전에 Home을 비워 두는 것

### 36. `rundown-third-home`

- 상황: 3루-홈 사이 런다운
- 팀 콜: 공을 오래 들고 있지 않고, 주자를 베이스 사이에 가둔 채 짧고 정확하게 교환한다.
- Primary Out: `Runner in rundown`
- Fallback: `Hold other runners and avoid throwing error`
- 핵심 움직임:
  - 공 가진 수비수는 끝까지 쫓지 않고 `한 번 더 끌어낸 뒤` 던진다.
  - `3B`, `C`, `P`가 양 끝을 정리한다.
  - 나머지 수비수는 다른 주자들의 추가 진루를 막는다.
- 백업/정렬:
  - `LF`는 3루선 뒤를 먼저 잡아 런다운이 3루 쪽으로 길어질 때 left-side 누수를 정리한다.
  - `CF`는 2루 뒤 쪽에서 큰 리바운드와 후속 진루를 막는 중간 안전판이 된다.
  - `RF`는 1루선과 우측 중간을 지켜 긴 악송구와 trailing runner 추가 진루를 막고, `1B/2B/SS`는 각 베이스를 닫는다.
- 흔한 실수:
  - 너무 빨리 던지거나 너무 오래 들고 있어 주자에게 타이밍을 주는 것
