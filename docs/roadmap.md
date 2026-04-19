# 구현 로드맵

## 0단계: 정본 고정

- `docs/defense-scenario-curriculum.md`를 시나리오 정본으로 유지
- 카테고리 문서와 좌표 문서의 역할 분리
- `scenario-data-model`, `AGENTS.md`, `RULES.md`를 정본 기준으로 동기화

## 1단계: 첫 카테고리 완료 및 기존 시나리오 정합화

- 기본 내야 루틴 6개 시나리오의 문서, 데이터, acceptance checklist 일치 확인
- 기존 대표 시나리오와 문서 정본 간 차이 검증
- 독일어 용어와 UI 문구 정리
- 필드 좌표와 애니메이션 동선 검증

## 2단계: 1차 확장 묶음 잔여 구현

정본 커리큘럼의 1차 묶음을 우선 추가합니다.

- `runner-on-first-bunt-first-base-side`
- `runner-on-second-right-single-cutoff-third-home`
- `bases-empty-right-center-bloop`

## 3단계: 팀 전술의 기본 뼈대 완성

- `runner-on-first-ss-double-play-6-4-3`
- `runners-on-first-second-sac-bunt-third-base-side`
- `bases-loaded-infield-in`
- `runner-on-second-center-single-cutoff-home`
- `bases-empty-first-base-foul-pop`
- `runner-on-first-steal-second-cover`

## 4단계: 카테고리 기반 UX 정리

- 현재 상태:
  - 홈 `2 x 3` 카테고리 보드 적용
  - 카테고리별 시나리오 목록 적용
  - 상세 `Ablauf / Position` 2모드 적용
  - 카테고리에서 상세 진입 시 애니메이션 포커스 이동 적용

- 카테고리 선택 화면
- 카테고리 안 시나리오 목록 화면
- 상세 화면의 `Ablauf / Position` 모드 전환 정리
- 긴 세로 스크롤과 하단 시트 의존도를 줄이고 필드 중심 레이아웃으로 재구성

## 5단계: 포지션 학습 밀도 강화

- acceptance checklist 기반 QA 절차 정리
- 포지션별 흔한 실수, 커버, 백업, 송구 우선순위 노출 방식 정리
- 카테고리 복귀 후 다음 시나리오를 반복 학습하는 흐름 정리
- 홈/카테고리/상세 카피의 독일어 문장과 영어 야구 용어 혼합 기준 정리

## 6단계: 확장 기능 재검토

- 핵심 학습 흐름이 안정화된 뒤 `Quiz` 필요성 재판단
- 36개 커리큘럼 진행 상황을 본 뒤 `Coach` 필요성 재판단
- 확장 기능은 `Ablauf / Position` 경험을 해치지 않는 선에서만 도입

## 7단계: 36개 커리큘럼 완성

- 나머지 시나리오를 카테고리 단위로 순차 구현
- 각 추가 묶음마다 문서 -> 데이터 -> 애니메이션 -> 포지션 학습 흐름 순서로 진행
- 36개 구현 이후에만 `scenario-expansion-playbook.md`의 확장 후보를 검토
