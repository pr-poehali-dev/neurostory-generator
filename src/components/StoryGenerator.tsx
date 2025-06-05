import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StoryGeneratorProps {
  onGenerateStories: () => void;
  isGenerating: boolean;
  hasPhoto: boolean;
}

const genres = [
  "Приключения",
  "Сказка",
  "Фантастика",
  "Детектив",
  "Дружба",
  "Семья",
  "Животные",
  "Космос",
  "Природа",
  "Магия",
];

const StoryGenerator: React.FC<StoryGeneratorProps> = ({
  onGenerateStories,
  isGenerating,
  hasPhoto,
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(
      (prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre)
          : [...prev, genre].slice(0, 5), // Максимум 5 жанров
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Создать волшебные истории
        </h2>
        <p className="text-gray-600">
          Выберите жанры и создайте 10 уникальных историй для вашего ребенка
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Выберите жанры (до 5):
        </h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenres.includes(genre) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedGenres.includes(genre)
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "hover:bg-primary/10"
              }`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        onClick={onGenerateStories}
        disabled={!hasPhoto || isGenerating || selectedGenres.length === 0}
        className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Создаю истории...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Создать 10 историй
          </>
        )}
      </Button>

      {!hasPhoto && (
        <p className="text-sm text-amber-600 text-center bg-amber-50 p-3 rounded-lg">
          Сначала загрузите фото ребенка
        </p>
      )}
    </div>
  );
};

export default StoryGenerator;
