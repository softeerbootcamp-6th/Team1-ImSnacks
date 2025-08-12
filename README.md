<img width="1194" height="332" alt="image" src="https://github.com/user-attachments/assets/50350dfe-1298-49a2-a7ef-291bea34ec53" />

## 녀름나기 - 초단기 날씨 정보 기반 농작업계획 어시스턴트


## 1. 서비스 내용
돌발성 기상 변화로 인한 농업 피해가 증가하고 있는 상황에서, 기존 기상 정보가 대응에 필요한 **초단기 예측 데이터**를 충분히 제공하지 못하는 문제를 해결하고자 합니다.

`녀름나기`는 **초단기 날씨 정보를 기반**으로 농작업 일정을 효율적으로 관리하고,  
기상 상황에 따른 맞춤형 작업 계획을 제안하여 **농가의 피해를 최소화**합니다.

---

## 2. 주요 기능
### 🌤️ 날씨 및 예보
- **현재 날씨 실시간 표시**
- **날씨 정보 제공 (기상청 공공 API 사용)**
  -  단기 예보 (1시간 단위)
- **단기(12시간~7일) 예보를 시간대별로 제공**
  - 중기 예보 (7일 내 최고기온/최저기온/날씨 상태 아이콘)

### ⚠️ 기상 리스크 및 유의사항
- **농작업 영향을 주는 기상 리스크 안내**
  - 폭우, 이상 기온, 강풍 등 유형별 위험, 기간 표시
- **작물별 병해충 유의사항 제공**
  - 생육 단계 및 초단기 날씨 기반 병해충 리스크 메시지 제공
  - 기상 상태별 작물 유의사항 제시
  - 날씨 유형에 따른 작물별 보호 조치 안내

### 🗒️ 농작업 어시스턴트 및 일정 관리
- **작물 정보 관리**
  - 재배 작물 선택(최대 6종), 발아 시기 입력, 농장 위치 설정
- **맞춤형 농작업 일정 추천**
  - 생육 단계 및 날씨 기반 추천 작업 시간대 제시
- **일정 등록, 삭제 및 이력 조회**
  - 일정 추가/삭제, 작업 완료 시 이력 저장 및 월별 기록 열람 기능
- **이웃 농가 작업 현황 제공**
  - 반경 2.5km 이내, 동일 작물 기준 최근 3일간의 작업 현황 요약 표시

### 📳 기상 변동 알림
- **기상 변동 SMS 알림**
  - 작업 예정 시간 전후, 6시간 및 1시간 이내의 위기 기상 알림 제공

---

## 3. 팀 구성


| <img src="https://github.com/user-attachments/assets/cb6c0ae5-5566-4a47-a811-095c500289d8" alt="김미소" width="100"/> | <img src="https://github.com/user-attachments/assets/fea8baa9-7028-41ef-b44d-9ca9820aea11" alt="조은진" width="100"/> | <img src="https://github.com/user-attachments/assets/cae6ad12-e938-4f16-96a5-eca5fdfd0146" alt="권민혁" width="100"/> | <img src="https://github.com/user-attachments/assets/4101dfc6-74f3-4380-9d17-d4e0716cf61a" alt="박세연" width="100"/> | <img src="https://github.com/user-attachments/assets/8dac1353-a2bc-4126-9a35-2591929c4da8" alt="임규현" width="100"/> |
|------------|------------|--------|--------|--------|
| [김미소](https://github.com/bamb14)     | [조은진](https://github.com/eunjin11)     | [권민혁](https://github.com/imscow11253) | [박세연](https://github.com/adorableco) | [임규현](https://github.com/ghlim22) |
| 프론트엔드 | 프론트엔드 | 백엔드 | 백엔드 | 백엔드 |

---

## 4. 기술 스택
### **Frontend**
<div align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Emotion-C865B9?style=for-the-badge&logo=emotion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=recharts&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"/>
</div>

### **Backend**
<div align="left">
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Java%2017-007396?style=for-the-badge&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white"/>
</div>

---

## 5. 인프라 구조도
<img width="1590" height="1320" alt="Cloud Architecture" src="https://github.com/user-attachments/assets/e8c04f6b-7052-45cd-a464-d5a045f51204" />

---
## 6. ERD

<img width="1758" height="2236" alt="nyeoreumnagi_database" src="https://github.com/user-attachments/assets/5f031bf5-0e50-48f1-b811-4dbf8cdc7bf7" />

---

## 7. GitHub Wiki
- [📖 그라운드룰 바로가기](https://github.com/softeerbootcamp-6th/Team1-ImSnacks/wiki/%5B1%ED%8C%80%5D-%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%A3%B0)
- [💭 논의 공간 바로가기](https://foregoing-sofa-1ca.notion.site/244e13d9782280f6b1bce7aceca56aa0?v=244e13d9782280c8b7d2000cdaf13622)
