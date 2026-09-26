import { 
  DayItinerary, 
  ItineraryRequest, 
  ItineraryStop, 
  MoodType, 
  BudgetType, 
  Language 
} from '../types/itinerary';

interface CityData {
  nameUk: string;
  nameEn: string;
  countryUk: string;
  countryEn: string;
  centerCoords: { lat: number; lng: number };
  defaultCurrency: string;
  exchangeRateToUSD: number; // For scaling budgets
  proTipsUk: string[];
  proTipsEn: string[];
  foodsUk: string[];
  foodsEn: string[];
  photoSpotsUk: string[];
  photoSpotsEn: string[];
  weatherAdviceUk: string;
  weatherAdviceEn: string;
  stops: Array<{
    id: string;
    nameUk: string;
    nameEn: string;
    category: ItineraryStop['category'];
    descUk: string;
    descEn: string;
    tipUk: string;
    tipEn: string;
    costUSD: number;
    duration: number;
    coords: { lat: number; lng: number };
    address: string;
    moods: MoodType[];
    timeSlot: 'morning' | 'lunch' | 'afternoon' | 'sunset' | 'evening' | 'night';
  }>;
}

export const CITIES_DATABASE: Record<string, CityData> = {
  kyiv: {
    nameUk: 'Київ',
    nameEn: 'Kyiv',
    countryUk: 'Україна',
    countryEn: 'Ukraine',
    centerCoords: { lat: 50.4501, lng: 30.5234 },
    defaultCurrency: 'UAH',
    exchangeRateToUSD: 41.5,
    proTipsUk: [
      'Купуйте квиток на фунікулер банківською карткою прямо на турнікеті — це найгарніший підйом на Михайлівську площу.',
      'На Пейзажній алеї обов’язково зазирніть у дворики за Національним музеєм історії — там відкривається один із найчистіших краєвидів на Поділ.',
      'У спекотний чи дощовий день скористайтеся метро «Арсенальна» — найглибшою станцією метро в Європі (105.5 м).'
    ],
    proTipsEn: [
      'Ride the historical Funicular directly from Podil to Mykhailivska Square using contactless tap-to-pay.',
      'Behind the National History Museum near Landscape Alley lies a serene secret balcony overlooking the red roofs of Podil.',
      'Arsenalna is the deepest metro station in Europe (105.5 meters) — take the scenic dual-escalator descent.'
    ],
    foodsUk: ['Київська перепічка на Театральній', 'Котлета по-київськи з вершковим маслом і кропом', 'Торт Київський', 'Сирники зі сметаною та ягодами'],
    foodsEn: ['Kyivska Perepichka hot dog bun', 'Classic Chicken Kyiv with herb butter', 'Kyiv Hazelnut Meringue Cake', 'Fluffy cottage cheese Syrnyky'],
    photoSpotsUk: ['Оглядовий майданчик Андріївської церкви', 'Скляний міст над Володимирським узвозом', 'Пейзажна алея біля мозаїчних котів', 'Поштова площа біля річкового вокзалу'],
    photoSpotsEn: ['Terrace of St. Andrew\'s Church', 'Glass Pedestrian Bridge over Volodymyrsky Descent', 'Mosaic Cats on Landscape Alley', 'Poshtova Square overlooking Dnipro river'],
    weatherAdviceUk: 'Зручне взуття обов\'язкове — перепади висот між Подолом та Верхнім містом і бруківка на Андріївському узвозі вимагають комфортної підошви.',
    weatherAdviceEn: 'Comfortable walking shoes are vital — the cobblestones of Andriyivsky Descent and hills between Podil and Old Town require solid grip.',
    stops: [
      {
        id: 'kyiv-1',
        nameUk: 'Кав’ярня «Yellow Place» або «First Point»',
        nameEn: 'Specialty Coffee at First Point / Podil',
        category: 'coffee',
        descUk: 'Атмосферний ранок на Подолі зі спешелті-кавою, свіжоспеченим мигдалевим круасаном та спостереженням за трамваями.',
        descEn: 'A crisp morning in bohemian Podil with third-wave pour-over coffee, warm pastries, and heritage tram watching.',
        tipUk: 'Візьміть каву take-away та сядьте на лавочці на Спаській — тут чудове ранкове сонце.',
        tipEn: 'Order a flat white with oat milk and take a seat outside on Spaska street.',
        costUSD: 4,
        duration: 45,
        coords: { lat: 50.4655, lng: 30.5142 },
        address: 'вул. Ярославська 14 / вул. Спаська, Поділ',
        moods: ['relaxed', 'foodie', 'romantic'],
        timeSlot: 'morning'
      },
      {
        id: 'kyiv-2',
        nameUk: 'Київський Фунікулер та Михайлівський Золотоверхий собор',
        nameEn: 'Kyiv Funicular & St. Michael\'s Golden-Domed Monastery',
        category: 'sight',
        descUk: 'Підйом на 119-річному фунікулері прямо до блакитних стін Михайлівського собору з казковим передзвоном курантів.',
        descEn: 'Scenic hill climb on the 119-year-old historic funicular railway right to the sky-blue St. Michael\'s Monastery.',
        tipUk: 'Зайдіть у внутрішній сад собору — там розташований затишний фонтан із чудовою акустикою.',
        tipEn: 'Enter the peaceful monastery inner courtyard to hear the authentic carillon bells.',
        costUSD: 1,
        duration: 50,
        coords: { lat: 50.4556, lng: 30.5230 },
        address: 'вул. Трьохсвятительська, 8',
        moods: ['cultural', 'romantic', 'relaxed', 'hidden_gems'],
        timeSlot: 'morning'
      },
      {
        id: 'kyiv-3',
        nameUk: 'Андріївський узвіз та тераса Андріївської церкви',
        nameEn: 'Andriyivsky Descent & St. Andrew’s Terrace',
        category: 'viewpoint',
        descUk: 'Серце богемного Києва: вернісаж художників, будинок Булгакова та панорамна балюстрада Растреллі над Подолом.',
        descEn: 'The Montmartre of Kyiv: open-air painting stalls, historic cast-iron streetlamps, and a 360-degree viewpoint over the Dnipro.',
        tipUk: 'Вхід на оглядову балюстраду церкви коштує символічні гроші, але вид на Подільські дахи перевершує всі очікування.',
        tipEn: 'Small entrance fee gets you to the outer terrace with the premier panoramic view of old Podil roofs.',
        costUSD: 2,
        duration: 60,
        coords: { lat: 50.4589, lng: 30.5178 },
        address: 'Андріївський узвіз, 23',
        moods: ['romantic', 'cultural', 'adventure', 'hidden_gems'],
        timeSlot: 'morning'
      },
      {
        id: 'kyiv-4',
        nameUk: 'Автентичний обід: «Канапка-бар» або «Остання Барикада»',
        nameEn: 'Modern Ukrainian Gastronomy: Kanapka Bar or Ostannya Barykada',
        category: 'lunch',
        descUk: 'Сучасна українська кухня: ніжні баноші з бринзою, сморреброди з тюлькою, крафтові наливки та свіжий фермерський хліб.',
        descEn: 'Contemporary Ukrainian dining: warm corn banosh with bryndza cheese, craft berry liqueurs, and artisan bread.',
        tipUk: 'Замовте дегустаційний сет локальних сирів із карпатським медом.',
        tipEn: 'Ask for the secret password entry at Ostannya Barykada for an interactive modern history experience.',
        costUSD: 14,
        duration: 75,
        coords: { lat: 50.4504, lng: 30.5235 },
        address: 'Майдан Незалежності / Андріївський узвіз',
        moods: ['foodie', 'romantic', 'cultural'],
        timeSlot: 'lunch'
      },
      {
        id: 'kyiv-5',
        nameUk: 'Пейзажна Алея та Секретні Дворики Верхнього Міста',
        nameEn: 'Landscape Alley & Hidden Courtyards of the Upper City',
        category: 'park',
        descUk: 'Скульптурний парк із казковими мозаїками котів-стоніжок та тихими садами біля фундаменту Десятинної церкви.',
        descEn: 'Whimsical park path lined with colorful ceramic mosaic sculptures, ancient linden trees, and serene overlook benches.',
        tipUk: 'Знайдіть бронзовий пам’ятник закоханим ліхтарям та скульптуру «Дощ» скульптора Назара Білика.',
        tipEn: 'Seek out Nazar Bilyk’s iconic "Rain" bronze sculpture with the giant bronze raindrop balancing on a man\'s face.',
        costUSD: 0,
        duration: 60,
        coords: { lat: 50.4563, lng: 30.5173 },
        address: 'Пейзажна алея, Верхній Київ',
        moods: ['relaxed', 'hidden_gems', 'romantic', 'cultural'],
        timeSlot: 'afternoon'
      },
      {
        id: 'kyiv-6',
        nameUk: 'Золоті Ворота та Каштановий сквер із Котом Пантелеймоном',
        nameEn: 'Golden Gate of Kyiv & Yaroslaviv Val Quarter',
        category: 'sight',
        descUk: 'Головна брама стародавньої Русі 1037 року, оточена затишними європейськими кав’ярнями та старовинними маєтками.',
        descEn: 'The monumental 11th-century gateway to Kievan Rus, bordered by elegant cafes and embassies on Yaroslaviv Val.',
        tipUk: 'Потріть бронзового кота Пантелеймона за вушко на удачу у фінансах та мандрах.',
        tipEn: 'Rub the ears of the bronze Persian cat Panteleimon statue in the square for good travel fortune.',
        costUSD: 3,
        duration: 50,
        coords: { lat: 50.4488, lng: 30.5133 },
        address: 'вул. Володимирська, 40-А',
        moods: ['cultural', 'hidden_gems', 'foodie'],
        timeSlot: 'afternoon'
      },
      {
        id: 'kyiv-7',
        nameUk: 'Золота година на Скляному мосту та у парку «Володимирська гірка»',
        nameEn: 'Golden Hour on the Glass Pedestrian Bridge & Volodymyr Hill',
        category: 'viewpoint',
        descUk: 'Фантастичний захід сонця над величним Дніпром, лівобережними мостами та зеленими схилами острова Труханів.',
        descEn: 'Breathtaking sunset vista over the broad Dnipro river, Trukhaniv Island forests, and glowing city bridges.',
        tipUk: 'Встаньте на прозору скляну секцію мосту — під ногами відкривається схил парку на висоті 32 метри.',
        tipEn: 'Look straight down through the tempered transparent floor glass panes for a rush of adrenaline.',
        costUSD: 0,
        duration: 55,
        coords: { lat: 50.4536, lng: 30.5286 },
        address: 'Парковий міст через Володимирський узвіз',
        moods: ['romantic', 'adventure', 'relaxed'],
        timeSlot: 'sunset'
      },
      {
        id: 'kyiv-8',
        nameUk: 'Вечеря та вечірній напій: «Китайський Привіт» або крафтовий бар «БарменДиктат»',
        nameEn: 'Dinner & Craft Cocktails: Barman Dictat or Podil Yard',
        category: 'dinner',
        descUk: 'Легендарний київський бар із найдовшою барною стійкою (13 метрів), живою музикою та сотнями рідкісних напоїв.',
        descEn: 'Vibrant evening hub with Europe’s most extensive backbar collection, jazz vibes, and intimate speakeasy ambience.',
        tipUk: 'Спробуйте авторський коктейль із місцевими лісовими травами або обліпиховий сауер.',
        tipEn: 'Try their house-infused sea buckthorn sour or walnut liqueur craft mix.',
        costUSD: 18,
        duration: 90,
        coords: { lat: 50.4441, lng: 30.5197 },
        address: 'вул. Хрещатик, 44 / вул. Велика Васильківська',
        moods: ['adventure', 'foodie', 'romantic'],
        timeSlot: 'evening'
      }
    ]
  },

  lviv: {
    nameUk: 'Львів',
    nameEn: 'Lviv',
    countryUk: 'Україна',
    countryEn: 'Ukraine',
    centerCoords: { lat: 49.8419, lng: 24.0315 },
    defaultCurrency: 'UAH',
    exchangeRateToUSD: 41.5,
    proTipsUk: [
      'Підніміться на Ратушу на площі Ринок о 12:00, щоб почути гімн міста на висоті 65 метрів.',
      'У Львові кава — це не просто напій, а релігія: замовляйте каву в джезві з корицею у старих двориках Вірменської вулиці.',
      'Купуйте квитки на вистави Львівської опери заздалегідь — інтер’єр залу з позолоченими каріатидами вражає навіть тих, хто не фанат опери.'
    ],
    proTipsEn: [
      'Climb the 400 stone steps of the Town Hall (Ratusha) tower right on Rynok Square for panoramic red-tiled roof views.',
      'Armenian street is the heart of slow coffee culture: sit on the stone doorsteps with a freshly brewed cezve coffee.',
      'Step into the Italian Courtyard for Renaissance loggias and silent courtyard classical music.'
    ],
    foodsUk: ['Львівський сирник із шоколадною глазур\'ю', 'Запаяна кава з карамельною скоринкою', 'Галицький борщ із вушками', 'Шоколадні цукерки ручної роботи'],
    foodsEn: ['Classic Lviv Syrnyk with dark chocolate crust', 'Flame-broiled caramelized coffee', 'Galician Borscht with mushroom vushky', 'Handcrafted truffles from Lviv Handmade Chocolate'],
    photoSpotsUk: ['Дворик Італійського палаццо', 'Вірменський дворик з дерев\'яною Голгофою', 'Високий Замок на сході чи заході сонця', 'Вулиця Лесі Українки біля ліхтарів'],
    photoSpotsEn: ['Italian Renaissance Courtyard arcades', 'Armenian Cathedral Courtyard Calvary', 'High Castle hill panoramic lookout', 'Lesia Ukrainka Street stone arcades'],
    weatherAdviceUk: 'Львів славиться раптовими теплими дощами («хлющами») — завжди майте із собою компактну парасольку.',
    weatherAdviceEn: 'Lviv weather is famous for brief poetic rains — always keep a small folding umbrella in your daypack.',
    stops: [
      {
        id: 'lviv-1',
        nameUk: '«Світ Кави» на площі Катедральній',
        nameEn: 'Morning Pour-over at Svit Kavy on Cathedral Square',
        category: 'coffee',
        descUk: 'Еталонна львівська кав’ярня з видом на готичний Латинський собор. Запах свіжозмеленої арабіки та галицьких маківників.',
        descEn: 'Award-winning specialty coffee sanctuary overlooking the Latin Cathedral with house-made poppy seed cakes.',
        tipUk: 'Оберіть столик на вулиці або на другому поверсі біля вікна з видом на площу.',
        tipEn: 'Snag an outdoor table right facing the 14th-century cathedral facade.',
        costUSD: 3.5,
        duration: 45,
        coords: { lat: 49.8408, lng: 24.0308 },
        address: 'пл. Катедральна, 6',
        moods: ['relaxed', 'romantic', 'foodie'],
        timeSlot: 'morning'
      },
      {
        id: 'lviv-2',
        nameUk: 'Площа Ринок, Чорна Кам’яниця та Італійський дворик',
        nameEn: 'Rynok Square & Italian Renaissance Courtyard',
        category: 'sight',
        descUk: 'Серце старого Львова зі середньовічною бруківкою, чотирма фонтанами з античними богами та ренесансним палаццо Корнякта.',
        descEn: 'UNESCO World Heritage cobblestone main square featuring 16th-century merchant houses and tranquil Mediterranean arcades.',
        tipUk: 'Зайдіть всередину Італійського дворика — вхід коштує копійки, а акустика та спокій неймовірні.',
        tipEn: 'Enter the Italian Courtyard loggia: enjoy acoustic violin notes and escape the street bustling.',
        costUSD: 2,
        duration: 60,
        coords: { lat: 49.8418, lng: 24.0322 },
        address: 'пл. Ринок, 6',
        moods: ['cultural', 'romantic', 'hidden_gems'],
        timeSlot: 'morning'
      },
      {
        id: 'lviv-3',
        nameUk: 'Вірменський кафедральний собор XIV століття',
        nameEn: '14th-Century Armenian Cathedral & Mystic Frescoes',
        category: 'museum',
        descUk: 'Унікальний містичний храм із рідкісними купольними фресками художника Яна Генріка Розена, подібних яким немає в Європі.',
        descEn: 'Enigmatic medieval sanctuary decorated with haunting, ethereal Art Nouveau wall murals painted in the 1920s.',
        tipUk: 'Погляньте на розпис «Тайна вечеря» та фігури покровителів у нішах — освітлення свічками створює магічний ефект.',
        tipEn: 'Quietly observe the ceiling cupola: when rays of sun pierce the dust, it looks otherworldly.',
        costUSD: 1.5,
        duration: 45,
        coords: { lat: 49.8433, lng: 24.0310 },
        address: 'вул. Вірменська, 7',
        moods: ['cultural', 'hidden_gems', 'romantic'],
        timeSlot: 'morning'
      },
      {
        id: 'lviv-4',
        nameUk: 'Галицький обід у ресторації «Трапезна Ідей» у Бернардинському монастирі',
        nameEn: 'Galician Lunch at Trapezna Idey (Bernardine Monastery)',
        category: 'lunch',
        descUk: 'Таємна підземна трапезна в склепіннях XVII століття з керамічним посудом, цибулевим пирогом і справжніми монастирськими сирами.',
        descEn: 'Hidden vaulted cellars inside a 17th-century monastery offering rustic Galician heritage recipes on ceramic plates.',
        tipUk: 'Спробуйте традиційну зупу з білих карпатських грибів та фірмову наливку зі смородини.',
        tipEn: 'Order the wild Carpathian porcini mushroom soup served in a clay bowl.',
        costUSD: 11,
        duration: 75,
        coords: { lat: 49.8392, lng: 24.0345 },
        address: 'вул. Валова, 18а (подвір’я монастиря)',
        moods: ['foodie', 'hidden_gems', 'cultural'],
        timeSlot: 'lunch'
      },
      {
        id: 'lviv-5',
        nameUk: 'Таємні подвір’я та Пасаж Гаусмана (Крива Липа)',
        nameEn: 'Secret Passages & Kryva Lypa Courtyards',
        category: 'hidden_spot',
        descUk: 'Затишний пішохідний провулок зі сторічною липою, кав’ярнями, книжковими крамницями та відсутністю авто.',
        descEn: 'Charming secluded pedestrian alley named after a twisted century-old linden tree, lined with indie bookshops and artisan stalls.',
        tipUk: 'Знайдіть малу кав\'ярню на кутку та візьміть какао з зефірками або трав\'яний карпатський збір.',
        tipEn: 'Great stop for buying natural lavender sachets and small artisan ceramics.',
        costUSD: 3,
        duration: 45,
        coords: { lat: 49.8410, lng: 24.0267 },
        address: 'проїзд Крива Липа',
        moods: ['relaxed', 'romantic', 'hidden_gems'],
        timeSlot: 'afternoon'
      },
      {
        id: 'lviv-6',
        nameUk: 'Підйом на Високий Замок або Лису Гору (Піскова)',
        nameEn: 'Sunset Ascent to High Castle Hill Panorama',
        category: 'viewpoint',
        descUk: 'Найвища точка Львова (413 метрів), звідки відкривається кругова панорама на всі шпилі, костели та дахи старого міста.',
        descEn: 'The highest summit in Lviv offering an unhindered 360-degree sunset spectacle over church spires and green hills.',
        tipUk: 'Прийдіть за 30 хвилин до заходу сонця, щоб побачити, як запалюються вогні на Ратуші та Оперному театрі.',
        tipEn: 'Bring a light windbreaker jacket, as the summit hill breeze can be cool at dusk.',
        costUSD: 0,
        duration: 70,
        coords: { lat: 49.8482, lng: 24.0394 },
        address: 'парк «Високий Замок»',
        moods: ['romantic', 'adventure', 'relaxed'],
        timeSlot: 'sunset'
      },
      {
        id: 'lviv-7',
        nameUk: 'Вечірня дегустація: Театр пива «Правда» або «П’яна Вишня»',
        nameEn: 'Evening Craft Vibes: Pravda Beer Theatre or Drunken Cherry',
        category: 'nightlife',
        descUk: 'Живий духовий оркестр, що грає рок-хіти, або затишні високі келихи теплої крафтової вишнівки під львівськими зорями.',
        descEn: 'Lively brass orchestra performing live hits over craft brews, or standing under the chandeliers sipping cherry cordial.',
        tipUk: 'Біля «П’яної Вишні» завжди багато людей, візьміть келих та станьте біля фонтану Нептуна.',
        tipEn: 'Sip on real fermented sour cherries at the bottom of the crystal glass.',
        costUSD: 8,
        duration: 80,
        coords: { lat: 49.8423, lng: 24.0318 },
        address: 'пл. Ринок, 11 / пл. Ринок, 32',
        moods: ['adventure', 'foodie', 'relaxed'],
        timeSlot: 'evening'
      }
    ]
  },

  rome: {
    nameUk: 'Рим',
    nameEn: 'Rome',
    countryUk: 'Італія',
    countryEn: 'Italy',
    centerCoords: { lat: 41.9028, lng: 12.4964 },
    defaultCurrency: 'EUR',
    exchangeRateToUSD: 1.08,
    proTipsUk: [
      'У Римі скрізь є безкоштовні питні фонтанчики «nasone» з чистою крижаною водою — не купуйте пластикові пляшки.',
      'Капучино в Італії п’ють лише до 11:00 ранку, а еспресо біля стійки коштує вдвічі дешевше, ніж за столиком.',
      'Пантеон вимагає попереднього бронювання квитків на вихідні, але ззовні на площі Piazza della Rotonda сидіти не менш чарівно.'
    ],
    proTipsEn: [
      'Carry a reusable bottle: Rome has over 2,500 historic drinking fountains called "nasoni" with icy fresh mountain spring water.',
      'Drink your espresso at the bar counter ("al banco") like locals do — it costs around €1.20 vs €4+ when seated.',
      'Trestevere awakens after 19:30 for authentic Roman trattoria dinners: look for paper tablecloths and handwritten menus.'
    ],
    foodsUk: ['Справжня паста Carbonara (без вершків, лише гуанчале та пекоріно)', 'Паста Cacio e Pepe', 'Римська піца аль тальйо (хрустка)', 'Gelato з фісташкою Бронте'],
    foodsEn: ['Authentic Spaghetti Carbonara with crispy guanciale', 'Creamy Cacio e Pepe pasta', 'Crispy Roman pizza al taglio', 'Sicilian Bronte pistachio artisan gelato'],
    photoSpotsUk: ['Пантеон крізь вузьку арку via degli Orfani', 'Міст Святого Ангела на заході сонця', 'Апельсиновий сад на Авентинському пагорбі', 'Фонтан Треві на світанку (без натовпу)'],
    photoSpotsEn: ['Pantheon peek through Via degli Orfani alley', 'Ponte Sant\'Angelo statues at golden hour', 'Orange Garden (Giardino degli Aranci) terrace', 'Trevi Fountain at early morning glow'],
    weatherAdviceUk: 'Влітку сонце дуже активне — обов’язково візьміть капелюх та сонцезахисний крем; у соборах плечі й коліна мають бути закриті.',
    weatherAdviceEn: 'Summers are scorching: carry sun protection and ensure shoulders/knees are modestly covered for entering historic basilicas.',
    stops: [
      {
        id: 'rome-1',
        nameUk: 'Ранковий еспресо та мартоццо в «Sant\'Eustachio Il Caffè»',
        nameEn: 'Espresso & Maritozzo at Sant\'Eustachio Il Caffè',
        category: 'coffee',
        descUk: 'Легендарна кав’ярня з 1938 року біля Пантеону з секретною густою пінкою crema та повітряною булочкою з вершками.',
        descEn: 'Historic coffee institution since 1938 brewing their famed wood-roasted blend with velvety natural froth.',
        tipUk: 'Замовляйте біля каси, а чек віддайте бариста біля стійки з чайовими в 50 центів.',
        tipEn: 'Pay at the till first, then place your receipt with a coin on the zinc bar.',
        costUSD: 4,
        duration: 40,
        coords: { lat: 41.8982, lng: 12.4746 },
        address: 'Piazza di S. Eustachio, 82',
        moods: ['foodie', 'cultural', 'relaxed'],
        timeSlot: 'morning'
      },
      {
        id: 'rome-2',
        nameUk: 'Величний Пантеон та площа Ротонда',
        nameEn: 'The Mighty Pantheon & Piazza della Rotonda',
        category: 'sight',
        descUk: '2000-річний римський храм із найбільшим у світі неармованим бетонним куполом та відкритим окулюсом у небо.',
        descEn: 'Best-preserved Roman monument on Earth with its grand open-eye oculus beam of light illuminating marble tombs.',
        tipUk: 'Подивіться на підлогу під окулюсом: мармур має невеликі отвори для стікання дощової води.',
        tipEn: 'Notice the gentle floor curve with hidden drainage holes drilled by ancient Roman engineers.',
        costUSD: 6,
        duration: 50,
        coords: { lat: 41.8986, lng: 12.4769 },
        address: 'Piazza della Rotonda',
        moods: ['cultural', 'romantic'],
        timeSlot: 'morning'
      },
      {
        id: 'rome-3',
        nameUk: 'Площа Навона та барокові фонтани Берніні',
        nameEn: 'Piazza Navona & Bernini’s Four Rivers Fountain',
        category: 'sight',
        descUk: 'Колишній стадіон Доміціана, перетворений на розкішну овальну площу з шедеврами епохи бароко та вуличними художниками.',
        descEn: 'Sweeping Baroque plaza built over Emperor Domitian’s chariot stadium, centered by Bernini’s monumental Fountain of the Four Rivers.',
        tipUk: 'Обійдіть фонтан Чотирьох річок з усіх боків — кожна алегорична фігура континенту має свій вираз обличчя.',
        tipEn: 'Find the Rio de la Plata statue shielding its eyes humorously facing Borromini\'s church facade.',
        costUSD: 0,
        duration: 45,
        coords: { lat: 41.8992, lng: 12.4731 },
        address: 'Piazza Navona',
        moods: ['cultural', 'romantic', 'relaxed'],
        timeSlot: 'morning'
      },
      {
        id: 'rome-4',
        nameUk: 'Римський обід у Трастевере: Тратторія «Da Enzo al 29»',
        nameEn: 'Trastevere Feast at Trattoria Da Enzo al 29',
        category: 'lunch',
        descUk: 'Культова автентична тратторія з ідеальною Cacio e Pepe, хрустким смаженим артишоком Carciofo alla Giudia та домашнім вином.',
        descEn: 'Beloved neighborhood trattoria serving the definitive Roman pasta classics, deep-fried artichokes, and rustic house red.',
        tipUk: 'Приходьте за 15 хвилин до відкриття о 12:15, щоб зайняти столик без довгої черги.',
        tipEn: 'Arrive 15 minutes before lunch opening to beat the neighborhood line.',
        costUSD: 24,
        duration: 75,
        coords: { lat: 41.8885, lng: 12.4782 },
        address: 'Via dei Vascellari, 29, Trastevere',
        moods: ['foodie', 'romantic'],
        timeSlot: 'lunch'
      },
      {
        id: 'rome-5',
        nameUk: 'Апельсиновий сад (Giardino degli Aranci) та Замкова щілина Мальти',
        nameEn: 'Orange Garden (Aventine Hill) & The Knights of Malta Keyhole',
        category: 'hidden_spot',
        descUk: 'Аромат цитрусових дерев, спокійний пагорб Авентин та секретна замкова щілина, де в ідеальному ракурсі видно купол Святого Петра.',
        descEn: 'Fragrant citrus garden with a tranquil panoramic balustrade, plus the famous brass keyhole framing St. Peter\'s dome in three states.',
        tipUk: 'Зазирніть в отвір замка на площі Мальтійських лицарів — це одне з найдивовижніших оптичних вражень у світі.',
        tipEn: 'Peer through the unassuming green gate keyhole in Piazza dei Cavalieri di Malta for the triple-country optical trick.',
        costUSD: 0,
        duration: 60,
        coords: { lat: 41.8848, lng: 12.4795 },
        address: 'Piazza Pietro D\'Illiria, Aventino',
        moods: ['hidden_gems', 'romantic', 'relaxed'],
        timeSlot: 'afternoon'
      },
      {
        id: 'rome-6',
        nameUk: 'Колізей та Римський Форум із пагорба Палатин',
        nameEn: 'Colosseum & Roman Forum Exterior Panoramas',
        category: 'sight',
        descUk: 'Грандіозний амфітеатр Флавіїв, величні арки Тріумфу та античні колони на тлі теплого римського неба.',
        descEn: 'The awe-inspiring epicenter of imperial Rome: ancient stone arches, cypress trees, and triumphal avenues.',
        tipUk: 'Кращий ракурс для фото без натовпу — з мосту на Via Nicola Salvi прямо над станцією метро Colosseo.',
        tipEn: 'Climb the stone terrace ledge above Colosseo metro entrance for an elevated backdrop photo.',
        costUSD: 0,
        duration: 70,
        coords: { lat: 41.8902, lng: 12.4922 },
        address: 'Piazza del Colosseo, 1',
        moods: ['cultural', 'adventure'],
        timeSlot: 'sunset'
      },
      {
        id: 'rome-7',
        nameUk: 'Вечірнє джелато в «Frigidarium» та прогулянка до освітленого Фонтану Треві',
        nameEn: 'Night Artisan Gelato at Frigidarium & Illumined Trevi Fountain',
        category: 'nightlife',
        descUk: 'Натуральне джелато, занурене в теплий чорний або білий шоколад, та споглядання сяючих мармурових скульптур Треві ввечері.',
        descEn: 'Velvety artisanal gelato dipped in a crisp dark chocolate shell, strolled through cobblestone alleys to the illuminated Trevi waters.',
        tipUk: 'Киньте монетку правою рукою через ліве плече у фонтан Треві, щоб гарантовано повернутися до Вічного міста.',
        tipEn: 'Toss a coin with your right hand over your left shoulder to ensure your return to Rome.',
        costUSD: 5,
        duration: 60,
        coords: { lat: 41.9009, lng: 12.4833 },
        address: 'Piazza di Trevi',
        moods: ['romantic', 'foodie', 'relaxed'],
        timeSlot: 'evening'
      }
    ]
  },

  paris: {
    nameUk: 'Париж',
    nameEn: 'Paris',
    countryUk: 'Франція',
    countryEn: 'France',
    centerCoords: { lat: 48.8566, lng: 2.3522 },
    defaultCurrency: 'EUR',
    exchangeRateToUSD: 1.08,
    proTipsUk: [
      'Не сідайте в кафе прямо перед Ейфелевою вежею — зайдіть у квартал Марсового поля чи Сен-Жермен за автентичними круасанами.',
      'Найкращий вид на Ейфелеву вежу — не з її вершини (звідки її не видно!), а з тераси універмагу Galeries Lafayette або вежі Монпарнас.',
      'Купуйте квитки в Лувр та Орсе суворо заздалегідь з фіксованим часовим слотом.'
    ],
    proTipsEn: [
      'The best view of the Eiffel Tower is never from the top itself: head to the free rooftop of Galeries Lafayette or Pont de Bir-Hakeim.',
      'Order "une carafe d\'eau" in any bistro: by French law, tap water is complimentary and impeccably filtered.',
      'Pick up a warm baguette and French Comté cheese from a local "fromagerie" for an impromptu Seine embankment picnic.'
    ],
    foodsUk: ['Хрусткий свіжий багет традисьйон', 'Круасан на вершковому маслі Isigny', 'Качине конфі з картоплею sarladaise', 'Французькі макарони Ladurée або Pierre Hermé'],
    foodsEn: ['Artisan Baguette de Tradition', 'Flaky pure AOP butter Croissant', 'Crispy Duck Confit', 'Pierre Hermé signature Ispahan macarons'],
    photoSpotsUk: ['Міст Бір-Хакейм з видом на Сену та Ейфелеву вежу', 'Вуличка Rue de l\'Abreuvoir на Монмартрі біля La Maison Rose', 'Сад Тюїльрі біля зелених стільців', 'Площа Вогезів у кварталі Маре'],
    photoSpotsEn: ['Pont de Bir-Hakeim arched framing of Eiffel Tower', 'Rue de l\'Abreuvoir near La Maison Rose in Montmartre', 'Tuileries Garden green metal park chairs', 'Symmetrical arcades of Place des Vosges'],
    weatherAdviceUk: 'Париж прекрасний у будь-яку погоду, але легкий тренч або плащ додасть вашому образу справжнього паризького шику.',
    weatherAdviceEn: 'A light trench coat or wool scarf keeps you warm against riverside breezes along the Seine.',
    stops: [
      {
        id: 'paris-1',
        nameUk: 'Ранковий круасан та café crème у пекарні «Du Pain et des Idées»',
        nameEn: 'Artisan Bakery Breakfast at Du Pain et des Idées',
        category: 'coffee',
        descUk: 'Столітня автентична булочна з розписними стелями 1875 року та найкращим фісташковим «равликом» (Escargot chocolat pistache).',
        descEn: 'Historic 1875 bakery adorned with vintage bevelled mirrors, renowned for its legendary chocolate-pistachio escargot pastry.',
        tipUk: 'Візьміть теплу випічку та пройдіть 50 метрів до набережної каналу Сен-Мартен.',
        tipEn: 'Take your warm pastry and sit on the iron footbridges of Canal Saint-Martin.',
        costUSD: 6,
        duration: 45,
        coords: { lat: 48.8712, lng: 2.3629 },
        address: '34 Rue Yves Toudic, 75010 Paris',
        moods: ['foodie', 'romantic', 'relaxed'],
        timeSlot: 'morning'
      },
      {
        id: 'paris-2',
        nameUk: 'Художній Монмартр, базиліка Сакре-Кер та площа Тертр',
        nameEn: 'Bohemian Montmartre, Sacré-Cœur & Place du Tertre',
        category: 'sight',
        descUk: 'Білосніжна базиліка на найвищому пагорбі Парижа, виноградник Монмартра та романтичні звивисті вулички Пікассо й Ван Гога.',
        descEn: 'The historic village hill of artists, topped by the striking chalk-white Romano-Byzantine Sacré-Cœur basilica overlooking all of Paris.',
        tipUk: 'Уникайте фунікулера — підніміться сходами крізь сад Square Louise Michel під звуки вуличних арфістів.',
        tipEn: 'Walk through the park stairs listening to acoustic musicians instead of waiting for the funicular line.',
        costUSD: 0,
        duration: 75,
        coords: { lat: 48.8867, lng: 2.3431 },
        address: '35 Rue du Chevalier de la Barre',
        moods: ['romantic', 'cultural', 'adventure'],
        timeSlot: 'morning'
      },
      {
        id: 'paris-3',
        nameUk: 'Атмосферний обід у класичному паризькому бістро «Bouillon Chartier»',
        nameEn: 'Traditional Parisian Lunch at Historic Bouillon Chartier',
        category: 'lunch',
        descUk: 'Величний ресторан у стилі Belle Époque з 1896 року, де офіціанти у чорних фраках записують замовлення просто на паперовій скатертині.',
        descEn: 'Atmospheric 1896 Belle Époque dining hall where waiters in traditional waistcoats tally your bill directly on the paper tablecloth.',
        tipUk: 'Замовте цибулевий суп з плавленим сиром та домашній тарт татен за дуже помірні гроші.',
        tipEn: 'Order classic French onion soup gratinée and roasted poulet fermier for unbelievable value.',
        costUSD: 18,
        duration: 70,
        coords: { lat: 48.8719, lng: 2.3433 },
        address: '7 Rue du Faubourg Montmartre',
        moods: ['foodie', 'cultural'],
        timeSlot: 'lunch'
      },
      {
        id: 'paris-4',
        nameUk: 'Квартал Маре, Площа Вогезів та книгарня «Shakespeare and Company»',
        nameEn: 'Le Marais Aristocratic Mansions & Shakespeare and Co',
        category: 'hidden_spot',
        descUk: 'Найстаріша спроєктована площа Парижа 1612 року з цегляними павільйонами, секретними двориками готелів та культовою англійською книгарнею.',
        descEn: 'Graceful Renaissance red-brick arcades where Victor Hugo lived, coupled with legendary literary hideaways along the Seine.',
        tipUk: 'У Shakespeare and Company підніміться на другий поверх — там стоїть старовинна друкарська машинка і живе бібліотечний кіт.',
        tipEn: 'Head upstairs at Shakespeare & Company to play the vintage piano and find cozy reading corners.',
        costUSD: 0,
        duration: 60,
        coords: { lat: 48.8527, lng: 2.3471 },
        address: 'Place des Vosges / 37 Rue de la Bûcherie',
        moods: ['cultural', 'romantic', 'hidden_gems'],
        timeSlot: 'afternoon'
      },
      {
        id: 'paris-5',
        nameUk: 'Острів Сіте та величний собор Нотр-Дам',
        nameEn: 'Île de la Cité & Restored Notre-Dame Cathedral',
        category: 'sight',
        descUk: 'Історичне колиска Парижа посеред річки Сена, овіяна легендами про Квазімодо, з готичними контрфорсами та сквером Жана XXIII.',
        descEn: 'The medieval island birthplace of Paris, home to the Gothic majesty of Notre-Dame Cathedral and scenic willow trees at Square du Vert-Galant.',
        tipUk: 'Спустіться на західний край острова до скверу Vert-Galant — чудове місце відпочити прямо біля плескоту хвиль Сени.',
        tipEn: 'Sit at the very tip of Square du Vert-Galant to watch cruise boats glide under Pont Neuf.',
        costUSD: 0,
        duration: 50,
        coords: { lat: 48.8530, lng: 2.3499 },
        address: '6 Parvis Notre-Dame - Pl. Jean-Paul II',
        moods: ['cultural', 'romantic'],
        timeSlot: 'afternoon'
      },
      {
        id: 'paris-6',
        nameUk: 'Золота година біля мосту Олександра III',
        nameEn: 'Golden Hour at Pont Alexandre III',
        category: 'viewpoint',
        descUk: 'Найрозкішніший міст французької столиці з позолоченими пегасами, витонченими ліхтарями та видом на Гран-Пале й Ейфелеву вежу.',
        descEn: 'Paris’s most flamboyant Beaux-Arts bridge adorned with winged golden horses, ornate cherub candelabras, and sunset reflections.',
        tipUk: 'О 21:00 чи на початку кожної години після заходу сонця Ейфелева вежа спалахує тисячами мерехтливих діамантових вогників на 5 хвилин.',
        tipEn: 'Wait for the top of the hour after dark to watch the Eiffel Tower sparkle with 20,000 flashbulbs.',
        costUSD: 0,
        duration: 50,
        coords: { lat: 48.8638, lng: 2.3135 },
        address: 'Pont Alexandre III',
        moods: ['romantic', 'adventure', 'relaxed'],
        timeSlot: 'sunset'
      },
      {
        id: 'paris-7',
        nameUk: 'Вечірнє вино та сирна тарілка в Сен-Жермен-де-Пре',
        nameEn: 'Evening Wine & Fromage in Saint-Germain-des-Prés',
        category: 'nightlife',
        descUk: 'Квінтесенція паризького вечора: маленький вуличний круглий столик, келих Côtes du Rhône, сири Камамбер і Брі та некваплива розмова.',
        descEn: 'Classic Parisian wicker chair facing the bustling boulevard, sipping Burgundy Pinot Noir and savoring ripe artisanal cheeses.',
        tipUk: 'Якщо шукаєте атмосферу джазу, зазирніть у підвальний клуб «Caveau de la Huchette».',
        tipEn: 'For live swing and bebop, duck down into the 16th-century stone cellar of Caveau de la Huchette.',
        costUSD: 22,
        duration: 80,
        coords: { lat: 48.8538, lng: 2.3332 },
        address: 'Boulevard Saint-Germain',
        moods: ['romantic', 'adventure', 'foodie'],
        timeSlot: 'evening'
      }
    ]
  },

  barcelona: {
    nameUk: 'Барселона',
    nameEn: 'Barcelona',
    countryUk: 'Іспанія',
    countryEn: 'Spain',
    centerCoords: { lat: 41.3879, lng: 2.1699 },
    defaultCurrency: 'EUR',
    exchangeRateToUSD: 1.08,
    proTipsUk: [
      'Вечеря в Іспанії починається пізно: більшість автентичних тапас-барів відкривають кухню не раніше 20:30.',
      'Квитки до Саграда Фамілія розкуповуються за тижні наперед — обов’язково бронюйте онлайн ранковий слот із сонячними променями крізь вітражі.',
      'Слідкуйте за сумками на бульварі Ла Рамбла та в метро — це найпопулярніше місце для кишенькових злодіїв.'
    ],
    proTipsEn: [
      'Locals eat dinner late: true tapas joints rarely fill up before 20:30 or 21:00.',
      'Book Sagrada Família morning slot tickets weeks in advance: the eastern stained-glass windows cast dazzling cobalt and emerald hues.',
      'Use the T-Casual 10-journey transit card for easy hop-on metro and bus trips across the city center.'
    ],
    foodsUk: ['Тапас Pan con Tomate з хамоном Іберіко', 'Паелья з морепродуктами біля моря', 'Чуррос із густим гарячим шоколадом', 'Освіжаюча Сангрія з цитрусовими'],
    foodsEn: ['Crispy Pan con Tomate with Jamón Ibérico', 'Seafood Paella cooked in wide iron pan', 'Warm churros dipped in rich melted chocolate', 'Chilled white sangria with fresh peaches'],
    photoSpotsUk: ['Дах будинку Каса Бальо або Каса Міла (Ла Педрера)', 'Парк Гуель з мозаїчною лавою над містом', 'Готичний місток Pont del Bisbe у Готичному кварталі', 'Пляж Барселонета на світанку'],
    photoSpotsEn: ['Gaudí\'s mosaic serpent bench in Park Güell', 'Neo-Gothic marble bridge (Pont del Bisbe) in Barri Gòtic', 'Casa Batlló organic dragon roof terrace', 'Barceloneta boardwalk palm trees at dawn'],
    weatherAdviceUk: 'Середземноморський клімат дуже комфортний, але сонцезахисні окуляри та легкий лляний одяг є мастхевом.',
    weatherAdviceEn: 'Mild coastal climate year-round; breathable cotton or linen clothing and sunglasses are your best friends.',
    stops: [
      {
        id: 'bcn-1',
        nameUk: 'Ранковий гарячий шоколад і чуррос у «Granja M. Viader»',
        nameEn: 'Churros con Chocolate at Granja M. Viader (Since 1870)',
        category: 'coffee',
        descUk: 'Найстаріша молочна кондитерська Барселони 1870 року в серці Готичного кварталу, де винайшли шоколадний напій Cacaolat.',
        descEn: 'Historic 1870 cafe tucked off La Rambla, renowned for crispy churros served with thick dark Spanish dipping chocolate.',
        tipUk: 'Замовте порцію чуррос із суісо (збитими домашніми вершками).',
        tipEn: 'Ask for "chocolate con suizo" topped with generous dollops of fresh thick cream.',
        costUSD: 5,
        duration: 45,
        coords: { lat: 41.3822, lng: 2.1712 },
        address: 'Carrer d\'en Xuclà, 4-6, El Raval',
        moods: ['foodie', 'relaxed', 'cultural'],
        timeSlot: 'morning'
      },
      {
        id: 'bcn-2',
        nameUk: 'Готичний квартал (Barri Gòtic) та Кафедральний собор',
        nameEn: 'Gothic Quarter Labrynth & Pont del Bisbe',
        category: 'sight',
        descUk: 'Лабіринт середньовічних кам’яних вуличок, тихі площі з фонтанами та легендарний місток Pont del Bisbe.',
        descEn: 'Mesmerizing maze of Roman and medieval sandstone corridors, secluded plazas with acoustic guitarists, and historic gargoyles.',
        tipUk: 'Зайдіть у внутрішній клуатр Кафедрального собору — там живуть 13 білих гусей на честь святої Евлалії.',
        tipEn: 'Visit the cathedral cloister to see the 13 white geese honoring Saint Eulalia.',
        costUSD: 3,
        duration: 60,
        coords: { lat: 41.3840, lng: 2.1762 },
        address: 'Pla de la Seu, s/n',
        moods: ['cultural', 'romantic', 'hidden_gems'],
        timeSlot: 'morning'
      },
      {
        id: 'bcn-3',
        nameUk: 'Ринок Бокерія (Mercat de la Boqueria) або Санта-Катерина',
        nameEn: 'La Boqueria & Santa Caterina Market Gastronomy',
        category: 'foodie' as any,
        descUk: 'Вибух кольорів, смаків та ароматів: хамон Bellota, свіжі мангові смузі, оливки з анчоусами та морепродукти на грилі.',
        descEn: 'Iconic iron-framed market packed with kaleidoscopic fruit stalls, hanging aged hams, and buzzing tapas bars.',
        tipUk: 'Для спокійнішого обіду без штовханини оберіть сусідній ринок Санта-Катерина з хвилястим різнокольоровим дахом.',
        tipEn: 'For less bustle, walk 5 minutes east to Santa Caterina Market under its wavy ceramic roof.',
        costUSD: 12,
        duration: 50,
        coords: { lat: 41.3817, lng: 2.1715 },
        address: 'La Rambla, 91',
        moods: ['foodie', 'adventure'],
        timeSlot: 'lunch'
      },
      {
        id: 'bcn-4',
        nameUk: 'Храм Святого Сімейства (Саграда Фамілія)',
        nameEn: 'Basílica de la Sagrada Família (Gaudí\'s Masterpiece)',
        category: 'sight',
        descUk: 'Найвеличніший довгобуд світу Антоніо Гауді з колонами у вигляді кам’яного лісу та фантастичними кольоровими вітражами.',
        descEn: 'Gaudí\'s awe-inspiring forest of stone tree columns and kaleidoscopic stained glass radiating cosmic light.',
        tipUk: 'Обов’язково обійдіть храм з боку ставка на Plaça de Gaudí для дзеркального відображення веж у воді.',
        tipEn: 'Walk across to the pond at Plaça de Gaudí for the iconic postcard water reflection photo.',
        costUSD: 28,
        duration: 90,
        coords: { lat: 41.4036, lng: 2.1744 },
        address: 'Carrer de Mallorca, 401',
        moods: ['cultural', 'romantic', 'adventure'],
        timeSlot: 'afternoon'
      },
      {
        id: 'bcn-5',
        nameUk: 'Парк Гуель та панорама Барселони',
        nameEn: 'Park Güell Mosaic Balconies & Fairy-tale Pavilions',
        category: 'park',
        descUk: 'Казковий сад Гауді з мозаїчною саламандрою, пряниковими будиночками та звивистою лавою з краєвидом на море.',
        descEn: 'Surreal hillside utopian park adorned with multicolored trencadís tilework and sweeping vistas out to the blue sea.',
        tipUk: 'Якщо квитків немає в монументальну зону, верхні стежки парку безкоштовні і мають ще вищий краєвид на місто.',
        tipEn: 'The upper forested trails around the Three Crosses are free to access and offer even higher panoramic viewpoints.',
        costUSD: 10,
        duration: 75,
        coords: { lat: 41.4145, lng: 2.1527 },
        address: 'Carrer d\'Olot',
        moods: ['cultural', 'romantic', 'adventure'],
        timeSlot: 'afternoon'
      },
      {
        id: 'bcn-6',
        nameUk: 'Золота година на набережній пляжу Барселонета',
        nameEn: 'Golden Hour at Barceloneta Beach & Boardwalk',
        category: 'viewpoint',
        descUk: 'Морський бриз Середземного моря, пальми, вуличні музиканти та золоті відблиски заходу сонця на скляному готелі W Barcelona.',
        descEn: 'Mediterranean sea breeze, rollerbladers, ambient acoustic guitar, and amber sunlight reflecting off the sail-shaped W tower.',
        tipUk: 'Зніміть взуття і постійте босоніж на теплому піску біля хвиль — найкращий спосіб перезавантажити втомлені ноги.',
        tipEn: 'Kick off your shoes and feel the soft sand: the perfect revival after thousands of city steps.',
        costUSD: 0,
        duration: 60,
        coords: { lat: 41.3784, lng: 2.1925 },
        address: 'Passeig Marítim de la Barceloneta',
        moods: ['relaxed', 'romantic', 'adventure'],
        timeSlot: 'sunset'
      },
      {
        id: 'bcn-7',
        nameUk: 'Тапас-вечір у богемному районі Ель Борн: «El Xampanyet»',
        nameEn: 'Tapas & Cava Night in El Born: El Xampanyet',
        category: 'dinner',
        descUk: 'Шумний, живий і неперевершений бар 1929 року з кахлями на стінах, домашньою ігристою кавою та свіжими анчоусами.',
        descEn: 'Roaring authentic 1929 tavern packed with locals clinking glasses of chilled house cava and sharing plates of grilled pulpo.',
        tipUk: 'Спробуйте фірмові фаршировані перчики та келих ігристої кави cava xampanyet.',
        tipEn: 'Order house marinated anchovies (anxoves) and a coupe of dry sparkling cava.',
        costUSD: 20,
        duration: 80,
        coords: { lat: 41.3853, lng: 2.1818 },
        address: 'Carrer de Montcada, 22, El Born',
        moods: ['foodie', 'adventure', 'romantic'],
        timeSlot: 'evening'
      }
    ]
  }
};

