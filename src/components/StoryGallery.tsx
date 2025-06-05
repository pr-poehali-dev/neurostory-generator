import React from "react";
import StoryCard from "./StoryCard";

interface Story {
  id: string;
  title: string;
  content: string;
  genre: string;
  imageUrl: string;
}

interface StoryGalleryProps {
  stories: Story[];
}

const StoryGallery: React.FC<StoryGalleryProps> = ({ stories }) => {
  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📚</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Пока нет историй
        </h3>
        <p className="text-gray-600">
          Загрузите фото и создайте первые волшебные истории!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ваши персонализированные истории
        </h2>
        <p className="text-gray-600">
          {stories.length} уникальных историй готовы к прочтению
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default StoryGallery;
