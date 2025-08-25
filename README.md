<img width="2160" height="1215" alt="Image" src="https://github.com/user-attachments/assets/a47e1892-e4be-46b2-be84-6921a8e79ec0" />

# 🌱 녀름나기 - 영세농을 위한 날씨 정보 기반 농작업 계획 어시스턴트



## 1. 서비스 내용
돌발성 기상 변화로 인한 농업 피해가 증가하고 있는 상황에서, 기존 기상 정보가 대응에 필요한 **예측 데이터**를 충분히 제공하지 못하는 문제를 해결하고자 합니다.

`녀름나기`는 **날씨 정보를 기반**으로 농작업 일정을 효율적으로 관리하고, 기상 상황에 따른 맞춤형 작업 계획을 제안하여 **농가의 피해를 최소화**합니다.

## 2. 배포 URL
녀름나기 : https://www.nyeoreumnagi.site

위 URL에 접속해 서비스 이용이 가능합니다.

- 테스트 계정 아이디 : `user001`
- 테스트 계정 비밀번호 : `encodedPw1`


---

## 3. 주요 기능
### 🌤️ 날씨 및 예보
- **현재 날씨 실시간 대시보드 시각화**
- **날씨 정보 제공**
  -  기상청 > 예특보 > 단기예보 > 동네예보 조회 > 단기예보 조회 api (primary)
  -  Tomorrow.io > Weather Forecast api (secondary)
- **중기 (12시간~7일) 예보를 시간대별로 제공**
  - 기상청 > 중기 예보 (7일 내 최고기온/최저기온/날씨 상태 아이콘)
- **미세먼지 정보 제공**
  - 한국환경공단 > 측정소별 실시간 측정정보 조회 api
- **일출몰 정보 제공**
  - 한국천문연구원 > 위치별 해달 출몰시각 정보조회 api
- **자외선 정보 제공**
  - 기상청 > 생활기상지수 > 자외선지수조회 api 

### ⚠️ 기상 리스크 및 유의사항
- **농작업에 영향을 주는 기상 리스크 안내**
  - 폭우, 이상 기온, 강풍 등 유형별 위험, 기간 표시
- **작물별 병해충 유의사항 제공**
  - 생육 단계 및 날씨 기반 병해충 리스크 메시지 제공
  - 기상 상태별 작물 유의사항 제시
  - 날씨 유형에 따른 작물별 보호 조치 안내

### 🗒️ 농작업 어시스턴트 및 일정 관리
- **작물 정보 관리**
  - 재배 작물 선택(최대 6종), 발아 시기 입력, 농장 위치 설정
- **맞춤형 농작업 일정 추천**
  - 생육 단계 및 날씨 기반 추천 작업 시간대 제시
- **일정 등록, 삭제 및 이력 조회**
  - 드래그앤드롭 기반 일정 추가/삭제, 일정 시간 수정
  - 작업 이력 저장 및 주 차별 기록 열람 기능
- **이웃 농가 작업 현황 제공**
  - 반경 5km 이내, 동일 농작업 기준 최근 3일간의 작업 수행 인원 요약 표시

## 4. 시연 영상

https://github.com/user-attachments/assets/d624b7ef-f87e-41ef-af6a-9e3922af33e7

---

## 5. 팀 구성


| <img src="https://github.com/user-attachments/assets/cb6c0ae5-5566-4a47-a811-095c500289d8" alt="김미소" width="100"/> | <img src="https://github.com/user-attachments/assets/fea8baa9-7028-41ef-b44d-9ca9820aea11" alt="조은진" width="100"/> | <img src="https://github.com/user-attachments/assets/cae6ad12-e938-4f16-96a5-eca5fdfd0146" alt="권민혁" width="100"/> | <img src="https://github.com/user-attachments/assets/4101dfc6-74f3-4380-9d17-d4e0716cf61a" alt="박세연" width="100"/> | <img src="https://github.com/user-attachments/assets/8dac1353-a2bc-4126-9a35-2591929c4da8" alt="임규현" width="100"/> |
|------------|------------|--------|--------|--------|
| [김미소](https://github.com/bamb14)     | [조은진](https://github.com/eunjin11)     | [권민혁](https://github.com/imscow11253) | [박세연](https://github.com/adorableco) | [임규현](https://github.com/ghlim22) |
| 프론트엔드 | 프론트엔드 | 백엔드 | 백엔드 | 백엔드 |

---

## 6. 기술 스택
### **Frontend**
<div align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Emotion-C865B9?style=for-the-badge&logo=emotion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=recharts&logoColor=white"/>
  <img src="https://img.shields.io/badge/zustand-660099?style=for-the-badge&logo=zustand&logoColor=white"/>
  <img src="https://img.shields.io/badge/tanstack query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-E95420?style=for-the-badge&logo=AWS&logoColor=white"/>
    
</div>

### **Backend**
<div align="left">
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
     <img src="https://img.shields.io/badge/Spring%20Batch-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
  <img src="https://img.shields.io/badge/Java%2017-007396?style=for-the-badge&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-E95420?style=for-the-badge&logo=AWS&logoColor=white"/>
</div>

---

## 7. 인프라 구조도
<img width="1590" height="1320" alt="Cloud Architecture" src="https://github.com/user-attachments/assets/e8c04f6b-7052-45cd-a464-d5a045f51204" />

---
## 8. ERD

### 주요 ERD

<img width="646" height="643" alt="녀름나기 ERD" src="https://github.com/user-attachments/assets/44fe5895-67ef-4dbb-bbf0-20018729f67d" />


### 날씨 관련 ERD

<img width="650" height="204" alt="날씨 관련 ERD" src="https://github.com/user-attachments/assets/0ffbc033-3165-4e40-ad77-904bd0e1b3f6" />

### 지역 코드 ERD

<img width="529" height="490" alt="지역 코드 ERD" src="https://github.com/user-attachments/assets/159d4ca3-4b06-4f57-9372-8f1d073811a6" />

---

## 9. GitHub Wiki
- [📖 그라운드룰 바로가기](https://github.com/softeerbootcamp-6th/Team1-ImSnacks/wiki/%5B1%ED%8C%80%5D-%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%A3%B0)
- [💭 논의 공간 바로가기](https://github.com/softeerbootcamp-6th/Team1-ImSnacks/discussions)
- [✏️ 프로젝트 관리 바로가기(private)](https://github.com/orgs/softeerbootcamp-6th/projects/15/views/1)
- [📚 위키 정리 바로가기](https://github.com/softeerbootcamp-6th/Team1-ImSnacks/wiki)
