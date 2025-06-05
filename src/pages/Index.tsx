import React, { useState } from "react";
import PhotoUpload from "@/components/PhotoUpload";
import StoryGenerator from "@/components/StoryGenerator";
import StoryGallery from "@/components/StoryGallery";

interface Story {
  id: string;
  title: string;
  content: string;
  genre: string;
  imageUrl: string;
}

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMockStories = async () => {
    setIsGenerating(true);

    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockStories: Story[] = [
      {
        id: "1",
        title: "Приключения в Волшебном лесу",
        content:
          "Маленький герой отправляется в удивительное путешествие через заколдованный лес, где встречает говорящих животных и узнает секрет древней магии...",
        genre: "Сказка",
        imageUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      },
      {
        id: "2",
        title: "Космическое путешествие",
        content:
          "На своем волшебном корабле наш герой летит к далёким звёздам, чтобы помочь инопланетным друзьям найти потерянную планету...",
        genre: "Фантастика",
        imageUrl:
          "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      },
      {
        id: "3",
        title: "Тайна подводного замка",
        content:
          "Погружаясь в глубины океана, маленький исследователь обнаруживает подводный замок и встречает морских обитателей...",
        genre: "Приключения",
        imageUrl:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      },
      {
        id: "4",
        title: "Дружба с драконом",
        content:
          "В далёкой стране наш герой встречает доброго дракона, который учит его летать и показывает красоты небесного мира...",
        genre: "Дружба",
        imageUrl:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      },
      {
        id: "5",
        title: "Спасение волшебного леса",
        content:
          "Когда злой колдун угрожает волшебному лесу, только наш маленький герой может собрать всех лесных жителей и спасти их дом...",
        genre: "Магия",
        imageUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      },
      {
        id: "6",
        title: "Приключения в стране игрушек",
        content:
          "Попав в удивительную страну, где все игрушки оживают, наш герой помогает им решить важную проблему и находит новых друзей...",
        genre: "Семья",
        imageUrl:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      },
    ];

    setStories(mockStories);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📚</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">StoryCraft</h1>
              <p className="text-xs text-gray-600">
                Персональные истории для детей
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Волшебные истории с вашим
              <span className="text-primary block">маленьким героем</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Загрузите фото ребёнка и получите 10 уникальных
              персонализированных историй с изображениями, где ваш малыш —
              главный герой приключений
            </p>
          </div>
        </section>

        {/* Upload Section */}
        <section>
          <PhotoUpload
            onPhotoSelect={setSelectedPhoto}
            selectedPhoto={selectedPhoto}
          />
        </section>

        {/* Generator Section */}
        <section>
          <StoryGenerator
            onGenerateStories={generateMockStories}
            isGenerating={isGenerating}
            hasPhoto={!!selectedPhoto}
          />
        </section>

        {/* Stories Gallery */}
        <section>
          <StoryGallery stories={stories} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-white/20 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            ✨ Создано с любовью для маленьких мечтателей
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
