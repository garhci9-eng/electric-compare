# 전기 생산 비용 비교 / Electricity Generation Cost Compare

> **발전원별 LCOE(균등화 발전비용)를 낮은 비용순으로 비교합니다**  
> **Compare electricity generation sources by LCOE — sorted lowest cost first**

---

## ⚠️ 공익 사용 선언 / PUBLIC INTEREST DECLARATION

> 🌍 **공익적 목적으로만 사용되어야 합니다 / Must be used for public interest ONLY**

---

## 💡 기여 / Contribution

| | 비율 | |
|--|------|--|
| **아이디어** | **90%** | 발전원 비용 비교 체계, 데이터 기획 |
| **Claude (Anthropic)** | **10%** | 코드 구현 지원 |

---

## 📊 포함 발전원 (비용 낮은 순) / Sources (Lowest Cost First)

1. ☀️ 대규모 태양광 / Utility-Scale Solar — avg $49/MWh
2. 💨 육상 풍력 / Onshore Wind — avg $33/MWh
3. 💧 수력 / Hydropower — avg $48/MWh
4. 🌋 지열 / Geothermal — avg $68/MWh
5. 🔥 천연가스 / Natural Gas CCGT — avg $60/MWh
6. 🌊 해상 풍력 / Offshore Wind — avg $92/MWh
7. 🏠 소규모 태양광 / Rooftop Solar — avg $132/MWh
8. ⚛️ 원자력 / Nuclear — avg $141/MWh
9. 🪨 석탄 / Coal — avg $108/MWh
10. 🌿 바이오매스 / Biomass — avg $114/MWh

---

## 🏗️ 기술 스택 / Tech Stack

```
Frontend:  React 18 + Vite + CSS Modules
Backend:   Node.js + Express
Fonts:     Bebas Neue, Noto Sans KR, Roboto Mono
Deploy:    Docker + Docker Compose + Nginx
Data:      IEA · IRENA · Lazard 2024
```

---

## 🚀 실행 / Run

```bash
npm run install:all
npm run dev
# → http://localhost:3000
```

---

## 📄 면책 조항 / Disclaimer

모든 수치는 국제 공개 데이터 기반 참조값입니다.  
All figures are reference values based on international public data.

---

<div align="center">

**아이디어 90% 창작자 · 구현 10% Claude (Anthropic)**  
⚠️ 공익적 목적으로만 사용 / Public Interest Use Only

</div>
