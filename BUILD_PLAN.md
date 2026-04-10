# 물댄동산교회(mdds) 홈페이지 구축 플랜
> 저장소: kim01033226699-lgtm/mdds
> 배포: GitHub Pages → Cloudflare Pages 전환 예정
> 최종 업데이트: 2026-04-11

---

## 1. 현재 구축 완료 상태

### 기술 스택
| 항목 | 기술 |
|------|------|
| 프론트엔드 | HTML/CSS/JS (정적 사이트) |
| 호스팅 | GitHub Pages |
| 배포 URL | https://kim01033226699-lgtm.github.io/mdds/ |
| 배포 방식 | GitHub Actions 자동 배포 |

### 구축된 페이지
| 페이지 | 상태 | 설명 |
|--------|:----:|------|
| 메인 | ✅ | 히어로 + 설교 + 소개카드 + 교회소식 |
| 교회소개 | ✅ | 인사말 + 목사소개 + 비전 |
| 설교말씀 | ✅ | YouTube 연동 + 음성 재생 |
| 예배안내 | ✅ | 주일/주중 예배 시간표 |
| 교회소식 | ✅ | 이벤트 카드 |
| 오시는길 | ✅ | 지도 + 교통안내 |

---

## 2. Cloudflare Pages 전환 계획

### 전환 이유
| 항목 | GitHub Pages (현재) | Cloudflare Pages (전환 후) |
|------|:--:|:--:|
| 서버 함수 | X | O (Workers) |
| DB | X | O (D1 SQLite) |
| 회원 시스템 | 불가 | Workers로 구현 가능 |
| 메일 발송 | 외부 서비스 필요 | Workers로 직접 가능 |
| CDN 속도 (한국) | 보통 | 빠름 (한국 노드) |
| 대역폭 | 월 100GB | 무제한 |

### 전환 순서
1. Cloudflare 계정 → Workers & Pages → Connect to Git
2. 저장소 `kim01033226699-lgtm/mdds` 연결
3. 빌드 설정 (Build command / Output directory)
4. 배포 확인 (xxx.pages.dev)
5. (선택) 커스텀 도메인 연결 시 DNS 이전

---

## 3. 회원 시스템 + 버스 탑승 예약 기능

### 3-1. 기능 개요

교회 버스 운행 시 성도들이 모바일에서 탑승 예약을 하고,
관리자가 예약자 목록과 위치를 지도에서 확인하는 기능.

### 3-2. 사용자 흐름

```
[성도]
1. 홈페이지 → 회원가입 (이름, 연락처, 비밀번호)
2. 로그인
3. "버스탑승" 메뉴 클릭
4. 지도에서 현재 위치 설정 (카카오맵 + GPS)
5. "탑승 예약" 버튼 클릭
6. 예약 완료 알림

[관리자]
1. 관리자 페이지 접속
2. 탑승 예약자 목록 확인 (이름, 연락처, 위치)
3. 지도에서 예약자 위치 핀 표시
4. 노선 계획 참고
```

### 3-3. Cloudflare 기술 구성

```
Cloudflare Pages ─── 프론트엔드 (HTML/JS)
  │
  ├── /api/auth ──────── Workers ─── 회원가입/로그인 (JWT 토큰)
  │                         │
  ├── /api/booking ───── Workers ─── 탑승 예약 등록/취소/조회
  │                         │
  ├── /api/admin ─────── Workers ─── 관리자 예약 목록/지도 데이터
  │                         │
  └───────────────────── D1 ──────── SQLite DB
                                      ├── users (회원 정보)
                                      ├── bookings (탑승 예약)
                                      └── settings (관리자 설정)
```

| 기능 | Cloudflare 서비스 | 비용 |
|------|------------------|------|
| 사이트 호스팅 | Pages | 무료 |
| 회원 로그인 API | Workers | 무료 (일 10만 요청) |
| 탑승 예약 API | Workers | 무료 |
| DB | D1 (SQLite) | 무료 (5GB) |
| 위치 지도 | 카카오맵 API (클라이언트) | 무료 |
| 관리자 알림 | Workers 메일 발송 | 무료 |

### 3-4. DB 스키마 설계

```sql
-- 회원
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'member',  -- member / admin
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 탑승 예약
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  booking_date DATE NOT NULL,        -- 예약 날짜 (주일)
  latitude REAL NOT NULL,            -- 위도
  longitude REAL NOT NULL,           -- 경도
  address TEXT,                      -- 주소 텍스트
  status TEXT DEFAULT 'confirmed',   -- confirmed / cancelled
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 관리자 설정
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
```

### 3-5. API 엔드포인트

| Method | 경로 | 설명 | 권한 |
|--------|------|------|------|
| POST | `/api/auth/register` | 회원가입 | 공개 |
| POST | `/api/auth/login` | 로그인 (JWT 반환) | 공개 |
| GET | `/api/auth/me` | 내 정보 조회 | 회원 |
| POST | `/api/booking` | 탑승 예약 등록 | 회원 |
| DELETE | `/api/booking/:id` | 예약 취소 | 회원 |
| GET | `/api/booking/my` | 내 예약 목록 | 회원 |
| GET | `/api/admin/bookings` | 전체 예약 목록 | 관리자 |
| GET | `/api/admin/bookings/map` | 지도용 예약 데이터 | 관리자 |

### 3-6. 프론트엔드 추가 페이지

| 페이지 | 설명 |
|--------|------|
| `/login` | 로그인 화면 |
| `/register` | 회원가입 화면 |
| `/bus` | 버스 탑승 예약 (지도 + 예약 버튼) |
| `/bus/history` | 내 예약 이력 |
| `/admin/bus` | 관리자 - 예약 목록 + 지도 |

### 3-7. 지도 연동

- **카카오맵 JavaScript API** 사용 (무료, 일 30만 요청)
- 사용자: 지도에서 위치 클릭 또는 GPS 자동 설정
- 관리자: 예약자 위치를 마커로 표시, 클릭 시 이름/연락처 팝업

---

## 4. 구현 우선순위

### Phase 1: Cloudflare 전환 + 기본 배포
1. Cloudflare Pages에 GitHub 연결
2. 빌드 설정 및 배포 확인
3. 기존 GitHub Pages 비활성화

### Phase 2: 회원 시스템
4. D1 데이터베이스 생성 (users 테이블)
5. Workers API: 회원가입/로그인 (JWT)
6. 로그인/회원가입 페이지 UI

### Phase 3: 버스 탑승 예약
7. D1 bookings 테이블 추가
8. Workers API: 예약 등록/조회/취소
9. 버스 탑승 페이지 UI (카카오맵 + 예약 버튼)
10. 관리자 페이지 (예약 목록 + 지도 마커)

### Phase 4: 추가 기능 (선택)
11. 예약 알림 (관리자 메일/카카오톡)
12. 예약 마감 시간 설정
13. 노선별 구분
14. 예약 통계 (주별/월별)

---

## 5. 참고: mddsch_v2 프로젝트

Next.js + Payload CMS 기반의 별도 리뉴얼 프로젝트가 `mddsch_v2` 폴더에 구축 중.
- Payload CMS: 페이지 편집, 게시판, 설교 관리
- 구글 드라이브: 주보/사진 파일 관리
- 상세 내용: `mddsch_v2/` 참조
