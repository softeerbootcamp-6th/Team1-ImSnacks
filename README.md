<img width="1194" height="332" alt="image" src="https://github.com/user-attachments/assets/50350dfe-1298-49a2-a7ef-291bea34ec53" />

## 초단기 날씨 정보 기반 농작업계획 어시스턴트


## 1. 서비스 내용
돌발성 기상 변화로 인한 농업 피해가 증가하고 있는 상황에서,  기존 기상 정보가 대응에 필요한 **초단기 예측 데이터**를 충분히 제공하지 못하는 문제를 해결하고자 합니다.

`녀름나기`는 **초단기 날씨 정보를 기반**으로 농작업 일정을 효율적으로 관리하고,  
기상 상황에 따른 맞춤형 작업 계획을 제안하여 **농가의 피해를 최소화**합니다.

---

## 2. 주요 기능
### 🌤️ 날씨 및 예보
- **현재 날씨 실시간 표시**
- **실시간 시간 및 날씨 정보 제공 (기상청 또는 OpenWeatherMap API 사용)**
  - 초단기 및 단기 예보 (1시간 단위)
- **초단기(최대 6시간), 단기(6시간~7일) 예보를 시간대별로 제공**
  - 중기 예보 (7일 내 오전/오후 경향)

### ⚠️ 기상 리스크 및 유의사항
- **농작업 영향을 주는 기상 리스크 안내**
  - 폭우, 이상 기온, 강풍 등 유형별 위험, 기간, 정도 표시
- **작물별 병충해 유의사항 제공**
  - 생육 단계 및 초단기 날씨 기반 병충해 리스크 메시지 제공
  - 기상 상태별 작물 유의사항 제시
  - 날씨 유형에 따른 작물별 보호 조치 안내

### 🗒️ 농작업 어시스턴트 및 일정 관리
- **작물 정보 관리**
  - 재배 작물 선택(최대 6종), 발아 시기 입력, 농장 위치 설정 (지도 기반 드래그 인터페이스)
- **맞춤형 농작업 일정 추천**
  - 생육 단계 및 날씨 기반 AI 추천 작업 시간대 제시
- **일정 등록, 삭제 및 이력 조회**
  - 일정 추가/삭제, 작업 완료 시 이력 저장 및 월별 기록 열람 기능
- **이웃 농가 작업 현황 제공**
  - 반경 2.5km 이내, 동일 작물 기준 최근 3일간의 작업 현황 요약 표시

### 📳 알림 및 대응 안내
- **기상 변동 SMS 알림**
  - 작업 예정 시간 전후, 6시간 및 1시간 이내의 위기 기상 알림 제공
- **대처 가이드 제공**
  - 기상 조건 및 해당 작물/작업에 따른 연기 또는 대체 방안 메시지 제공

---

## 3. 팀 구성


| <img src="https://github.com/user-attachments/assets/cb6c0ae5-5566-4a47-a811-095c500289d8" alt="김미소" width="100"/> | <img src="https://github.com/user-attachments/assets/fea8baa9-7028-41ef-b44d-9ca9820aea11" alt="조은진" width="100"/> | <img src="https://github.com/user-attachments/assets/cae6ad12-e938-4f16-96a5-eca5fdfd0146" alt="권민혁" width="100"/> | <img src="https://github.com/user-attachments/assets/4101dfc6-74f3-4380-9d17-d4e0716cf61a" alt="박세연" width="100"/> | <img src="https://github.com/user-attachments/assets/8dac1353-a2bc-4126-9a35-2591929c4da8" alt="임규현" width="100"/> |
|------------|------------|--------|--------|--------|
| 김미소     | 조은진     | 권민혁 | 박세연 | 임규현 |
| 프론트엔드 | 프론트엔드 | 백엔드 | 백엔드 | 백엔드 |

---

## 4. 기술 스택
**Frontend**
- React
- typescript
- emotion
- Recharts
- vite
- pnpm

**Backend**
- Spring Boot v3.5.4
- Java 17
- MySQL
- JPA

---

## 5. GitHub Wiki
- [📖 그라운드룰 바로가기](https://github.com/softeerbootcamp-6th/Team1-ImSnacks/wiki/%5B1%ED%8C%80%5D-%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%A3%B0)
- [💭 논의 공간 바로가기](https://foregoing-sofa-1ca.notion.site/244e13d9782280f6b1bce7aceca56aa0?v=244e13d9782280c8b7d2000cdaf13622)