/**
 * Currency conversion table relative to USD for dynamic adjustments
 */
const CURRENCY_RATES: Record<string, number> = {
  UAH: 41.5,
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  PLN: 3.95,
};

/**
 * Smart generator that either uses detailed curated city databases
 * or dynamically synthesizes a realistic, high quality itinerary for ANY world city!
 */
export function generateCuratedItinerary(req: ItineraryRequest): DayItinerary {
  const normalizedCityKey = req.city.trim().toLowerCase();
  
  // Find match in our rich curated database or generate custom synthesis
  let matchedCityKey = Object.keys(CITIES_DATABASE).find(k => 
    normalizedCityKey.includes(k) || 
    normalizedCityKey.includes(CITIES_DATABASE[k].nameUk.toLowerCase()) ||
    normalizedCityKey.includes(CITIES_DATABASE[k].nameEn.toLowerCase())
  );

  const isUk = req.language === 'uk';
  const currency = req.currency || (matchedCityKey ? CITIES_DATABASE[matchedCityKey].defaultCurrency : 'USD');
  const targetRate = CURRENCY_RATES[currency] || 1.0;

  let cityData: CityData;

  if (matchedCityKey) {
    cityData = CITIES_DATABASE[matchedCityKey];
  } else {
    // Dynamically synthesize a rich city record for custom cities!
    cityData = createSyntheticCity(req.city, req.language);
  }

  // Filter and pick stops based on mood, pace, and time window
  const stopsCount = req.pace === 'relaxed' ? 4 : req.pace === 'intense' ? 7 : 5;
  const filteredStops = selectAndAdaptStops(cityData, req, stopsCount, targetRate);

  // Calculate budget breakdown
  const budgetBreakdown = calculateBudget(filteredStops, req, targetRate, currency);

  const tagline = isUk 
    ? `Незабутній 1 день у ${cityData.nameUk}: ${getMoodTitle(req.mood, 'uk')} та найкращі панорами`
    : `An unforgettable 1 day in ${cityData.nameEn}: ${getMoodTitle(req.mood, 'en')} and premier viewpoints`;

  const vibeDesc = isUk
    ? `Маршрут ідеально підібраний під ${getBudgetTitle(req.budgetType, 'uk')}: поєднує культові пам’ятки, локальні гастрономічні відкриття та атмосферні прогулянки без поспіху.`
    : `Tailored itinerary calibrated for ${getBudgetTitle(req.budgetType, 'en')}: balancing iconic landmarks, insider culinary gems, and picturesque scenic walks.`;

  return {
    id: `trip-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    city: isUk ? cityData.nameUk : cityData.nameEn,
    country: isUk ? cityData.countryUk : cityData.countryEn,
    tagline,
    vibeDescription: vibeDesc,
    mood: req.mood,
    budgetType: req.budgetType,
    pace: req.pace,
    companion: req.companion,
    stops: filteredStops,
    budgetBreakdown,
    localProTips: isUk ? cityData.proTipsUk : cityData.proTipsEn,
    recommendedFoods: isUk ? cityData.foodsUk : cityData.foodsEn,
    bestPhotoSpots: isUk ? cityData.photoSpotsUk : cityData.photoSpotsEn,
    idealWeatherAdvice: isUk ? cityData.weatherAdviceUk : cityData.weatherAdviceEn,
    createdAt: Date.now(),
    language: req.language,
  };
}

function selectAndAdaptStops(
  cityData: CityData, 
  req: ItineraryRequest, 
  count: number,
  currencyRate: number
): ItineraryStop[] {
  const isUk = req.language === 'uk';
  const allStops = [...cityData.stops];

  // Sort candidate stops prioritizing those matching user mood
  allStops.sort((a, b) => {
    const aMatch = a.moods.includes(req.mood) ? 1 : 0;
    const bMatch = b.moods.includes(req.mood) ? 1 : 0;
    return bMatch - aMatch;
  });

  const slots: Array<'morning' | 'lunch' | 'afternoon' | 'sunset' | 'evening'> = [
    'morning',
    'lunch',
    'afternoon',
    'sunset',
    'evening'
  ];

  const selectedCandidates = allStops.slice(0, count);

  // Time schedules
  const startHour = parseInt(req.startTime.split(':')[0], 10) || 9;
  let currentMinuteOffset = startHour * 60;

  const stops: ItineraryStop[] = selectedCandidates.map((stopItem, index) => {
    const startMins = currentMinuteOffset;
    const endMins = startMins + stopItem.duration;
    currentMinuteOffset = endMins + 20; // 20 mins transit

    const formatTime = (totalMins: number) => {
      const h = Math.floor(totalMins / 60) % 24;
      const m = totalMins % 60;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    const timeRange = `${formatTime(startMins)} - ${formatTime(endMins)}`;

    // Calculate budget scaled by user budget type
    let cost = Math.round(stopItem.costUSD * currencyRate);
    if (req.budgetType === 'budget') {
      cost = Math.round(cost * 0.45);
    } else if (req.budgetType === 'luxury') {
      cost = Math.round(cost * 2.2);
    }

    const transitMins = 15;
    const walkDistance = Math.round(600 + Math.random() * 800);

    return {
      id: `stop-${index + 1}-${stopItem.id}`,
      time: timeRange,
      name: isUk ? stopItem.nameUk : stopItem.nameEn,
      category: stopItem.category,
      description: isUk ? stopItem.descUk : stopItem.descEn,
      insiderTip: isUk ? stopItem.tipUk : stopItem.tipEn,
      estimatedCost: cost,
      durationMinutes: stopItem.duration,
      coordinates: stopItem.coords,
      address: stopItem.address,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stopItem.nameEn || stopItem.nameUk}, ${cityData.nameEn}`)}`,
      transitToNext: index < selectedCandidates.length - 1 ? {
        mode: walkDistance > 1200 ? 'transit' : 'walk',
        durationMinutes: transitMins,
        distanceMeters: walkDistance,
        description: isUk 
          ? `Прогулянка старовинними вуличками (~${Math.round(walkDistance / 100) * 100} м, ${transitMins} хв)`
          : `Scenic walk through historic streets (~${Math.round(walkDistance / 100) * 100} m, ${transitMins} min)`,
      } : undefined,
      visited: false,
    };
  });

  return stops;
}

function calculateBudget(
  stops: ItineraryStop[], 
  req: ItineraryRequest, 
  currencyRate: number, 
  currency: string
) {
  let food = 0;
  let activities = 0;
  let transport = Math.round(4 * currencyRate);

  stops.forEach(s => {
    if (s.category === 'coffee' || s.category === 'breakfast' || s.category === 'lunch' || s.category === 'dinner') {
      food += s.estimatedCost;
    } else {
      activities += s.estimatedCost;
    }
  });

  const snacks = Math.round((food * 0.15) || (5 * currencyRate));
  const buffer = Math.round((food + activities) * 0.1);
  const total = food + activities + transport + snacks + buffer;

  return {
    foodAndDrinks: food,
    activitiesAndTickets: activities,
    transport,
    snacksAndSouvenirs: snacks,
    emergencyBuffer: buffer,
    totalEstimated: total,
    currency,
  };
}

function createSyntheticCity(cityName: string, lang: Language): CityData {
  const isUk = lang === 'uk';
  const cleanName = cityName.trim();
  // Pseudo-random coordinates generator seeded by city name
  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
    hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const baseLat = 45 + (Math.abs(hash % 200) / 15);
  const baseLng = 15 + (Math.abs((hash >> 3) % 250) / 12);

  return {
    nameUk: cleanName,
    nameEn: cleanName,
    countryUk: 'Світ',
    countryEn: 'World',
    centerCoords: { lat: baseLat, lng: baseLng },
    defaultCurrency: 'USD',
    exchangeRateToUSD: 1.0,
    proTipsUk: [
      `Починайте знайомство з ${cleanName} з центральної історичної площі — тут найкраще відчувається автентичний пульс міста.`,
      'Купуйте денний абонемент на громадський транспорт: це заощадить гроші та дасть змогу вільно пересуватися між районами.',
      'Шукайте заклади харчування на сусідніх від головних проспектів вуличках — ціни приємніші, а смак справжній.'
    ],
    proTipsEn: [
      `Begin exploring ${cleanName} from its main historic square to absorb the genuine local atmosphere.`,
      'Look into a 24-hour transit day pass for effortless hopping between neighborhoods.',
      'Dine on secondary cobblestone side streets for authentic recipes and local prices away from tourist corridors.'
    ],
    foodsUk: ['Місцева фірмова випічка', 'Традиційний обідній суп регіону', 'Крафтовий сир та свіжий хліб', 'Локальний фірмовий десерт'],
    foodsEn: ['Signature regional pastry', 'Traditional artisan soup', 'Local farmhouse cheese & bread', 'Heritage artisanal dessert'],
    photoSpotsUk: [`Центральна площа ${cleanName}`, 'Панорамний оглядовий майданчик міста', 'Найстаріший кам’яний міст або набережна', 'Затишний ботанічний парк'],
    photoSpotsEn: [`Central Historic Square of ${cleanName}`, 'City panoramic hilltop lookout', 'Historic stone riverfront bridge', 'Quiet botanical rose garden'],
    weatherAdviceUk: 'Одягайтеся за принципом багатошаровості та майте зручне пішохідне взуття для тривалих прогулянок.',
    weatherAdviceEn: 'Dress in comfortable breathable layers and wear sturdy walking footwear for walking around town.',
    stops: [
      {
        id: 'synth-1',
        nameUk: `Ароматна кава та сніданок у Старому місті ${cleanName}`,
        nameEn: `Artisan Coffee & Breakfast in Old Town ${cleanName}`,
        category: 'coffee',
        descUk: `Затишний ранок у місцевій кав’ярні зі свіжою випічкою та планами на яскравий день у ${cleanName}.`,
        descEn: `A relaxing morning in a local specialty café enjoying warm pastries and planning the day's journey.`,
        tipUk: 'Спитайте у бариста про їхню улюблену таємну локацію в місті.',
        tipEn: 'Ask the barista for their personal favorite hidden corner in town.',
        costUSD: 5,
        duration: 45,
        coords: { lat: baseLat + 0.003, lng: baseLng + 0.002 },
        address: `Old Town Center, ${cleanName}`,
        moods: ['relaxed', 'foodie'],
        timeSlot: 'morning'
      },
      {
        id: 'synth-2',
        nameUk: `Історичний центр та архітектурна перлина ${cleanName}`,
        nameEn: `Historic Landmark & Central Heritage Plaza`,
        category: 'sight',
        descUk: `Головна візитівка міста з багатовіковою історією, витонченими фасадами та статуями.`,
        descEn: `The crown architectural jewel of the city, brimming with heritage details and vibrant open-air energy.`,
        tipUk: 'Зверніть увагу на старовинні барельєфи на кутах будівель.',
        tipEn: 'Look closely at the sculpted cornerstones and historic emblems on the facades.',
        costUSD: 4,
        duration: 60,
        coords: { lat: baseLat + 0.006, lng: baseLng - 0.003 },
        address: `Main Plaza, ${cleanName}`,
        moods: ['cultural', 'romantic'],
        timeSlot: 'morning'
      },
      {
        id: 'synth-3',
        nameUk: `Автентичний обід у традиційному бістро`,
        nameEn: `Authentic Local Heritage Lunch`,
        category: 'lunch',
        descUk: `Ситна та смачна дегустація традиційних страв, що передають колорит місцевої кулінарної традиції.`,
        descEn: `A delicious feast of hearty regional dishes celebrating the culinary heritage of the region.`,
        tipUk: 'Замовте страву дня від шефа (Plat du jour).',
        tipEn: 'Inquire about today\'s chef special or seasonal market plate.',
        costUSD: 16,
        duration: 75,
        coords: { lat: baseLat - 0.002, lng: baseLng + 0.004 },
        address: `Market Quarter, ${cleanName}`,
        moods: ['foodie', 'relaxed'],
        timeSlot: 'lunch'
      },
      {
        id: 'synth-4',
        nameUk: `Секретний сад або вінтажний квартал ремісників`,
        nameEn: `Secluded Artisan Quarter & Hidden Courtyards`,
        category: 'hidden_spot',
        descUk: `Тихі провулки подалі від туристичного шуму з майстернями, авторськими сувенірами та затінком дерев.`,
        descEn: 'Quiet alleyways away from crowds with local workshops, charming boutique shops, and shade.',
        tipUk: 'Ідеальне місце для покупки унікальних сувенірів ручної роботи.',
        tipEn: 'The ideal spot to purchase handcrafted memories and postcards.',
        costUSD: 2,
        duration: 60,
        coords: { lat: baseLat - 0.005, lng: baseLng - 0.002 },
        address: `Artisan Lane, ${cleanName}`,
        moods: ['hidden_gems', 'romantic', 'relaxed'],
        timeSlot: 'afternoon'
      },
      {
        id: 'synth-5',
        nameUk: `Оглядовий майданчик: захід сонця над дахами ${cleanName}`,
        nameEn: `Panoramic Sunset Hillside Lookout`,
        category: 'viewpoint',
        descUk: `Неймовірна панорама міста у теплих променях вечірнього сонця — незабутнє видовище для фотографій.`,
        descEn: 'Stunning elevated viewpoint watching golden dusk bathe the city roofs and river curves.',
        tipUk: 'Прийдіть за 20 хвилин до заходу, щоб зловити найкраще світло.',
        tipEn: 'Arrive 20 minutes before sunset for the golden hour photography light.',
        costUSD: 0,
        duration: 50,
        coords: { lat: baseLat + 0.010, lng: baseLng + 0.008 },
        address: `Belvedere Lookout, ${cleanName}`,
        moods: ['romantic', 'adventure', 'relaxed'],
        timeSlot: 'sunset'
      },
      {
        id: 'synth-6',
        nameUk: `Вечірня вечеря при свічках та локальні напої`,
        nameEn: `Atmospheric Evening Bistro & Local Drinks`,
        category: 'dinner',
        descUk: `Завершення чудового дня: душевна атмосфера, приємна музика, вишукана вечеря та спогади.`,
        descEn: 'Wrapping up the dream day: ambient candlelight, great music, hearty dinner, and reflection.',
        tipUk: 'Підніміть келих за нові подорожі та незабутні відкриття!',
        tipEn: 'Toast to serendipitous discoveries and future adventures!',
        costUSD: 20,
        duration: 80,
        coords: { lat: baseLat + 0.001, lng: baseLng + 0.005 },
        address: `Riverside / Historic Square, ${cleanName}`,
        moods: ['romantic', 'foodie', 'adventure'],
        timeSlot: 'evening'
      }
    ]
  };
}

