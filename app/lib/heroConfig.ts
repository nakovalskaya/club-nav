export type HeroConfig = {
    imageSrc: string;
    title: string;
    subtitle?: string;
    description?: string;
  };
  
  /**
   * Общие шапки для РАЗДЕЛОВ
   */
  const SECTION_HERO: Record<string, HeroConfig> = {
    "/kursy": {
      imageSrc: "/images/headers/kursy.jpg",
      title: "КУРСЫ",
      subtitle: "Практические мини-курсы рассчитаны на 1,5 месяца.",
      description: "Не старайся внедрять всё сразу.",
    },
    "/marketing": {
      imageSrc: "/images/headers/marketing.jpg",
      title: "МАРКЕТИНГ",
      subtitle: "Системный подход вместо хаоса.",
      description: "Разбираем стратегию, смыслы и стабильные продажи.",
    },
    "/prodazhi": {
      imageSrc: "/images/headers/prodazhi.jpg",
      title: "ПРОДАЖИ",
      subtitle: "Практика без прогревного цирка.",
      description: "Скрипты, переписка, дожимы, автоворонки.",
    },
    "/reels": {
      imageSrc: "/images/headers/reels.jpg",
      title: "REELS",
      subtitle: "Контент, который работает на воронку.",
      description: "Смыслы, структура, монтаж, метрики.",
    },
    "/threads": {
      imageSrc: "/images/headers/threads.jpg",
      title: "THREADS",
      subtitle: "Органика без выгорания.",
      description: "Постинг-план, фреймы, конверсия в заявки.",
    },
    "/instagram": {
      imageSrc: "/images/headers/instagram.jpg",
      title: "INSTAGRAM",
      subtitle: "Экспертный блог как система.",
      description: "Упаковка, контент, воронки, продажи.",
    },
    "/telegram": {
      imageSrc: "/images/headers/telegram.jpg",
      title: "TELEGRAM",
      subtitle: "Канал, который продаёт сам.",
      description: "Навигация, боты, мини-приложения.",
    },
    "/efiry": {
      imageSrc: "/images/headers/efiry.jpg",
      title: "ЭФИРЫ",
      subtitle: "Структура, динамика, конверсия.",
      description: "От смысла к действию, без воды.",
    },
    "/podcasty": {
      imageSrc: "/images/headers/podcasty.jpg",
      title: "ПОДКАСТЫ",
      subtitle: "Глубокие разговоры по делу.",
      description: "Тезисы, монтаж, публикация.",
    },
    "/gidy": {
      imageSrc: "/images/headers/gidy.jpg",
      title: "ГИДЫ",
      subtitle: "Короткие шпаргалки с практикой.",
      description: "Только то, что даёт результат.",
    },
    "/mysli": {
      imageSrc: "/images/headers/mysli.jpg",
      title: "МЫСЛИ",
      subtitle: "Сильные смыслы без прилипания.",
      description: "Разрушаем мифы инфобиза.",
    },
    "/voronki": {
      imageSrc: "/images/headers/voronki.jpg",
      title: "ВОРОНКИ",
      subtitle: "Регулярные заявки вместо запусков.",
      description: "Логика, триггеры, автопродажи.",
    },
    "/nejroseti": {
      imageSrc: "/images/headers/nejroseti.jpg",
      title: "НЕЙРОСЕТИ",
      subtitle: "GPT-инструменты для экспертов.",
      description: "Тексты, воронки, стратегии на автопилоте.",
    },
    "/about": {
      imageSrc: "/images/headers/about.jpg",
      title: "О ПРОЕКТЕ",
      subtitle: "Системные продажи без выгорания.",
      description: "Кто мы, принципы и подход.",
    },
    "/favorites": {
      imageSrc: "/images/headers/favorites.jpg",
      title: "ИЗБРАННОЕ",
      subtitle: "Твои сохранённые материалы.",
      description: "Возвращайся к главному быстро.",
    },
  };
  
  /**
   * Точные шапки для отдельных ТЕМ (пример внутри раздела «курсы»)
   */
  const TOPIC_HERO: Record<string, HeroConfig> = {
    "/kursy/nejroseti": {
      imageSrc: "/images/headers/kursy-nejroseti.jpg",
      title: "НЕЙРОСЕТИ",
      subtitle: "GPT-инструменты для экспертов.",
      description: "Тексты, воронки и стратегии — системно.",
    },
    "/kursy/instagram": {
      imageSrc: "/images/headers/kursy-instagram.jpg",
      title: "INSTAGRAM",
      subtitle: "Экспертный блог как система.",
      description: "Упаковка, смыслы, воронки, продажи.",
    },
    // добавляй сюда по мере появления новых тем
  };
  
  export function getHeroForPath(pathname: string): HeroConfig | null {
    const path = pathname.replace(/\/$/, "") || "/";
  
    if (TOPIC_HERO[path]) return TOPIC_HERO[path];
  
    const first = "/" + (path.split("/")[1] ?? "");
    if (SECTION_HERO[first]) return SECTION_HERO[first];
  
    return null;
  }
  