interface GeneratedStory {
  id: string;
  title: string;
  content: string;
  genre: string;
  imageUrl: string;
}

interface StoryGenerationParams {
  photo: File;
  genres: string[];
  childName?: string;
}

// Эмуляция AI-сервиса для генерации персонализированных историй
export const generatePersonalizedStories = async (
  params: StoryGenerationParams,
): Promise<GeneratedStory[]> => {
  const { photo, genres } = params;

  // Имитация анализа фото и генерации
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // Создаем персонализированные истории с учетом загруженного фото
  const storyTemplates = [
    {
      genre: "Приключения",
      title: "Отважный путешественник",
      content:
        "Наш юный герой отправляется в захватывающее путешествие через неизведанные земли. С храбрым сердцем и любопытными глазами, он преодолевает препятствия и находит скрытые сокровища.",
      scene: "adventure",
    },
    {
      genre: "Сказка",
      title: "Маленький волшебник",
      content:
        "В волшебном королевстве наш герой обнаруживает у себя удивительные способности. С помощью доброй феи он учится использовать магию для помощи другим.",
      scene: "fantasy",
    },
    {
      genre: "Фантастика",
      title: "Космический исследователь",
      content:
        "На своем звездном корабле наш смелый пилот исследует далекие галактики, встречает дружелюбных инопланетян и спасает планеты от космических угроз.",
      scene: "space",
    },
    {
      genre: "Дружба",
      title: "Лучший друг всех животных",
      content:
        "В заповедном лесу наш добрый герой подружился со всеми обитателями. Вместе они организуют большой праздник дружбы для всего леса.",
      scene: "forest",
    },
    {
      genre: "Семья",
      title: "Семейный помощник",
      content:
        "Наш заботливый малыш помогает бабушке в волшебном саду, где растут необычные цветы. Вместе они готовят сюрприз для всей семьи.",
      scene: "garden",
    },
    {
      genre: "Животные",
      title: "Защитник зверей",
      content:
        "Когда лесные животные попали в беду, наш храбрый герой не раздумывая приходит им на помощь. Его доброта и смелость спасают весь лес.",
      scene: "wildlife",
    },
    {
      genre: "Космос",
      title: "Покоритель звезд",
      content:
        "На межгалактической станции наш юный астронавт делает важное открытие, которое поможет установить мир между разными планетами.",
      scene: "space_station",
    },
    {
      genre: "Природа",
      title: "Хранитель природы",
      content:
        "Наш эко-герой путешествует по разным природным зонам планеты, изучает их красоту и учит других беречь окружающий мир.",
      scene: "nature",
    },
    {
      genre: "Магия",
      title: "Ученик волшебной школы",
      content:
        "В академии магии наш талантливый ученик осваивает древние заклинания и использует их для защиты своих друзей от темных сил.",
      scene: "magic_school",
    },
    {
      genre: "Детектив",
      title: "Юный детектив",
      content:
        "С лупой в руке и острым умом наш маленький сыщик раскрывает загадочное дело о пропавших игрушках в детском саду.",
      scene: "detective",
    },
  ];

  // Фильтруем истории по выбранным жанрам или берем случайные
  const selectedTemplates =
    genres.length > 0
      ? storyTemplates.filter((template) => genres.includes(template.genre))
      : storyTemplates;

  // Берем до 10 историй
  const templatesToUse = selectedTemplates.slice(0, 10);

  // Генерируем персонализированные изображения
  const stories: GeneratedStory[] = templatesToUse.map((template, index) => ({
    id: `story-${index + 1}`,
    title: template.title,
    content: template.content,
    genre: template.genre,
    // В реальной реализации здесь был бы URL изображения с лицом ребенка
    imageUrl: generatePersonalizedImageUrl(template.scene, index),
  }));

  return stories;
};

// Генерирует URL персонализированного изображения
const generatePersonalizedImageUrl = (scene: string, index: number): string => {
  // В реальной реализации здесь был бы вызов AI-сервиса для генерации изображения
  // с использованием загруженного фото ребенка

  const imagePrompts = {
    adventure: "photo-1551698618-1dfe5d97d256", // Горы и приключения
    fantasy: "photo-1578662996442-48f60103fc96", // Волшебный лес
    space: "photo-1446776877081-d282a0f896e2", // Космос
    forest: "photo-1441974231531-c6227db76b6e", // Лес
    garden: "photo-1416879595882-3373a0480b5b", // Сад
    wildlife: "photo-1564349683136-77e08dba1ef7", // Дикая природа
    space_station: "photo-1614728423169-4d9d50a3f5e5", // Космическая станция
    nature: "photo-1506905925346-21bda4d32df4", // Природа
    magic_school: "photo-1507003211169-0a1dd7228f2d", // Волшебная школа
    detective: "photo-1560472354-b33ff0c44a43", // Детективная тема
  };

  const promptId =
    imagePrompts[scene as keyof typeof imagePrompts] || imagePrompts.adventure;

  return `https://images.unsplash.com/${promptId}?w=400&h=300&fit=crop&auto=format`;
};

export type { GeneratedStory, StoryGenerationParams };
