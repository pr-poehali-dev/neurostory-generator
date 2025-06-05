import React, { useState } from "react";
import PhotoUpload from "@/components/PhotoUpload";
import StoryGenerator from "@/components/StoryGenerator";
import StoryGallery from "@/components/StoryGallery";
import {
  generatePersonalizedStories,
  type GeneratedStory,
} from "@/services/storyService";

interface Story {
  id: string;
  title: string;
  content: string;
  genre: string;
  imageUrl: string;
}

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [stories, setStories] = useState<GeneratedStory[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStories = async (
    genres: string[],
    childName?: string,
  ) => {
    if (!selectedPhoto) return;

    setIsGenerating(true);

    try {
      const generatedStories = await generatePersonalizedStories({
        photo: selectedPhoto,
        genres,
        childName,
      });

      setStories(generatedStories);
    } catch (error) {
      console.error("Ошибка генерации историй:", error);
      // В реальном приложении здесь была бы обработка ошибок
    } finally {
      setIsGenerating(false);
    }
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
              Ваш ребенок — герой
              <span className="text-primary block">волшебных историй</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Загрузите фото ребёнка и получите персонализированные истории, где
              ваш малыш станет главным героем удивительных приключений
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
            onGenerateStories={handleGenerateStories}
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
