import { Language, MoodType, BudgetType, PaceType, CompanionType } from '../types/itinerary';

export const translations = {
  uk: {
    appTitle: 'DayRoute',
    appSubtitle: 'Маршрут Одного Дня',
    tagline: 'Генератор ідеального дня у незнайомому місті під твій бюджет і настрій',
    heroBadge: 'AI & Curated Travel Planner',
    readyForGithub: 'Працює офлайн та на GitHub Pages',
    
    // Actions & Navigation
    generateBtn: 'Скласти ідеальний день',
    generating: 'Плануємо твій день...',
    savedRoutes: 'Збережені маршрути',
    surpriseMe: 'Здивуй мене!',
    settings: 'Налаштування API',
    export: 'Експорт',
    share: 'Поділитися',
    print: 'Друк / PDF',
    calendarExport: 'Додати в Календар (.ics)',
    copySummary: 'Скопіювати опис',
    copied: 'Скопійовано!',
    saveTrip: 'Зберегти маршрут',
    saved: 'Збережено',
    regenerate: 'Оновити маршрут',
    swapStop: 'Замінити цю локацію',
    swapping: 'Підбираємо заміну...',
    visited: 'Відвідано',
    markVisited: 'Позначити відвіданим',
    clearAll: 'Очистити все',

    // Form inputs
    cityLabel: 'Місто для подорожі',
    cityPlaceholder: 'Введіть місто (наприклад, Київ, Львів, Рим, Париж...)',
    quickCities: 'Популярні напрямки:',
    budgetLabel: 'Бюджет подорожі',
    currencyLabel: 'Валюта',
    customAmountLabel: 'Сума на день',
    moodLabel: 'Настрій та стиль дня',
    companionLabel: 'З ким подорожуєш?',
    paceLabel: 'Темп прогулянки',
    timeWindowLabel: 'Час дня',
    from: 'з',
    to: 'до',

    // Budget tiers
    budgetOptions: {
      budget: {
        title: 'Економний / Backpacker',
        desc: 'Безкоштовні панорами, вулична їжа, піші прогулянки, студентські лайфхаки',
        symbol: '₴ / $',
      },
      moderate: {
        title: 'Збалансований / Комфортний',
        desc: 'Затишні кав\'ярні, локальні бістро, популярні музеї та громадський транспорт',
        symbol: '₴₴ / $$',
      },
      luxury: {
        title: 'Преміум / Повний відрив',
        desc: 'Кращі панорамні ресторани, авторські коктейлі, таксі та ексклюзивні враження',
        symbol: '₴₴₴ / $$$',
      },
      custom: {
        title: 'Власний бюджет',
        desc: 'Точна сума грошей, яку плануєш витратити за день',
        symbol: '🎯',
      },
    } as Record<BudgetType, { title: string; desc: string; symbol: string }>,

    // Moods
    moodOptions: {
      foodie: {
        title: 'Гастрономічний тур',
        desc: 'Знакові страви, запашна кава, автентичні ринки та локальні десерти',
        icon: '🥐',
      },
      cultural: {
        title: 'Культура та історія',
        desc: 'Шедеври архітектури, легендарні музеї, історичні площі та галереї',
        icon: '🏛️',
      },
      hidden_gems: {
        title: 'Секретні дворики та автентика',
        desc: 'Місця "для своїх", таємні оглядові майданчики, вінтаж та без натовпів',
        icon: '🌿',
      },
      romantic: {
        title: 'Романтичний та затишний',
        desc: 'Атмосферні вулички, затишні кафе, захід сонця біля води та вино',
        icon: '✨',
      },
      adventure: {
        title: 'Драйв та пригоди',
        desc: 'Динамічні локації, активності, висотні точки та вечірнє життя міста',
        icon: '⚡',
      },
      relaxed: {
        title: 'Неспішний релакс та парки',
        desc: 'Зелені оази, неквапливі прогулянки, лавки з книгою та панорами',
        icon: '☕',
      },
    } as Record<MoodType, { title: string; desc: string; icon: string }>,

    // Companions
    companionOptions: {
      solo: { title: 'Соло-мандрівка', icon: '🎒' },
      couple: { title: 'Для закоханих / Пара', icon: '💑' },
      friends: { title: 'З друзями', icon: '🍻' },
      family: { title: 'З сім\'єю та дітьми', icon: '👨‍👩‍👧' },
    } as Record<CompanionType, { title: string; icon: string }>,

    // Pace
    paceOptions: {
      relaxed: { title: 'Спокійний', desc: '3–4 ключові зупинки, багато часу на відпочинок' },
      balanced: { title: 'Оптимальний', desc: '5–6 локацій, ідеальний баланс вражень' },
      intense: { title: 'Максимум вражень', desc: '7–8 точок від світанку до пізньої ночі' },
    } as Record<PaceType, { title: string; desc: string }>,

    // Timeline & Map
    timelineTitle: 'Твій розклад на день',
    mapTitle: 'Інтерактивна мапа дня',
    budgetCardTitle: 'Фінансовий кошторис дня',
    proTipsTitle: 'Секрети та поради місцевих',
    foodsTitle: 'Що обов’язково скуштувати',
    photoSpotsTitle: 'Кращі локації для фото',
    weatherTitle: 'Порада до одягу / погоди',
    openInGoogleMaps: 'Відкрити в Google Maps',
    transitTime: 'до наступної точки',
    walk: 'пішки',
    transit: 'транспортом',
    taxi: 'на таксі',
    cost: 'Вартість:',
    duration: 'Тривалість:',
    insiderSecret: 'Секретна порада:',
    noRoutesYet: 'Маршрут ще не складено. Оберіть параметри вище та натисніть "Скласти ідеальний день"!',
    free: 'Безкоштовно',
    
    // Categories
    categories: {
      coffee: 'Ранкова кава & Сніданок',
      breakfast: 'Сніданок',
      sight: 'Визначна пам’ятка',
      museum: 'Музей / Галерея',
      lunch: 'Обід',
      park: 'Парк / Релакс',
      viewpoint: 'Панорамний огляд',
      dinner: 'Вечеря',
      nightlife: 'Вечірній бар / Життя',
      shopping: 'Сувеніри / Вінтаж',
      hidden_spot: 'Секретна локація',
    },

    // Modal API & GitHub
    apiKeyModalTitle: 'Налаштування AI та автономного режиму',
    apiKeyDesc: 'Додаток повністю автономний і може працювати на GitHub Pages. За замовчуванням використовується якісний вбудований алгоритм, а за наявності Gemini API ключа активується найсучасніша модель Gemini 2.5 Flash для будь-якого містечка світу!',
    apiKeyInputLabel: 'Твій Gemini API Ключ (необов’язково):',
    apiKeyPlaceholder: 'Вставте AIzaSy...',
    getFreeKey: 'Отримати безкоштовний ключ на Google AI Studio',
    saveKey: 'Зберегти ключ',
    removeKey: 'Видалити ключ',
    apiKeySavedSuccess: 'Ключ збережено в пам’яті браузера!',
    apiKeyRemoved: 'Ключ видалено. Використовується автономний режим.',
    githubDeployTitle: 'Як викласти на GitHub?',
    githubDeployDesc: 'Проєкт збирається стандартною командою `npm run build` у папку `dist` з відносними шляхами і миттєво публікується на GitHub Pages або Vercel без жодного серверного налаштування.',

    // Empty saved states
    noSavedTrips: 'У вас ще немає збережених маршрутів. Натисніть "Зберегти маршрут" на будь-якому згенерованому дні!',
    deleteTrip: 'Видалити',
    openTrip: 'Переглянути',
  },

  en: {
    appTitle: 'DayRoute',
    appSubtitle: 'One Day Itinerary',
    tagline: 'Generate the ideal day in an unfamiliar city tailored to your exact budget & vibe',
    heroBadge: 'AI & Curated Travel Planner',
    readyForGithub: 'Runs offline & ready for GitHub Pages',

    // Actions & Navigation
    generateBtn: 'Plan My Ideal Day',
    generating: 'Crafting your perfect day...',
    savedRoutes: 'Saved Routes',
    surpriseMe: 'Surprise Me!',
    settings: 'API Settings',
    export: 'Export',
    share: 'Share',
    print: 'Print / PDF',
    calendarExport: 'Add to Calendar (.ics)',
    copySummary: 'Copy Text Summary',
    copied: 'Copied!',
    saveTrip: 'Save Route',
    saved: 'Saved',
    regenerate: 'Regenerate Itinerary',
    swapStop: 'Swap this spot',
    swapping: 'Finding replacement...',
    visited: 'Visited',
    markVisited: 'Mark as visited',
    clearAll: 'Clear all',

    // Form inputs
    cityLabel: 'Destination City',
    cityPlaceholder: 'Type a city (e.g., Kyiv, Rome, Paris, Tokyo, London...)',
    quickCities: 'Popular destinations:',
    budgetLabel: 'Trip Budget',
    currencyLabel: 'Currency',
    customAmountLabel: 'Amount per day',
    moodLabel: 'Mood & Vibe',
    companionLabel: 'Who are you traveling with?',
    paceLabel: 'Walking Pace',
    timeWindowLabel: 'Active Hours',
    from: 'from',
    to: 'to',

    // Budget tiers
    budgetOptions: {
      budget: {
        title: 'Backpacker / Low Cost',
        desc: 'Free scenic viewpoints, authentic street food, walking routes, student hacks',
        symbol: '$ / €',
      },
      moderate: {
        title: 'Balanced / Comfort',
        desc: 'Cozy artisan cafes, local bistros, popular museum tickets & public transit',
        symbol: '$$ / €€',
      },
      luxury: {
        title: 'Premium / Splurge',
        desc: 'Panoramic rooftop dining, craft cocktail bars, private rides & boutique treats',
        symbol: '$$$ / €€€',
      },
      custom: {
        title: 'Custom Budget',
        desc: 'Exact amount of money you want to allocate for your day',
        symbol: '🎯',
      },
    } as Record<BudgetType, { title: string; desc: string; symbol: string }>,

    // Moods
    moodOptions: {
      foodie: {
        title: 'Culinary & Street Food',
        desc: 'Iconic local dishes, specialty coffee, bakeries, food markets & signature desserts',
        icon: '🥐',
      },
      cultural: {
        title: 'Art & Cultural Heritage',
        desc: 'Architectural masterpieces, historic plazas, world-class galleries & museums',
        icon: '🏛️',
      },
      hidden_gems: {
        title: 'Hidden Gems & Local Vibe',
        desc: 'Secret courtyards, quiet view decks, indie bookstores, vintage spots without crowds',
        icon: '🌿',
      },
      romantic: {
        title: 'Romantic & Aesthetic',
        desc: 'Atmospheric cobblestone alleys, candlelit bistros, golden hour views & wine bars',
        icon: '✨',
      },
      adventure: {
        title: 'High Energy & Adventure',
        desc: 'Dynamic districts, rooftop climbs, lively evening scenes and exciting city pulse',
        icon: '⚡',
      },
      relaxed: {
        title: 'Chill Parks & Slow Coffee',
        desc: 'Botanical gardens, waterfront strolls, park benches, book reading and zero rush',
        icon: '☕',
      },
    } as Record<MoodType, { title: string; desc: string; icon: string }>,

    // Companions
    companionOptions: {
      solo: { title: 'Solo Explorer', icon: '🎒' },
      couple: { title: 'Couple / Romantic', icon: '💑' },
      friends: { title: 'Friends Crew', icon: '🍻' },
      family: { title: 'Family with Kids', icon: '👨‍👩‍👧' },
    } as Record<CompanionType, { title: string; icon: string }>,

    // Pace
    paceOptions: {
      relaxed: { title: 'Slow & Easy', desc: '3–4 highlights, generous time to sit and soak in' },
      balanced: { title: 'Well-Rounded', desc: '5–6 stops, the golden middle for a full day' },
      intense: { title: 'Packed & Thrilling', desc: '7–8 spots from sunrise till late night' },
    } as Record<PaceType, { title: string; desc: string }>,

    // Timeline & Map
    timelineTitle: 'Your Day Schedule',
    mapTitle: 'Interactive Route Map',
    budgetCardTitle: 'Estimated Budget Breakdown',
    proTipsTitle: 'Local Secrets & Etiquette',
    foodsTitle: 'Must-Try Regional Specialties',
    photoSpotsTitle: 'Top Photo Opportunities',
    weatherTitle: 'Clothing & Weather Tip',
    openInGoogleMaps: 'Open in Google Maps',
    transitTime: 'to next destination',
    walk: 'walking',
    transit: 'transit',
    taxi: 'taxi',
    cost: 'Cost:',
    duration: 'Duration:',
    insiderSecret: 'Insider Lifehack:',
    noRoutesYet: 'No itinerary yet. Choose your parameters above and click "Plan My Ideal Day"!',
    free: 'Free',

    // Categories
    categories: {
      coffee: 'Morning Coffee & Breakfast',
      breakfast: 'Breakfast',
      sight: 'Iconic Landmark',
      museum: 'Museum / Exhibition',
      lunch: 'Lunch',
      park: 'Park / Green Space',
      viewpoint: 'Scenic Viewpoint',
      dinner: 'Dinner',
      nightlife: 'Evening Bar / Nightlife',
      shopping: 'Boutique / Flea Market',
      hidden_spot: 'Secret Gem',
    },

    // Modal API & GitHub
    apiKeyModalTitle: 'AI & GitHub Offline Settings',
    apiKeyDesc: 'This application is fully standalone and can be deployed directly to GitHub Pages. By default, it features a curated synthesis engine with authentic city landmarks, and when provided with a Gemini API Key, it uses Gemini 2.5 Flash for infinite worldwide cities!',
    apiKeyInputLabel: 'Your Gemini API Key (optional):',
    apiKeyPlaceholder: 'Paste AIzaSy...',
    getFreeKey: 'Get a free API key at Google AI Studio',
    saveKey: 'Save Key',
    removeKey: 'Remove Key',
    apiKeySavedSuccess: 'API key saved to local browser storage!',
    apiKeyRemoved: 'API key removed. Using standalone curated engine.',
    githubDeployTitle: 'Deploying to GitHub Pages',
    githubDeployDesc: 'Run `npm run build` to generate the static files in `dist/`. With relative base paths already configured, you can host on GitHub Pages or Vercel with zero backend servers required.',

    // Empty saved states
    noSavedTrips: 'You have no saved itineraries yet. Click "Save Route" on any generated day to keep it offline!',
    deleteTrip: 'Delete',
    openTrip: 'View',
  },
};
