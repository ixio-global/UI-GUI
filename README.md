# ixi-O O&M Admin Dashboard

<div align="center">

![ixi-O Logo](https://img.shields.io/badge/ixi--O-O%26M%20Admin-1a3a5c?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**통신사 B2B 상품 운영 관리 시스템**

</div>

---

## 📋 프로젝트 소개

**ixi-O O&M Admin Dashboard**는 글로벌 통신사를 대상으로 한 B2B 상품 운영 관리 시스템입니다. 이 시스템은 상품 기준 정보, Cloud AI 기능, 서비스 연동(Integration), 정산 관리, 고객 지원 등 다양한 운영 기능을 제공합니다.

### ✨ 주요 기능

- 📊 **대시보드**: 사업 실적 및 운영 현황을 한눈에 확인
- 📦 **상품 기준 정보**: 요금제, 상품 패키지 관리
- 🤖 **Cloud AI 기능**: AI 모델 배포 및 관리
- 🔗 **서비스 연동 관리**: API 연동 및 파트너 시스템 통합
- 💰 **서비스 정산**: 고객사별 정산 및 매출 관리
- 💬 **고객 지원**: 티켓 관리 및 FAQ 운영

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **스타일링** | CSS Custom Properties (CSS Variables) |
| **디자인 시스템** | Navy Blue 테마 기반 커스텀 디자인 |
| **배포** | GitHub Pages |

---

## 📁 프로젝트 구조

```
UI-GUI/
├── 📄 index.html          # 대시보드 (메인 페이지)
├── 📄 login.html          # 로그인 페이지
├── 📄 mypage.html         # 마이페이지
├── 📄 product-info.html   # 상품 기준 정보
├── 📄 cloud-ai.html       # Cloud AI 기능
├── 📄 integration.html    # 서비스 연동 관리
├── 📄 billing.html        # 서비스 정산
├── 📄 support.html        # 고객 지원
├── 📁 css/
│   └── 📄 style.css       # 전역 스타일 시트
└── 📁 js/
    └── 📄 app.js          # 메인 애플리케이션 스크립트
```

---

## 🎨 디자인 시스템

### 색상 팔레트

| 색상 | 변수명 | Hex |
|------|--------|-----|
| 🔵 Primary (Navy Blue) | `--brand-main` | `#1a3a5c` |
| 🔵 Primary Light | `--brand-light` | `#2d5a87` |
| ⚪ Surface | `--surface` | `#ffffff` |
| ⚫ Background | `--background` | `#f4f6f8` |

### 반응형 디자인

- 데스크톱, 태블릿, 모바일 환경 지원
- `1200px`, `768px` 브레이크포인트 적용

---

## 🚀 설치 및 실행

### 로컬 실행

1. 저장소를 클론합니다:
   ```bash
   git clone https://github.com/ixio-global/UI-GUI.git
   ```

2. 프로젝트 폴더로 이동합니다:
   ```bash
   cd UI-GUI
   ```

3. `index.html` 파일을 브라우저에서 열거나, 로컬 서버를 실행합니다:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (npx)
   npx serve .
   ```

4. 브라우저에서 `http://localhost:8000`으로 접속합니다.

### GitHub Pages 배포

이 프로젝트는 GitHub Pages를 통해 배포될 수 있습니다. `main` 브랜치의 루트 디렉토리를 소스로 설정하세요.

---

## 📸 스크린샷

### 대시보드
대시보드에서 활성 고객사 수, 총 가입자 수, API 호출량, 예상 월 매출 등의 KPI를 한눈에 확인할 수 있습니다.

### 로그인 페이지
Navy Blue 테마가 적용된 세련된 로그인 인터페이스를 제공합니다.

---

## 📝 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| 1.0.0 | 2024-12-16 | 초기 릴리즈 - 전체 UI 구현 |

---

## 👥 작성자

<table>
  <tr>
    <td align="center">
      <strong>안현정</strong><br>
      <sub>UI/UX 개발</sub>
    </td>
    <td align="center">
      <strong>이창용</strong><br>
      <sub>UI/UX 개발</sub>
    </td>
  </tr>
</table>

---

## 📄 라이선스

이 프로젝트는 **MIT License**를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 🤝 기여하기

1. 이 저장소를 포크합니다.
2. 새 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

---

<div align="center">

**ixio-global** &copy; 2024. All Rights Reserved.

</div>
