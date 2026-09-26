# DayRoute — Маршрут Одного Дня 🧭

> **[Українська]**: Генератор ідеального одноденного маршруту в незнайомому місті під конкретний бюджет та настрій. Працює автономно на GitHub Pages та підтримує Google Gemini AI.
> 
> **[English]**: Curated 1-day travel itinerary generator for unfamiliar cities calibrated to your exact budget & vibe. Works standalone out of the box on GitHub Pages and supports Google Gemini AI.

---

## ✨ Основні можливості / Features

- 🇺А & 🇬🇧 **Повна двомовність (Bilingual)**: Миттєве перемикання між українською та англійською мовами.
- 🎒 **Гнучкий бюджет (Budget Modes)**:
  - Економний / Backpacker ($ / ₴)
  - Збалансований / Comfort ($$ / ₴₴)
  - Преміум / Splurge ($$$ / ₴₴₴)
  - Власна точна сума та підтримка валют (UAH, USD, EUR, GBP, PLN)
- 🥐 **6 настроїв та стилів подорожі (Moods & Vibes)**:
  - Гастрономічний тур (Foodie & Street Food)
  - Культура та історія (Art & Heritage)
  - Секретні дворики та автентика (Hidden Gems & Local Vibe)
  - Романтичний та затишний (Romantic & Aesthetic)
  - Драйв та пригоди (Adventure & Pulse)
  - Неспішний релакс та парки (Chill & Slow Coffee)
- 🗺️ **Інтерактивна мапа (Interactive Map)**: Вбудована мапа Leaflet на базі OpenStreetMap — безкоштовно, без обмежень і без потреби в платних Google Maps API ключах!
- ✅ **Чекліст відвідування (Interactive Checklist)**: Позначка відвіданих місць у реальному часі зі святковим конфеті.
- 🔄 **Заміна зупинки (Swap Spot)**: Можливість оновити або замінити будь-яку окрему локацію одним кліком.
- 📅 **Експорт у Календар (.ICS)**: Завантаження файлу розкладу для додавання в Google Calendar, Apple Calendar чи Outlook.
- 🖨️ **Друк / Pocket PDF**: Оптимізована верстка для збереження кишенькового гіда в PDF або роздруківки.
- 💾 **Збережені маршрути (Offline Saved Trips)**: Збереження улюблених маршрутів у пам'яті браузера (LocalStorage).
- 🤖 **Подвійний рушій (Hybrid Engine)**:
  - Працює автономно без жодних ключів (база реальних локацій міст світу).
  - Підтримує підключення власного безкоштовного Gemini API ключа для генерації будь-якого містечка чи селища планети.

---

## 🚀 Швидкий старт (Local Development)

```bash
# 1. Встановити залежності / Install dependencies
npm install

# 2. Запустити сервер розробки / Run dev server
npm run dev
```

Відкрийте у браузері: `http://localhost:3000`

---

## 🌐 Як викласти на GitHub Pages (Deployment to GitHub Pages)

Проєкт налаштовано з відносними шляхами (`base: './'`), тому він працює на будь-якому піддомені GitHub Pages без додаткових конфігурацій:

### Спосіб 1: Через утиліту gh-pages (найпростіший)
```bash
# Зібрати проєкт
npm run build

# Опублікувати папку dist
npx gh-pages -d dist
```

### Спосіб 2: Через GitHub Actions
Створіть файл `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔑 AI Режим (Google Gemini API)

- Без ключа додаток використовує розумний генератор на основі перевірених геоданих для міст України та Європи.
- Щоб активувати генерацію через модель **Gemini 2.5 Flash**, натисніть іконку шестерні вгорі додатку та введіть свій безкоштовний ключ, отриманий на [Google AI Studio](https://aistudio.google.com/app/apikey). Ключ зберігається виключно у вашому браузері.

---

## 📄 Ліцензія / License

Apache-2.0. Вільне використання та модифікація для ваших подорожей!
