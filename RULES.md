# RULES.md

## 문서 운영 규칙

- `docs/defense-scenario-curriculum.md`는 시나리오 카탈로그의 정본이다.
- `docs/defense-curriculum/*.md`는 전술 판단의 정본이다.
- `docs/defense-curriculum/*-layout.md`와 `docs/field-layout-reference.md`는 좌표 정본이다.
- `docs/scenario-data-model.md`는 구현 데이터 계약 문서다.
- `README.md`, `docs/product-brief.md`, `docs/mobile-mvp.md`, `docs/roadmap.md`, `project-kickoff-summary.md`, `docs/scenario-expansion-playbook.md`는 파생 문서다.

파생 문서가 정본과 충돌하면 파생 문서를 고친다.

## 시나리오 작성 규칙

1. 시나리오 ID는 커리큘럼 문서의 값을 그대로 쓴다.
2. 상황은 `주자 상태`, `아웃카운트`, `타구 방향`, `플레이 타입`이 드러나야 한다.
3. 팀 콜은 한 문장으로 고정한다.
4. Primary Out과 Fallback은 각각 하나씩만 둔다.
5. 공 처리자, 빈 베이스 커버, 오프라인 송구 백업을 반드시 분리해 적는다.
6. 송구보다 먼저 `첫 스텝`이 보이게 쓴다.
7. 같은 게임 상태에서 서로 다른 팀 규칙이 필요하면 시나리오를 분리한다.
8. 데이터로 옮길 때는 9명 수비수, cover, backup, animation, quiz, acceptance checklist가 모두 같은 정답을 바라봐야 한다.

## 금지 규칙

- 책임자를 열어 둔 채 문서를 끝내지 않는다.
- 정본을 거치지 않고 `scenarios.ts`나 `scenarioDetails/*.ts`만 먼저 바꾸지 않는다.
- 좌표 문서와 데이터 좌표를 따로 놀게 두지 않는다.
- 사용자 노출 UI를 영어와 독일어로 뒤섞어 고정하지 않는다.
- LLM 응답이 전술 정답을 덮어쓰게 만들지 않는다.

## 언어 규칙

- 문서 서술은 한국어
- 사용자 노출 문구와 데이터 설명 필드는 독일어
- 파일명, ID, 타입명은 기존 영문/코드 규칙 유지

## 검토 체크리스트

- 정본 문서와 파생 문서가 같은 내용을 말하는가
- 현재 구현 11개와 계획 36개를 혼동하지 않는가
- 팀 콜, Primary Out, Fallback이 문장으로 선명한가
- 커버와 백업이 실제 야구 동선으로 설명 가능한가
- 퀴즈와 acceptance checklist가 같은 정답을 쓰는가

## 확장 규칙

- `docs/scenario-expansion-playbook.md`는 36개 정본 밖의 신규 후보를 검토할 때만 사용한다.
- 정본 36개를 모두 구현하기 전에는 플레이북으로 우선순위를 다시 흔들지 않는다.
