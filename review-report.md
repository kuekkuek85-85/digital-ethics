# review-report.md — 리뷰 검토 보고서 & 오류 히스토리

이 문서는 구현 과정의 **자체 코드 리뷰 결과**와 **발생한 오류·장애 히스토리**를 누적 기록한다.
- 코드 리뷰는 [review.md](review.md) 체크리스트를 기준으로 수행한다.
- 오류·장애는 **무엇이 / 왜 발생했고 / 어떻게 고쳤는지(근본 원인 포함)**를 남긴다.
- 목적: 이후 수정·업데이트 시 같은 오류를 반복하지 않기 위한 참고 히스토리.

> 작업은 `feature/implementation` 브랜치에서 진행하며, 완료 후 PR로 main에 머지한다.

---

## 태스크 1 — 전체 UI (Gemini·Firebase 없이 목업)

**범위**: 전체 UI만 구현. Gemini·Firebase 미연결, 데이터는 목업. 저장·제출·확정은 화면 상태만 변경.
**스택**: Next.js 16.4.3 (App Router, Cache Components) · React 19 · TypeScript · Tailwind v4.
**검증**: `npm run build` 성공, `npm run lint` 0 경고, 개발 서버에서 홈·학생 활동(입력·자동저장 표시)·교사 대시보드·검토 화면 렌더 확인.

### 1-A. 자체 코드 리뷰 결과 (review.md 기준)

| 영역 | 결과 | 비고 |
|------|------|------|
| 1. 기능 정확성 | ✅ | 4단계 흐름·이전/다음·빈 답안 시 다음 비활성·자동저장 표시 동작(목업). |
| 2. 개인정보 | 🟡 | 아래 F-1 참고 (학생 식별값이 URL 쿼리로 전달됨). |
| 3. AI 피드백 안전 | ⏭ | 태스크 2 범위. 화면에는 자리(placeholder)만 둠. |
| 4. 보안 | ✅ | 비밀키·서버 로직 없음. 커밋에 민감정보 없음. |
| 5. UX·접근성 | ✅ | 학생 모바일 폭(max-w-md)·교사 넓은 폭, 큰 글씨, label-input 연결, 한국어 안내. |
| 6. 안정성 | ✅ | 자동저장 타이머 unmount 시 정리. 외부 호출 없음. |
| 7. 코드 품질 | ✅ | 공통 UI(`ui.tsx`)·타입(`types.ts`)·목업(`mockData.ts`) 분리, 스타일 일관. |

**후속 조치가 필요한 발견(Findings)**
- **F-1 (🟡 개인정보)**: 학생 이름/번호(`label`)가 `/activity?label=...` **URL 쿼리로 전달**됨. review.md의 "개인정보가 URL에 노출되지 않는가"에 걸림. → **태스크 3**에서 세션/상태 또는 서버 발급 `submissionId`로 이동 예정.
- **F-2 (🟢)**: 저장·제출·확정·"다시 생성"은 현재 화면 상태만 변경(목업). → 태스크 2(AI)·3(DB)에서 실제 연결.
- **F-3 (🟢)**: 제출 완료 화면의 피드백은 안내 문구만 표시. → 태스크 2에서 실제 AI 피드백 표시로 교체.

### 1-B. 오류·장애 히스토리

| # | 증상 | 근본 원인 | 해결 방법 | 관련 파일 |
|---|------|-----------|-----------|-----------|
| E-1 | `npm run build` 실패: "params accessed outside of `<Suspense>`" (`/teacher/review/[id]` prerender 오류) | Next 16 **Cache Components(PPR)**에서는 `params` 같은 동적 데이터를 `<Suspense>` 경계 안에서 접근해야 정적 셸을 먼저 prerender할 수 있다. 동적 라우트 페이지가 `params`를 바로 await 해서 발생. | `params`를 읽는 async 컴포넌트(`ReviewContent`)를 분리해 `<Suspense fallback>`으로 감쌈. 정적 셸(TopBar)은 즉시 렌더. | `src/app/teacher/review/[id]/page.tsx` |
| E-2 | `npm run lint` 경고: `'router' is assigned a value but never used` | 학생 활동 페이지에서 네비게이션을 `setStep` 상태로 처리하면서 `useRouter`를 선언만 하고 쓰지 않음. | 미사용 `useRouter` import·선언 제거. | `src/app/activity/page.tsx` |

> 참고(앱 버그 아님): 브라우저 자동화로 한글 입력 시, 단계 전환 직후 입력란 포커스가 풀려 첫 타이핑이 반영되지 않는 현상이 있었음. 입력란을 다시 클릭하면 정상. 실제 사용자 조작에는 영향 없음.

---

## 태스크 2 — Gemini API (AI 교사 피드백)

### 2-A. 자체 코드 리뷰 결과
_대기_

### 2-B. 오류·장애 히스토리
_대기_

---

## 태스크 3 — Firebase (DB 저장)

### 3-A. 자체 코드 리뷰 결과
_대기_

### 3-B. 오류·장애 히스토리
_대기_