function getMoodTitle(mood: MoodType, lang: 'uk' | 'en'): string {
  const map: Record<MoodType, { uk: string; en: string }> = {
    foodie: { uk: 'гастрономічні відкриття', en: 'culinary trail' },
    cultural: { uk: 'культурні скарби', en: 'cultural heritage' },
    hidden_gems: { uk: 'секретні куточки', en: 'hidden gems' },
    romantic: { uk: 'романтичний настрій', en: 'romantic vibe' },
    adventure: { uk: 'динамічний драйв', en: 'adventure pulse' },
    relaxed: { uk: 'неспішний релакс', en: 'relaxed pace' },
  };
  return map[mood]?.[lang] || (lang === 'uk' ? 'ідеальний відпочинок' : 'ideal exploration');
}

function getBudgetTitle(budget: BudgetType, lang: 'uk' | 'en'): string {
  const map: Record<BudgetType, { uk: string; en: string }> = {
    budget: { uk: 'економного бюджету', en: 'backpacker budget' },
    moderate: { uk: 'комфортного бюджету', en: 'balanced comfort budget' },
    luxury: { uk: 'преміального відпочинку', en: 'luxury experience' },
    custom: { uk: 'персонального бюджету', en: 'custom budget' },
  };
  return map[budget]?.[lang] || '';
}
