<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


<!-- BEGIN PROJECT-HANDOFF v1 -->

## PC·AI 간 작업 인계
이 프로젝트는 Git으로 코드와 공통 기록을 함께 전달한다. 기존 프로젝트 지침은 유지하며, 이 블록은 시작·인계 절차를 추가한다.

### 시작할 때
1. `.ai-context/README.md`, `HANDOFF.md`, `DECISIONS.md`, `ENVIRONMENT.md`를 읽는다(모두 `.ai-context/` 기준).
2. 기존 `AGENTS.md`·`CLAUDE.md`·`GEMINI.md`의 프로젝트 고유 지침, 작업 경로의 하위 지침과 기록에 연결된 정본 문서를 확인한다. 같은 파일을 반복 로딩하지 않는다.
3. `git status --short --branch`, `git log -5 --oneline`로 브랜치·미커밋 변경을 확인한다. 기록의 기준 커밋과 현재 HEAD가 다르면 관련 diff부터 확인한다.
4. 원격 최신 여부는 마지막 fetch 이후에만 판단한다. 사용자가 동기화를 요청했고 작업 트리가 안전할 때 해당 브랜치 정책에 따라 fetch/pull한다. 자동 reset·clean·강제 push로 맞추지 않는다.
5. 인계된 완료·미완료·다음 행동을 실제 파일과 대조한다. 초기 기록이나 오래된 기록만 보고 이전 작업을 완료라고 단정하지 않는다. 새 PC는 ENVIRONMENT의 도구·설치·검사 경로를 확인한다.

### 작업 중·종료할 때
- 중요한 변경·결정·검사 직후와 최종 응답 전에 HANDOFF를 갱신한다. 요청/완료/미완료/다음 행동/수정 파일/실행한 검사와 결과/담당 AI/날짜/브랜치/작업 기준 커밋을 남긴다.
- 지속되는 결정은 DECISIONS에 이유와 함께 기록한다. 기존 정본 작업일지·규칙이 있으면 중복 복제 대신 경로와 요약을 남긴다.
- 도구·실행 방법을 바꾸면 ENVIRONMENT의 참조도 갱신한다. 확인하지 않은 검사는 미실행으로 표기한다.
- 변경 코드와 기록은 같은 커밋으로 인계한다. 기준 커밋은 작업 시작 시 HEAD로 적으며, 자기 자신이 포함될 미래 커밋 해시를 만들지 않는다.
- 커밋·푸시는 사용자 승인 및 프로젝트 정책 범위에서 수행한다. 관련 파일만 명시적으로 stage하고 다른 작업자의 변경을 섞지 않는다. 푸시하지 않았다면 다른 PC에 아직 전달되지 않았다고 보고한다.
- 여러 PC/AI가 동시에 같은 작업을 수정하지 않는다. 병렬 작업은 브랜치 또는 worktree를 나누고 작업별 기록을 만든다.
- 키·비밀번호·토큰·쿠키·원본 개인정보·대화 전문은 기록하거나 커밋하지 않는다. 로그인·PC별 절대경로는 로컬에 둔다.

이 규칙은 같은 AI 세션의 복제가 아니라 파일 기반 인계다. 앱이 프로젝트 지침을 자동 로딩하지 않으면 사용자가 이 파일과 `.ai-context/README.md`를 읽도록 명시한다.
<!-- END PROJECT-HANDOFF v1 -->
