# 물댄동산교회(별내) 홈페이지 구성 분석

> 분석 대상: http://www.mdds.or.kr/
> 분석일: 2026-05-26
> 플랫폼: 교회사랑넷(church-love.net) CMS 빌더(awdDisplay) — iframe + XML API 동적 렌더링

---

## 1. 사이트 기본 정보

| 항목 | 내용 |
|---|---|
| 교회명 | 물댄동산교회 (별내) |
| 교단 | 대한예수교장로회(통합) |
| 담임목사 | 정종한 |
| 주소 | (12097) 경기도 남양주시 덕송2로 63 (별내동) |
| 전화 / 팩스 | TEL 031-553-0191 / FAX 031-572-9901 |
| 슬로건 | "복음으로 다시 세워지는 교회" |
| 외부 채널 | YouTube 채널 운영 |
| 빌더/플랫폼 | 교회사랑넷 CMS (PC/모바일 적응형, iframe + XML API 렌더링) |

---

## 2. 전체 메뉴 구조 (GNB)

**7개 대메뉴 / 하위 소메뉴**

### ① 교회소개 `mstrCode=1`
- 인사말 (pageCode=1)
- 교회발자취 (pageCode=2)
- 섬기는사람들 (pageCode=3)
- 예배안내 (pageCode=4)
- 교회시설안내 (pageCode=5)
- 차량 운행안내 (pageCode=26)
- 찾아오시는 길 (pageCode=6)

### ② 말씀과 찬양 `mstrCode=2`
- 주일설교 (pageCode=7)
- 샤론찬양대 (pageCode=28)
- 시온찬양대 (pageCode=8)
- 행사 및 집회영상 (pageCode=9)

### ③ 양육/훈련 `mstrCode=3`
- 새가족반 (pageCode=10)
- 성경아카데미 (pageCode=11)
- 수요중보기도 (pageCode=12)
- 화요전도팀 (pageCode=13)
- 젊은부부모임 (pageCode=14)
- 신혼부부모임 (pageCode=15)

### ④ 다음세대 `mstrCode=4`
- 유치부 (pageCode=16)
- 아동부 (pageCode=17)
- 청소년부 (pageCode=18)
- 청년부 (pageCode=19)

### ⑤ 선교후원 `mstrCode=5`
- 선교후원 및 기관 (pageCode=20)

### ⑥ 성도의 교제 `mstrCode=6`
- 교회소식 (pageCode=21, boardID=www21)
- 주보보기 (pageCode=25)
- 이달의 행사 (pageCode=22)
- 교회행사앨범 (pageCode=23, boardID=www23)
- 새가족소개 (pageCode=24)

### ⑦ 회원메뉴 `mstrCode=1001` (로그인 필요)
- 로그인 (pageCode=10001)
- 아이디/비밀번호찾기 (pageCode=10002)
- 회원가입 (pageCode=10003)

---

## 3. 메인 페이지 구성 (섹션)

1. **상단 헤더** — 로고 + GNB 메뉴 (반투명 검정 바)
2. **메인 슬로건/말씀 배너** — "복음으로 다시 세워지는 교회" / 골로새서 2:6 말씀
3. **주일설교** — 정종한 담임목사 최신 설교 (예: 요엘 2:28-32 "내 영을 만민에게")
4. **온라인예배 영상** — 온세대 통합예배 / 다음세대 예배 (YouTube 연동)
5. **행사일정(달력)** — 이달의 행사 캘린더 (월별)
6. **교회소식** 게시판 (boardID=www21) — 새가족수료식, 세례·입교식, 어린이주일 등
7. **교회행사앨범** (boardID=www23) — 행사 사진 갤러리
8. **새가족 소개** — 신규 등록 교인 안내
9. **선교 후원 현황** — 우크라이나(김요한 선교사), 파키스탄(허덕영 선교사), 햇살보금자리(김기용 목사) 등
10. **퀵메뉴** — 예배시간안내 · 오시는길 · 시설안내 · 주보보기
11. **푸터** — 주소/연락처, 개인정보처리방침, 이메일무단수집거부, COPYRIGHT© 물댄동산교회 / PROVIDED BY 교회사랑넷

---

## 4. 기술 구조 참고 (CMS 분석)

- 진입점: `/` → iframe `src=/main/main.html`
- 메인 콘텐츠 렌더링: `awdDisplay.js`가 POST `/core/xml/awd/awdDisplay.xml.html` 호출 (action=getXML)
- 메뉴 데이터: `menu.js`가 POST `/core/xml/menu.xml.html` 호출 (action=getMenu)
  - 메뉴명은 base64 인코딩된 UTF-8로 전달됨
- 서브 페이지 URL 패턴: `/main/sub.html?pageCode={n}` 또는 `?mstrCode={n}`
- 게시판 URL 패턴: `/main/sub.html?boardID={www21|www23}&num={id}&Mode=view`
- 행사 캘린더 URL: `/main/sub.html?year={YYYY}&month={MM}&pageCode=22`
